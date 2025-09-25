import { 
    auth, 
    db, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithPopup, 
    signOut,
    collection,
    doc,
    onSnapshot,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    updateDoc
} from './firebase.js';
import { marked } from 'marked';

document.addEventListener('DOMContentLoaded', () => {
    // --- AUTH ELEMENTS ---
    const authModal = document.getElementById('auth-modal');
    const googleSignInBtn = document.getElementById('google-signin-btn');
    const userProfileContainer = document.getElementById('user-profile-container');
    const authError = document.getElementById('auth-error');

    // --- DOM ELEMENTS ---
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menu-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const chatForm = document.getElementById('chat-form');
    const promptInput = document.getElementById('prompt-input');
    const messageFeed = document.getElementById('message-feed');
    const chatList = document.getElementById('chat-list');
    const newChatBtn = document.getElementById('new-chat-btn');
    const chatTitle = document.getElementById('chat-title');
    const stopGenerationContainer = document.getElementById('stop-generation-container');
    const stopGenerationBtn = document.getElementById('stop-generation-btn');
    const imageUploadInput = document.getElementById('image-upload-input');
    const composerContainer = document.getElementById('composer-container');
    const summarizeChatBtn = document.getElementById('summarize-chat-btn');
    // Main Composer Controls
    const customizeBtn = document.getElementById('customize-btn');
    const customizationPopover = document.getElementById('customization-popover');
    const lengthOptions = document.getElementById('length-options');
    const toneOptions = document.getElementById('tone-options');
    const imageUploadBtn = document.getElementById('image-upload-btn');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    // Initial View Controls
    const initialPromptContainer = document.getElementById('initial-prompt-container');
    const initialChatForm = document.getElementById('initial-chat-form');
    const initialPromptInput = document.getElementById('initial-prompt-input');
    const initialImageUploadBtn = document.getElementById('initial-image-upload-btn');
    const initialCustomizeBtn = document.getElementById('initial-customize-btn');
    const initialCustomizationPopover = document.getElementById('initial-customization-popover');
    const initialLengthOptions = document.getElementById('initial-length-options');
    const initialToneOptions = document.getElementById('initial-tone-options');
    const initialImagePreviewContainer = document.getElementById('initial-image-preview-container');

    // --- STATE MANAGEMENT ---
    let currentUser = null;
    let chats = {};
    let activeChatId = null;
    let isStreaming = false;
    let streamingController = null;
    let answerLength = 'Medium';
    let toneOfVoice = 'Professional';
    let attachedImage = null;
    let pendingPrompt = null; // Store prompt while user signs in

    let chatUnsubscribe = null; // To unsubscribe from Firestore listener
    let messagesUnsubscribe = null; // To unsubscribe from messages listener

    // --- HELPERS ---
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
    const getShortTitle = (text, length = 25) => text.length > length ? text.substring(0, length) + '...' : text;
    
    // --- AUTHENTICATION ---
    const showAuthModal = () => {
        authModal.classList.add('visible');
    };

    const hideAuthModal = () => {
        authModal.classList.remove('visible');
        authError.textContent = '';
    };

    googleSignInBtn.addEventListener('click', async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            hideAuthModal();
        } catch (error) {
            console.error("Sign-in error:", error);
            authError.textContent = error.message;
        }
    });

    onAuthStateChanged(auth, user => {
        if (user) {
            currentUser = user;
            renderUserProfile();
            loadUserChats();
            if (pendingPrompt) {
                addUserMessage(pendingPrompt.content, pendingPrompt.image);
                pendingPrompt = null;
            }
        } else {
            currentUser = null;
            renderUserProfile();
            clearChatUI();
        }
    });

    // --- UI RENDERING ---

    const renderUserProfile = () => {
        if (currentUser) {
            userProfileContainer.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${currentUser.photoURL}" alt="${currentUser.displayName}" class="w-10 h-10 rounded-full">
                    <div class="flex-1 overflow-hidden">
                        <p class="font-semibold text-sm truncate text-white">${currentUser.displayName}</p>
                        <p class="text-xs truncate text-slate-400">${currentUser.email}</p>
                    </div>
                    <button id="sign-out-btn" title="Sign Out" class="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    </button>
                </div>
            `;
            document.getElementById('sign-out-btn').addEventListener('click', () => signOut(auth));
        } else {
            userProfileContainer.innerHTML = `
                 <button id="sign-in-prompt-btn" class="w-full flex items-center justify-center gap-3 bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl hover:bg-slate-600 transition-colors">
                    Sign In to Save Chats
                </button>
            `;
            document.getElementById('sign-in-prompt-btn').addEventListener('click', showAuthModal);
        }
    };
    
    const clearChatUI = () => {
        if(chatUnsubscribe) chatUnsubscribe();
        if(messagesUnsubscribe) messagesUnsubscribe();
        chats = {};
        activeChatId = null;
        renderChatList();
        renderMessages();
    }

    const renderChatList = () => {
        chatList.innerHTML = '';
        const sortedChats = Object.values(chats).sort((a, b) => (b.lastUpdated?.toMillis() || 0) - (a.lastUpdated?.toMillis() || 0));
        sortedChats.forEach(chat => {
            const isActive = chat.id === activeChatId;
            const lastMessage = chat.lastMessage || 'Start conversation...';
            const chatItem = document.createElement('a');
            chatItem.href = '#';
            chatItem.className = `flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-200 ${isActive ? 'bg-blue-600/80' : 'hover:bg-slate-700/50'}`;
            chatItem.dataset.chatId = chat.id;
            chatItem.innerHTML = `
                <div class="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-blue-300 font-bold text-lg flex-shrink-0">
                    ${chat.title.charAt(0).toUpperCase()}
                </div>
                <div class="flex-1 overflow-hidden">
                    <p class="font-semibold text-sm truncate text-white">${chat.title}</p>
                    <p class="text-xs truncate text-slate-400">${lastMessage}</p>
                </div>
            `;
            chatList.appendChild(chatItem);
        });
    };
    
    const renderMessages = (messages = []) => {
        const chat = chats[activeChatId];
        if (!activeChatId || !chat) {
             messageFeed.classList.add('hidden');
             composerContainer.classList.add('hidden');
             initialPromptContainer.classList.remove('hidden');
             chatTitle.textContent = 'New Conversation';
             return;
        }

        if (messages.length === 0) {
            messageFeed.classList.add('hidden');
            composerContainer.classList.add('hidden');
            initialPromptContainer.classList.remove('hidden');
            messageFeed.innerHTML = ''; 
        } else {
            messageFeed.classList.remove('hidden');
            composerContainer.classList.remove('hidden');
            initialPromptContainer.classList.add('hidden');
            
            messageFeed.innerHTML = '';
            messages.forEach(msg => {
                messageFeed.appendChild(createMessageBubble(msg));
            });
            messageFeed.scrollTop = messageFeed.scrollHeight;
        }
        chatTitle.textContent = chat.title;
    };
    
    const createMessageBubble = (message) => {
        const isUser = message.role === 'user';
        const isSummary = message.isSummary;
        const bubbleWrapper = document.createElement('div');
        bubbleWrapper.className = `w-full flex ${isUser ? 'justify-end' : 'justify-start'}`;
        const bubble = document.createElement('div');
        bubble.className = `flex gap-3 items-start message-bubble`;
        bubble.dataset.messageId = message.id;
        const avatar = `<div class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center shadow-md ${isUser ? 'user-message-gradient' : isSummary ? 'bg-purple-600' : 'bg-slate-800'}"><span class="text-sm font-bold text-white">${isUser && currentUser ? currentUser.displayName.charAt(0) : isSummary ? '✨' : 'V'}</span></div>`;
        const contentContainer = document.createElement('div');
        contentContainer.className = `p-4 rounded-3xl shadow-md ${isUser ? 'user-message-gradient text-white rounded-br-lg' : isSummary ? 'bg-purple-50 border border-purple-200 text-slate-800 rounded-bl-lg' : 'bg-white text-slate-800 rounded-bl-lg'}`;
        const messageContent = document.createElement('div');
        messageContent.className = 'prose prose-p:my-0 prose-headings:my-2 prose-ul:my-2 prose-ol:my-2 prose-pre:bg-slate-800 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-xl max-w-full';
        if(isUser) messageContent.classList.add('prose-invert');
        if (isUser) {
             if (message.image) {
                const img = document.createElement('img');
                img.src = message.image;
                img.className = 'rounded-lg mb-2 max-w-xs';
                messageContent.appendChild(img);
            }
            const text = document.createElement('p');
            text.textContent = message.content;
            messageContent.appendChild(text);
        } else {
            messageContent.innerHTML = marked.parse(message.content || '');
        }
        if (message.state === 'streaming' && !isUser) { messageContent.innerHTML += '<span class="streaming-cursor"></span>'; }
        if (message.state === 'error' && !isUser) { messageContent.innerHTML = `<p class="text-red-500 font-semibold">${message.content}</p>`; }
        contentContainer.appendChild(messageContent);
        if (isUser) { bubble.innerHTML = contentContainer.outerHTML + avatar; } else { bubble.innerHTML = avatar + contentContainer.outerHTML; }
        bubbleWrapper.appendChild(bubble);
        return bubbleWrapper;
    };

    // --- FIRESTORE LOGIC ---
    const loadUserChats = () => {
        if (!currentUser) return;
        if(chatUnsubscribe) chatUnsubscribe();
        const chatsRef = collection(db, 'users', currentUser.uid, 'chats');
        const q = query(chatsRef, orderBy('lastUpdated', 'desc'));

        chatUnsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach(doc => {
                chats[doc.id] = { id: doc.id, ...doc.data() };
            });
            renderChatList();
            if (!activeChatId && snapshot.docs.length > 0) {
                setActiveChat(snapshot.docs[0].id);
            } else if (!activeChatId || !chats[activeChatId]) {
                createNewChat();
            }
        });
    };

    const loadChatMessages = (chatId) => {
        if(messagesUnsubscribe) messagesUnsubscribe();
        const messagesRef = collection(db, 'users', currentUser.uid, 'chats', chatId, 'messages');
        const q = query(messagesRef, orderBy('createdAt'));
        
        messagesUnsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if(chats[chatId]) chats[chatId].messages = messages;
            if (activeChatId === chatId) {
                renderMessages(messages);
            }
        });
    }

    const createNewChat = async () => {
        if (!currentUser) {
            showAuthModal();
            return;
        }
        const newChat = {
            title: 'Untitled Chat',
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
            owner: currentUser.uid
        };
        try {
            const chatRef = await addDoc(collection(db, 'users', currentUser.uid, 'chats'), newChat);
            setActiveChat(chatRef.id);
        } catch (error) {
            console.error("Error creating new chat:", error);
        }
    };

    const setActiveChat = (id) => {
        if (activeChatId === id) return;
        activeChatId = id;
        loadChatMessages(id);
        renderChatList();
        renderMessages(chats[id]?.messages || []);
    };
    
    const addUserMessage = async (content, image = null) => {
        if (!currentUser) {
            pendingPrompt = { content, image };
            showAuthModal();
            return;
        }
        // If there's no active chat, create one first, then add the message
        if (!activeChatId || !chats[activeChatId]) {
            await createNewChat();
        }
        // Now activeChatId should be set
        if (!activeChatId) {
            console.error("Failed to create or set an active chat.");
            return;
        }

        const message = {
            role: 'user',
            content,
            createdAt: serverTimestamp(),
            author: currentUser.uid,
        };
        if (image) message.image = image.data;

        const messagesRef = collection(db, 'users', currentUser.uid, 'chats', activeChatId, 'messages');
        await addDoc(messagesRef, message);
        
        if (chats[activeChatId].title === 'Untitled Chat' && content) {
            const chatRef = doc(db, 'users', currentUser.uid, 'chats', activeChatId);
            await updateDoc(chatRef, { title: getShortTitle(content) });
        }
        
        clearImagePreview();
        setTimeout(() => startAssistantResponse(false), 100);
    };
    
    const startAssistantResponse = async (isSummaryRequest = false) => {
        const chat = chats[activeChatId];
        if (!chat || (chat.messages.length === 0 && !isSummaryRequest)) return;

        const messagesRef = collection(db, 'users', currentUser.uid, 'chats', activeChatId, 'messages');
        const assistantMessageData = {
            role: 'assistant', content: '', createdAt: serverTimestamp(), state: 'streaming', isSummary: isSummaryRequest,
        };
        const assistantDocRef = await addDoc(messagesRef, assistantMessageData);
        const assistantMessageId = assistantDocRef.id;
        
        isStreaming = true;
        toggleStopButton(true);
        const abortController = new AbortController();
        streamingController = { stop: () => abortController.abort() };

        const systemInstruction = {
            role: 'user',
            parts: [{ text: `You are Verse... (System prompt as before)` }] // Abridged for brevity
        };

        const history = chat.messages.map(msg => {
            const parts = [{ text: msg.content }];
            if (msg.image) {
                parts.push({ inlineData: { mimeType: 'image/jpeg', data: msg.image.split(',')[1] } });
            }
            return { role: msg.role === 'user' ? 'user' : 'model', parts };
        });

        if (isSummaryRequest) {
            history.push({ role: 'user', parts: [{ text: "Please provide a concise summary..." }] });
        }

        try {
            const streamUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:streamGenerateContent?key=${GEMINI_API_KEY}`;
            const response = await fetch(streamUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [systemInstruction, ...history] }),
                signal: abortController.signal
            });
            if (!response.ok) throw new Error('API request failed');
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                const textMatches = chunk.matchAll(/"text"\s*:\s*"((?:\\.|[^"\\])*)"/g);
                for (const match of textMatches) {
                    accumulatedText += JSON.parse(`"${match[1]}"`);
                }
                const assistantMessageInDOM = messageFeed.querySelector(`[data-message-id="${assistantMessageId}"] .prose`);
                if (assistantMessageInDOM) {
                    assistantMessageInDOM.innerHTML = marked.parse(accumulatedText + '<span class="streaming-cursor"></span>');
                    messageFeed.scrollTop = messageFeed.scrollHeight;
                }
            }

            const chatRef = doc(db, 'users', currentUser.uid, 'chats', activeChatId);
            await updateDoc(doc(messagesRef, assistantMessageId), { content: accumulatedText, state: 'complete' });
            await updateDoc(chatRef, { lastUpdated: serverTimestamp(), lastMessage: getShortTitle(accumulatedText) });

        } catch (error) {
            if (error.name !== 'AbortError') console.error("API Error:", error);
            await updateDoc(doc(messagesRef, assistantMessageId), { state: 'complete' });
        } finally {
            isStreaming = false;
            streamingController = null;
            toggleStopButton(false);
        }
    };

    // --- All other UI Event Handlers (image upload, customization, etc.) remain the same ---
    
    // --- EVENT HANDLER SETUP (Abridged for brevity, same as before) ---
    menuBtn.addEventListener('click', () => { /* ... */ });
    sidebarOverlay.addEventListener('click', () => { /* ... */ });
    initialChatForm.addEventListener('submit', (e) => { e.preventDefault(); handleFirstPrompt(); });
    chatForm.addEventListener('submit', (e) => { e.preventDefault(); handleChatSubmit(); });
    chatList.addEventListener('click', (e) => { /* ... */ });
    newChatBtn.addEventListener('click', createNewChat);
    stopGenerationBtn.addEventListener('click', () => streamingController?.stop());
    
    function handleFirstPrompt() {
        const prompt = initialPromptInput.value.trim();
        if (prompt || attachedImage) {
            addUserMessage(prompt, attachedImage);
            initialPromptInput.value = '';
        }
    }
    
    function handleChatSubmit() {
        const prompt = promptInput.value.trim();
        if (prompt || attachedImage) {
            addUserMessage(prompt, attachedImage);
            promptInput.value = '';
            promptInput.style.height = 'auto';
        }
    }

    // Image & Customization handlers...
    const toggleStopButton = (show) => stopGenerationContainer.classList.toggle('hidden', !show);
});

