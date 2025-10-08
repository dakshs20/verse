// --- CONFIGURATION ---
// This is your Stripe publishable key.
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51SFpdLLaWqqtMQvqyJ9TVUt4ZTCm9o9YFQEpQNANXjapIk8JPqCUJh0sxE4HV6TVuPh6VipeYcI4tKQgRP4GZpf5007J2qH1ba';

// IMPORTANT: Set this to the URL of your running backend server.
// For local testing, it might be 'http://localhost:3000'.
const BACKEND_URL = ''; // e.g., 'https://your-mienme-backend.com'
const CREATE_PAYMENT_INTENT_ENDPOINT = `${BACKEND_URL}/create-payment-intent`;
const GET_PERSONALITY_RESULT_ENDPOINT = `${BACKEND_URL}/get-personality-result`;

// --- QUESTIONS DATA ---
const questionsData = [
    {
        "question": "When you enter a room full of people, you tend to:",
        "options": [
            { "text": "Stay near the walls and observe", "score": 1 },
            { "text": "Wait for someone to approach you", "score": 2 },
            { "text": "Select a small group and join them", "score": 3 },
            { "text": "Introduce yourself to several people", "score": 4 },
            { "text": "Become the center of attention", "score": 5 }
        ]
    },
    {
        "question": "You are more drawn to:",
        "options": [
            { "text": "Facts and concrete details", "score": 1 },
            { "text": "Practical applications", "score": 2 },
            { "text": "A mix of both ideas and practicality", "score": 3 },
            { "text": "Abstract ideas and theories", "score": 4 },
            { "text": "Future possibilities and patterns", "score": 5 }
        ]
    },
    {
        "question": "When making important decisions, you prioritize:",
        "options": [
            { "text": "Objective logic and principles", "score": 1 },
            { "text": "Efficiency and effectiveness", "score": 2 },
            { "text": "A balance of logic and feelings", "score": 3 },
            { "text": "How it will affect others' feelings", "score": 4 },
            { "text": "Personal values and harmony", "score": 5 }
        ]
    },
    {
        "question": "Your ideal weekend involves:",
        "options": [
            { "text": "A detailed itinerary planned in advance", "score": 1 },
            { "text": "A few scheduled activities", "score": 2 },
            { "text": "A general plan but with flexibility", "score": 3 },
            { "text": "Seeing where the day takes you", "score": 4 },
            { "text": "Complete spontaneity and new adventures", "score": 5 }
        ]
    },
    {
        "question": "You feel most energized after:",
        "options": [
            { "text": "Spending a quiet day alone", "score": 1 },
            { "text": "A quiet coffee with one close friend", "score": 2 },
            { "text": "A balanced day of alone time and social activity", "score": 3 },
            { "text": "A small get-together with friends", "score": 4 },
            { "text": "A large, lively party or event", "score": 5 }
        ]
    },
    {
        "question": "When working on a project, you prefer to:",
        "options": [
            { "text": "Follow established methods step-by-step", "score": 1 },
            { "text": "Use reliable, proven techniques", "score": 2 },
            { "text": "Adapt methods as you go", "score": 3 },
            { "text": "Brainstorm new and innovative approaches", "score": 4 },
            { "text": "Come up with a completely original solution", "score": 5 }
        ]
    },
    {
        "question": "In a disagreement, you are more likely to:",
        "options": [
            { "text": "Focus on the logical inconsistencies of the argument", "score": 1 },
            { "text": "Look for a fair and just solution", "score": 2 },
            { "text": "Try to see both sides of the issue", "score": 3 },
            { "text": "Ensure everyone feels heard and respected", "score": 4 },
            { "text": "Prioritize maintaining a harmonious relationship", "score": 5 }
        ]
    },
    {
        "question": "Your workspace is typically:",
        "options": [
            { "text": "Neat, organized, and everything has a place", "score": 1 },
            { "text": "Mostly organized with a few piles", "score": 2 },
            { "text": "An organized chaos I can navigate", "score": 3 },
            { "text": "Cluttered but functional", "score": 4 },
            { "text": "A creative mess that inspires you", "score": 5 }
        ]
    },
    {
        "question": "You prefer to learn by:",
        "options": [
            { "text": "Quietly reading and reflecting on your own", "score": 1 },
            { "text": "Observing others and then trying it yourself", "score": 2 },
            { "text": "A combination of instruction and practice", "score": 3 },
            { "text": "Discussing ideas in a group setting", "score": 4 },
            { "text": "Jumping in and learning through trial and error", "score": 5 }
        ]
    },
    {
        "question": "You trust your:",
        "options": [
            { "text": "Past experiences and what has worked before", "score": 1 },
            { "text": "Practical judgment", "score": 2 },
            { "text": "A balance of intuition and experience", "score": 3 },
            { "text": "Intuition and gut feelings", "score": 4 },
            { "text": "Vision for what could be", "score": 5 }
        ]
    },
    {
        "question": "When a friend is upset, you are more likely to:",
        "options": [
            { "text": "Offer practical solutions to their problem", "score": 1 },
            { "text": "Analyze the situation to find the root cause", "score": 2 },
            { "text": "Listen and offer solutions", "score": 3 },
            { "text": "Listen patiently and offer emotional support", "score": 4 },
            { "text": "Empathize deeply and share their feelings", "score": 5 }
        ]
    },
    {
        "question": "Meeting deadlines is:",
        "options": [
            { "text": "Crucial. You always finish work well in advance.", "score": 1 },
            { "text": "Important. You are usually on time.", "score": 2 },
            { "text": "Something you manage, sometimes with a final push.", "score": 3 },
            { "text": "A guideline. You work best under pressure.", "score": 4 },
            { "text": "Stressful. You prefer open-ended tasks.", "score": 5 }
        ]
    },
    {
        "question": "When thinking, you tend to:",
        "options": [
            { "text": "Process internally before speaking", "score": 1 },
            { "text": "Think for a moment, then share your thoughts", "score": 2 },
            { "text": "Mix internal processing and talking it out", "score": 3 },
            { "text": "Talk through your ideas to understand them", "score": 4 },
            { "text": "Think out loud, developing ideas as you speak", "score": 5 }
        ]
    },
    {
        "question": "You are more interested in a product's:",
        "options": [
            { "text": "Specific features and how it works", "score": 1 },
            { "text": "Reliability and user reviews", "score": 2 },
            { "text": "Overall design and function", "score": 3 },
            { "text": "The new possibilities it opens up", "score": 4 },
            { "text": "The innovative concept behind it", "score": 5 }
        ]
    },
    {
        "question": "It's more important to be:",
        "options": [
            { "text": "Correct and accurate", "score": 1 },
            { "text": "Fair and just", "score": 2 },
            { "text": "Both just and kind", "score": 3 },
            { "text": "Compassionate and understanding", "score": 4 },
            { "text": "Kind and considerate", "score": 5 }
        ]
    },
    {
        "question": "When on vacation, you prefer to:",
        "options": [
            { "text": "Have a well-structured plan and stick to it", "score": 1 },
            { "text": "Have a loose plan of key sights to see", "score": 2 },
            { "text": "Plan the first few days, then see what happens", "score": 3 },
            { "text": "Have a destination but no set plans", "score": 4 },
            { "text": "Explore spontaneously with no itinerary", "score": 5 }
        ]
    },
    {
        "question": "Which statement describes you better?",
        "options": [
            { "text": "I have a few very deep friendships.", "score": 1 },
            { "text": "I have several close friends.", "score": 2 },
            { "text": "I have a mix of deep and casual friends.", "score": 3 },
            { "text": "I have a wide circle of friends and acquaintances.", "score": 4 },
            { "text": "I make new friends easily wherever I go.", "score": 5 }
        ]
    },
    {
        "question": "When solving a problem, you first:",
        "options": [
            { "text": "Gather all the facts and data", "score": 1 },
            { "text": "Identify the practical steps to solve it", "score": 2 },
            { "text": "Look at the problem from different angles", "score": 3 },
            { "text": "Imagine various potential outcomes", "score": 4 },
            { "text": "Brainstorm a wide range of creative possibilities", "score": 5 }
        ]
    },
    {
        "question": "You are more likely to be seen as:",
        "options": [
            { "text": "Analytical and level-headed", "score": 1 },
            { "text": "Decisive and clear", "score": 2 },
            { "text": "Thoughtful and balanced", "score": 3 },
            { "text": "Warm and encouraging", "score": 4 },
            { "text": "Empathetic and supportive", "score": 5 }
        ]
    },
    {
        "question": "You prefer your life to be:",
        "options": [
            { "text": "Settled and predictable", "score": 1 },
            { "text": "Organized and planned", "score": 2 },
            { "text": "A mix of routine and spontaneity", "score": 3 },
            { "text": "Flexible and adaptable", "score": 4 },
            { "text": "Full of surprises and new experiences", "score": 5 }
        ]
    },
    {
        "question": "At work, you get more satisfaction from:",
        "options": [
            { "text": "Deeply focusing on a single, complex task", "score": 1 },
            { "text": "Completing a project with a clear outcome", "score": 2 },
            { "text": "A mix of solo work and collaboration", "score": 3 },
            { "text": "Collaborating with a team on a shared goal", "score": 4 },
            { "text": "Leading and motivating a team", "score": 5 }
        ]
    },
    {
        "question": "You are more impressed by:",
        "options": [
            { "text": "Technical skill and mastery of a craft", "score": 1 },
            { "text": "Efficiency and practical results", "score": 2 },
            { "text": "A combination of skill and vision", "score": 3 },
            { "text": "Originality and a unique vision", "score": 4 },
            { "text": "Inspiration and creative genius", "score": 5 }
        ]
    },
    {
        "question": "When giving feedback, you tend to be:",
        "options": [
            { "text": "Direct, objective, and focused on improvement", "score": 1 },
            { "text": "Candid and straightforward", "score": 2 },
            { "text": "Balanced, starting with positives then areas for improvement", "score": 3 },
            { "text": "Encouraging and focused on the person's strengths", "score": 4 },
            { "text": "Diplomatic, gentle, and concerned about feelings", "score": 5 }
        ]
    },
    {
        "question": "You enjoy tasks that have:",
        "options": [
            { "text": "Clear goals and a definite conclusion", "score": 1 },
            { "text": "A sense of completion when finished", "score": 2 },
            { "text": "A mix of defined goals and open exploration", "score": 3 },
            { "text": "The flexibility to change direction as you work", "score": 4 },
            { "text": "The freedom to explore without a fixed outcome", "score": 5 }
        ]
    },
    {
        "question": "In a group discussion, you are more likely to:",
        "options": [
            { "text": "Listen carefully to all points before speaking", "score": 1 },
            { "text": "Contribute once you have formulated your thoughts", "score": 2 },
            { "text": "Listen and contribute throughout the discussion", "score": 3 },
            { "text": "Jump in with ideas to move the conversation forward", "score": 4 },
            { "text": "Facilitate the conversation and share lots of ideas", "score": 5 }
        ]
    },
    {
        "question": "You prefer stories that are:",
        "options": [
            { "text": "Realistic and based on true events", "score": 1 },
            { "text": "Grounded and believable", "score": 2 },
            { "text": "A mix of realism and imagination", "score": 3 },
            { "text": "Symbolic and full of meaning", "score": 4 },
            { "text": "Highly imaginative and conceptual", "score": 5 }
        ]
    },
    {
        "question": "It's worse to be seen as:",
        "options": [
            { "text": "Illogical", "score": 1 },
            { "text": "Inefficient", "score": 2 },
            { "text": "Unbalanced", "score": 3 },
            { "text": "Uncaring", "score": 4 },
            { "text": "Conflict-driven", "score": 5 }
        ]
    },
    {
        "question": "When starting a new project, you feel:",
        "options": [
            { "text": "Anxious until there's a clear plan", "score": 1 },
            { "text": "Motivated to create a schedule and checklist", "score": 2 },
            { "text": "A mix of excitement and a desire for structure", "score": 3 },
            { "text": "Excited by the possibilities and new ideas", "score": 4 },
            { "text": "Energized by the freedom to explore and create", "score": 5 }
        ]
    },
    {
        "question": "You find it easy to:",
        "options": [
            { "text": "Concentrate in a quiet environment", "score": 1 },
            { "text": "Focus on your own thoughts", "score": 2 },
            { "text": "Switch between solo work and group work", "score": 3 },
            { "text": "Start conversations with strangers", "score": 4 },
            { "text": "Be the life of the party", "score": 5 }
        ]
    },
    {
        "question": "You would rather be known as:",
        "options": [
            { "text": "A reliable and sensible person", "score": 1 },
            { "text": "A practical and down-to-earth person", "score": 2 },
            { "text": "Someone who is both practical and creative", "score": 3 },
            { "text": "A creative and insightful person", "score": 4 },
            { "text": "A visionary and innovative person", "score": 5 }
        ]
    },
    {
        "question": "You feel a greater sense of pride from:",
        "options": [
            { "text": "Building something that is logically sound and efficient", "score": 1 },
            { "text": "Making a system work better", "score": 2 },
            { "text": "Finding a solution that helps people practically", "score": 3 },
            { "text": "Helping someone achieve their potential", "score": 4 },
            { "text": "Creating a positive and harmonious community", "score": 5 }
        ]
    },
    {
        "question": "Your approach to decision-making is to:",
        "options": [
            { "text": "Decide quickly and move on", "score": 1 },
            { "text": "Weigh the pros and cons, then decide", "score": 2 },
            { "text": "Consider the options for a while", "score": 3 },
            { "text": "Keep your options open as long as possible", "score": 4 },
            { "text": "Struggle with making a final choice", "score": 5 }
        ]
    },
    {
        "question": "Being in a loud, busy environment for too long makes you feel:",
        "options": [
            { "text": "Completely drained and overwhelmed", "score": 1 },
            { "text": "Tired and in need of a break", "score": 2 },
            { "text": "Sometimes tired, sometimes energized", "score": 3 },
            { "text": "Stimulated and engaged", "score": 4 },
            { "text": "Energized and excited", "score": 5 }
        ]
    },
    {
        "question": "In conversations, you are more likely to:",
        "options": [
            { "text": "Talk about specific details and events", "score": 1 },
            { "text": "Discuss practical matters and experiences", "score": 2 },
            { "text": "Move between concrete topics and ideas", "score": 3 },
            { "text": "Explore underlying meanings and connections", "score": 4 },
            { "text": "Talk about theories and abstract concepts", "score": 5 }
        ]
    },
    {
        "question": "You believe that truth should be pursued:",
        "options": [
            { "text": "Regardless of how it makes people feel", "score": 1 },
            { "text": "With objectivity and impartiality", "score": 2 },
            { "text": "With a balance of truth and tact", "score": 3 },
            { "text": "With compassion and sensitivity", "score": 4 },
            { "text": "With harmony as the ultimate goal", "score": 5 }
        ]
    },
    {
        "question": "You feel more comfortable when:",
        "options": [
            { "text": "You know exactly what to expect", "score": 1 },
            { "text": "Things are settled and decided", "score": 2 },
            { "text": "There is a plan, but it's flexible", "score": 3 },
            { "text": "You can adapt to new information", "score": 4 },
            { "text": "Things are open-ended and full of possibility", "score": 5 }
        ]
    },
    {
        "question": "You often find yourself:",
        "options": [
            { "text": "Lost in thought, even in a group", "score": 1 },
            { "text": "Needing time alone to recharge", "score": 2 },
            { "text": "Enjoying both social time and solitude", "score": 3 },
            { "text": "Seeking out social interaction", "score": 4 },
            { "text": "Feeling bored when you're by yourself for too long", "score": 5 }
        ]
    },
    {
        "question": "When describing an event, you focus on:",
        "options": [
            { "text": "What literally happened, in sequential order", "score": 1 },
            { "text": "The key facts and details", "score": 2 },
            { "text": "The overall experience and key details", "score": 3 },
            { "text": "The overall impression and meaning it had for you", "score": 4 },
            { "text": "The underlying themes and patterns", "score": 5 }
        ]
    },
    {
        "question": "You are more firm about:",
        "options": [
            { "text": "Your principles and logical conclusions", "score": 1 },
            { "text": "What you think is fair and effective", "score": 2 },
            { "text": "Finding a middle ground", "score": 3 },
            { "text": "What you believe is right for people", "score": 4 },
            { "text": "Your deeply held personal values", "score": 5 }
        ]
    },
    {
        "question": "On a typical weekday, you prefer to:",
        "options": [
            { "text": "Follow a consistent, productive routine", "score": 1 },
            { "text": "Work through a to-do list", "score": 2 },
            { "text": "Have a routine but welcome interesting detours", "score": 3 },
            { "text": "Handle tasks as they arise", "score": 4 },
            { "text": "Embrace a flexible day driven by inspiration", "score": 5 }
        ]
    }
];

// --- STATE MANAGEMENT ---
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let stripe, elements, clientSecret;

// --- DOM ELEMENTS ---
const pages = {
    landing: document.getElementById('page-landing'),
    test: document.getElementById('page-test'),
    payment: document.getElementById('page-payment'),
    results: document.getElementById('page-results'),
};
const startTestBtn = document.getElementById('start-test-btn');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const progressBarEl = document.getElementById('progress-bar');
const progressPercentEl = document.getElementById('progress-percent');
const nextQuestionBtn = document.getElementById('next-question-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const loadingText = document.getElementById('loading-text');
const submitPaymentBtn = document.getElementById('submit-payment-btn');
const paymentMessage = document.getElementById('payment-message');
const resultsContentEl = document.getElementById('results-content');
const downloadResultsBtn = document.getElementById('download-results-btn');

// --- APPLICATION LOGIC ---

// Utility to show/hide pages
const showPage = (pageId) => {
    Object.values(pages).forEach(page => page.classList.add('hidden'));
    pages[pageId].classList.remove('hidden');
    window.scrollTo(0, 0);
};

// Utility to show/hide the main loading spinner
const showLoader = (show, text = 'Loading...') => {
    loadingText.textContent = text;
    loadingSpinner.classList.toggle('hidden', !show);
};

// 1. Initializer function
const initialize = () => {
    showLoader(true, 'Loading test...');
    try {
        questions = questionsData;
        if (!questions || questions.length === 0) {
             throw new Error('Questions data is missing or empty.');
        }
        setupEventListeners();
        showPage('landing');
    } catch (error) {
        console.error("Initialization Error:", error);
        document.getElementById('app').innerHTML = `<div class="text-center text-red-500">Failed to load the application. Please check the console and refresh.</div>`;
    } finally {
        showLoader(false);
    }
};

// 2. Setup all event listeners
const setupEventListeners = () => {
    startTestBtn.addEventListener('click', startTest);
    nextQuestionBtn.addEventListener('click', handleNextQuestion);
    submitPaymentBtn.addEventListener('click', handlePaymentSubmit);
    downloadResultsBtn.addEventListener('click', downloadResultsAsPDF);
};

// 3. Start the test
const startTest = () => {
    currentQuestionIndex = 0;
    userAnswers = {};
    showPage('test');
    displayQuestion();
};

// 4. Display the current question and options
const displayQuestion = () => {
    if (currentQuestionIndex >= questions.length) {
        finishTest();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionNumberEl.textContent = currentQuestionIndex + 1;
    questionTextEl.textContent = question.question;

    optionsContainerEl.innerHTML = '';
    question.options.forEach(option => {
        const optionId = `q${currentQuestionIndex}_${option.score}`;
        const optionEl = document.createElement('div');
        optionEl.innerHTML = `
            <input type="radio" name="question${currentQuestionIndex}" id="${optionId}" value="${option.score}">
            <label for="${optionId}" class="block w-full text-left p-4 border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50">
                ${option.text}
            </label>
        `;
        optionsContainerEl.appendChild(optionEl);
    });
    
    // Add change listener to options
    optionsContainerEl.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', handleAnswerSelection);
    });

    updateProgress();
    nextQuestionBtn.disabled = true;
    nextQuestionBtn.classList.add('bg-gray-300', 'text-gray-500');
    nextQuestionBtn.classList.remove('bg-indigo-600', 'text-white');
};

// 5. Handle when a user selects an answer
const handleAnswerSelection = (event) => {
    userAnswers[currentQuestionIndex] = parseInt(event.target.value);
    nextQuestionBtn.disabled = false;
    nextQuestionBtn.classList.remove('bg-gray-300', 'text-gray-500');
    nextQuestionBtn.classList.add('bg-indigo-600', 'text-white');
};

// 6. Move to the next question
const handleNextQuestion = () => {
    currentQuestionIndex++;
    displayQuestion();
};

// 7. Update progress bar
const updateProgress = () => {
    const percent = ((currentQuestionIndex) / questions.length) * 100;
    progressBarEl.style.width = `${percent}%`;
    progressPercentEl.textContent = `${Math.round(percent)}%`;
};

// 8. Finish test and move to payment
const finishTest = async () => {
    // Final progress update
    progressBarEl.style.width = `100%`;
    progressPercentEl.textContent = `100%`;

    showLoader(true, 'Preparing your results...');
    try {
        if (!BACKEND_URL) {
            throw new Error("Backend URL is not configured. Please set the BACKEND_URL constant in script.js.");
        }
        await initializePayment();
        showPage('payment');
    } catch (error) {
        console.error('Payment Initialization Error:', error);
        alert(`Could not initialize payment: ${error.message}`);
    } finally {
        showLoader(false);
    }
};

// 9. Initialize Stripe and payment elements
const initializePayment = async () => {
    stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

    // This fetch call is where you connect to your backend.
    // It's critical for security.
    const response = await fetch(CREATE_PAYMENT_INTENT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 299, currency: 'usd' })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('Backend Error Response:', errorBody);
        throw new Error('Failed to create payment intent. Check backend logs and ensure it is running.');
    }

    const { clientSecret: secret } = await response.json();
    clientSecret = secret;

    const appearance = { theme: 'stripe' };
    elements = stripe.elements({ appearance, clientSecret });

    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
};

// 10. Handle payment submission
const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setPaymentLoading(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: window.location.href.split('?')[0],
        },
        redirect: 'if_required' 
    });

    if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
            showMessage(error.message);
        } else {
            showMessage("An unexpected error occurred.");
        }
        setPaymentLoading(false);
    } else {
         fetchAiResults();
    }
};

// 11. Fetch AI results from backend after successful payment
const fetchAiResults = async () => {
    showPage('test'); 
    showLoader(true, 'Analyzing your personality...');
    try {
        const response = await fetch(GET_PERSONALITY_RESULT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: userAnswers })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Backend Error Response:', errorBody);
            throw new Error('Failed to get analysis from AI service.');
        }

        const { result } = await response.json();
        resultsContentEl.innerHTML = result.replace(/\n/g, '<br>'); // Format for HTML
        showPage('results');

    } catch(error) {
        console.error("AI Fetch Error:", error);
        alert(`There was an error generating your results. Please contact support. Details: ${error.message}`);
        showPage('landing');
    } finally {
        showLoader(false);
    }
};

// 12. Download results as a PDF
const downloadResultsAsPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const content = document.getElementById('results-content').innerText;
    
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Your MienMe Personality Analysis', 105, 20, null, null, 'center');
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);
    
    const splitText = doc.splitTextToSize(content, 180);
    doc.text(splitText, 15, 40);
    
    doc.save('MienMe-Personality-Results.pdf');
};


// --- UI HELPER FUNCTIONS for payment form ---
const showMessage = (messageText) => {
    paymentMessage.classList.remove('hidden');
    paymentMessage.textContent = messageText;
    setTimeout(() => { paymentMessage.classList.add('hidden'); }, 4000);
};

const setPaymentLoading = (isLoading) => {
    submitPaymentBtn.disabled = isLoading;
    document.getElementById('button-text').classList.toggle('hidden', isLoading);
    document.getElementById('payment-spinner').classList.toggle('hidden', !isLoading);
};

// --- START THE APP ---
document.addEventListener('DOMContentLoaded', initialize);
