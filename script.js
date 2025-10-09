document.addEventListener('DOMContentLoaded', () => {
    const startBtnHero = document.getElementById('start-btn-hero');
    const startBtnCta = document.getElementById('start-btn-cta');
    const retakeBtn = document.getElementById('retake-btn');
    const backToHomeBtn = document.getElementById('back-to-home-btn');

    const landingPage = document.getElementById('landing-page');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const header = document.getElementById('header');
    
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionCounter = document.getElementById('question-counter');
    const progressBar = document.getElementById('progress-bar');
    
    const questions = [
        { q: "You feel energized after spending time at a large social gathering.", trait: 'EI' },
        { q: "You are often the first to introduce yourself to new people.", trait: 'EI' },
        { q: "You prefer a quiet evening at home over a loud party.", trait: 'EI', reversed: true },
        { q: "In conversations, you tend to do more listening than talking.", trait: 'EI', reversed: true },
        { q: "Being the center of attention is something you enjoy.", trait: 'EI' },
        { q: "You prefer to reflect on things by yourself rather than discussing them.", trait: 'EI', reversed: true },
        { q: "You prefer to focus on practical, hands-on tasks.", trait: 'SN' },
        { q: "You trust concrete facts and past experiences more than theories.", trait: 'SN' },
        { q: "You are more interested in abstract ideas and future possibilities.", trait: 'SN', reversed: true },
        { q: "You often find yourself contemplating the 'deeper meaning' of things.", trait: 'SN', reversed: true },
        { q: "You pay great attention to details and specifics.", trait: 'SN' },
        { q: "You are drawn to symbolic language and metaphors.", trait: 'SN', reversed: true },
        { q: "You are a realistic and down-to-earth person.", trait: 'SN' },
        { q: "You make decisions based on objective logic rather than personal feelings.", trait: 'TF' },
        { q: "It is more important for you to be truthful than to be tactful.", trait: 'TF' },
        { q: "You prioritize harmony and the feelings of others when making choices.", trait: 'TF', reversed: true },
        { q: "You are easily moved by emotional stories or appeals.", trait: 'TF', reversed: true },
        { q: "You seek out logical explanations for everything.", trait: 'TF' },
        { q: "You find it easy to empathize with other people's situations.", trait: 'TF', reversed: true },
        { q: "You like to have a clear plan and finish your work well before the deadline.", trait: 'JP' },
        { q: "You feel more comfortable when your daily life is structured and organized.", trait: 'JP' },
        { q: "You prefer to keep your options open rather than making a final decision.", trait: 'JP', reversed: true },
        { q: "You enjoy spontaneity and last-minute adventures.", trait: 'JP', reversed: true },
        { q: "Making lists and sticking to a schedule is important to you.", trait: 'JP' },
        { q: "You enjoy adapting to new situations as they arise.", trait: 'JP', reversed: true },
    ];
    
    const personalityTypes = {
        'ISTJ': { title: 'The Inspector', description: 'Practical, fact-minded individuals whose reliability cannot be doubted. They are thorough, responsible, and uphold traditions.', careers: 'Accountant, Systems Analyst, Auditor, Civil Engineer, Logistics Manager.', song: { name: 'Fix You', artist: 'Coldplay' } },
        'ISFJ': { title: 'The Protector', description: 'Very dedicated and warm protectors, always ready to defend their loved ones. They are meticulous, supportive, and patient.', careers: 'Nurse, Teacher, Social Worker, Human Resources, Interior Designer.', song: { name: 'Lean on Me', artist: 'Bill Withers' } },
        'INFJ': { title: 'The Advocate', description: 'Quiet and mystical, yet very inspiring and tireless idealists. They are insightful, creative, and principled.', careers: 'Counselor, Writer, Psychologist, Non-profit Director, Graphic Designer.', song: { name: 'Imagine', artist: 'John Lennon' } },
        'INTJ': { title: 'The Architect', description: 'Imaginative and strategic thinkers, with a plan for everything. They are independent, analytical, and driven.', careers: 'Scientist, Strategic Planner, Software Developer, Architect, University Professor.', song: { name: 'The Sound of Silence', artist: 'Simon & Garfunkel' } },
        'ISTP': { title: 'The Virtuoso', description: 'Bold and practical experimenters, masters of all kinds of tools. They are observant, adaptable, and action-oriented.', careers: 'Mechanic, Forensic Scientist, Pilot, Paramedic, Landscape Architect.', song: { name: 'Born to Run', artist: 'Bruce Springsteen' } },
        'ISFP': { title: 'The Adventurer', description: 'Flexible and charming artists, always ready to explore and experience something new. They are artistic, spontaneous, and sensitive.', careers: 'Artist, Musician, Fashion Designer, Veterinarian, Chef.', song: { name: 'Here Comes the Sun', artist: 'The Beatles' } },
        'INFP': { title: 'The Mediator', description: 'Poetic, kind and altruistic people, always eager to help a good cause. They are idealistic, empathetic, and loyal.', careers: 'Author, Mediator, Physical Therapist, Editor, Anthropologist.', song: { name: 'What a Wonderful World', artist: 'Louis Armstrong' } },
        'INTP': { title: 'The Logician', description: 'Innovative inventors with an unquenchable thirst for knowledge. They are logical, abstract, and original.', careers: 'Philosopher, Computer Programmer, Financial Analyst, Mathematician, Researcher.', song: { name: 'Bohemian Rhapsody', artist: 'Queen' } },
        'ESTP': { title: 'The Entrepreneur', description: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge. They are resourceful, charismatic, and pragmatic.', careers: 'Sales Representative, Entrepreneur, Detective, Stockbroker, Paramedic.', song: { name: 'Don\'t Stop Me Now', artist: 'Queen' } },
        'ESFP': { title: 'The Entertainer', description: 'Spontaneous, energetic and enthusiastic people – life is never boring around them. They are sociable, playful, and optimistic.', careers: 'Event Planner, Actor, Tour Guide, Flight Attendant, Sales Manager.', song: { name: 'Happy', artist: 'Pharrell Williams' } },
        'ENFP': { title: 'The Campaigner', description: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile. They are imaginative, warm, and independent.', careers: 'Public Relations Specialist, Journalist, Life Coach, Urban Planner, Diplomat.', song: { name: 'Walking on Sunshine', artist: 'Katrina & The Waves' } },
        'ENTP': { title: 'The Debater', description: 'Smart and curious thinkers who cannot resist an intellectual challenge. They are quick-witted, innovative, and love to brainstorm.', careers: 'Lawyer, Consultant, Political Analyst, Venture Capitalist, Systems Analyst.', song: { name: 'Mr. Brightside', artist: 'The Killers' } },
        'ESTJ': { title: 'The Executive', description: 'Excellent administrators, unsurpassed at managing things – or people. They are organized, decisive, and efficient.', careers: 'Manager, Judge, Financial Officer, School Administrator, Military Officer.', song: { name: 'Takin\' Care of Business', artist: 'Bachman-Turner Overdrive' } },
        'ESFJ': { title: 'The Consul', description: 'Extraordinarily caring, social and popular people, always eager to help. They are cooperative, loyal, and thrive on social interaction.', careers: 'Teacher, Event Coordinator, Nurse, Public Relations, Office Manager.', song: { name: 'You\'ve Got a Friend in Me', artist: 'Randy Newman' } },
        'ENFJ': { title: 'The Protagonist', description: 'Charismatic and inspiring leaders, able to mesmerize their listeners. They are empathetic, persuasive, and responsible.', careers: 'Teacher, Politician, Sales Manager, HR Director, Life Coach.', song: { name: 'Don\'t Stop Believin\'', artist: 'Journey' } },
        'ENTJ': { title: 'The Commander', description: 'Bold, imaginative and strong-willed leaders, always finding a way – or making one. They are strategic, confident, and assertive.', careers: 'CEO, Entrepreneur, Lawyer, University President, Executive.', song: { name: 'Eye of the Tiger', artist: 'Survivor' } }
    };

    let currentQuestionIndex = 0;
    let scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
    
    function transitionTo(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        page.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        scores = { EI: 0, SN: 0, TF: 0, JP: 0 };
        document.getElementById('trait-breakdown').innerHTML = '';
        document.body.classList.add('quiz-active');
        transitionTo(quizScreen);
        displayQuestion();
    }
    
    function returnToHome() {
        document.body.classList.remove('quiz-active');
        transitionTo(landingPage);
    }

    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        questionText.classList.add('fade-out');
        
        setTimeout(() => {
            questionText.textContent = question.q;
            questionText.classList.remove('fade-out');
            updateProgress();
        }, 300);
    }

    function handleAnswer(e) {
        const selectedButton = e.target.closest('button.btn-option');
        if (!selectedButton) return;

        const value = parseInt(selectedButton.dataset.value);
        const question = questions[currentQuestionIndex];
        
        if (question.reversed) {
            scores[question.trait] -= value;
        } else {
            scores[question.trait] += value;
        }
        
        optionsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true);
        selectedButton.classList.add('selected');

        setTimeout(() => {
            optionsContainer.querySelectorAll('button').forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('selected');
            });
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                showResult();
            }
        }, 400);
    }

    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        questionCounter.textContent = `Statement ${currentQuestionIndex + 1} of ${questions.length}`;
    }
    
    function calculateResult() {
        let result = '';
        result += (scores.EI <= 0) ? 'I' : 'E';
        result += (scores.SN <= 0) ? 'S' : 'N';
        result += (scores.TF <= 0) ? 'T' : 'F';
        result += (scores.JP <= 0) ? 'J' : 'P';
        return result;
    }

    function showResult() {
        const resultType = calculateResult();
        const resultData = personalityTypes[resultType];
        
        document.getElementById('result-type').textContent = ''; // Clear for animation
        document.getElementById('result-title').textContent = resultData.title;
        document.getElementById('result-description').textContent = resultData.description;
        document.getElementById('result-careers').textContent = resultData.careers;
        document.getElementById('result-song-name').textContent = resultData.song.name;
        document.getElementById('result-song-artist').textContent = resultData.song.artist;
        
        transitionTo(resultScreen);
        animateResultType(resultType);
        setTimeout(() => displayTraitBreakdown(), 100);
    }

    function animateResultType(type) {
        const container = document.getElementById('result-type');
        let i = 0;
        const interval = setInterval(() => {
            if (i < type.length) {
                const letterSpan = document.createElement('span');
                letterSpan.textContent = type[i];
                letterSpan.className = 'inline-block opacity-0 translate-y-4 transition-all duration-300 ease-out';
                container.appendChild(letterSpan);
                setTimeout(() => {
                    letterSpan.classList.remove('opacity-0', 'translate-y-4');
                }, 10);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 150);
    }
    
    function displayTraitBreakdown() {
        const container = document.getElementById('trait-breakdown');
        container.innerHTML = '';
        const traitData = {
            EI: { name: 'Energy', left: 'Introvert', right: 'Extrovert', count: 6 },
            SN: { name: 'Information', left: 'Sensing', right: 'Intuition', count: 7 },
            TF: { name: 'Decisions', left: 'Thinking', right: 'Feeling', count: 6 },
            JP: { name: 'Lifestyle', left: 'Judging', right: 'Perceiving', count: 6 }
        };

        for (const trait in scores) {
            const data = traitData[trait];
            const maxScore = data.count * 2;
            const score = scores[trait];
            
            const rightPercent = 50 + (score / maxScore) * 50;
            const leftPercent = 100 - rightPercent;

            const element = document.createElement('div');
            element.innerHTML = `
                <div class="font-bold text-center text-lg mb-2">${data.name}</div>
                <div class="flex justify-between items-center text-sm font-semibold text-gray-600 mb-1 px-1">
                    <span>${data.left}</span>
                    <span>${data.right}</span>
                </div>
                <div class="trait-bar">
                    <div class="bar-segment bar-left justify-start pl-2" style="width: 0%">${Math.round(leftPercent)}%</div>
                    <div class="bar-segment bar-right justify-end pr-2" style="width: 0%">${Math.round(rightPercent)}%</div>
                </div>
            `;
            container.appendChild(element);

            setTimeout(() => {
                element.querySelector('.bar-left').style.width = `${leftPercent}%`;
                element.querySelector('.bar-right').style.width = `${rightPercent}%`;
            }, 200);
        }
    }

    // --- EVENT LISTENERS ---
    startBtnHero.addEventListener('click', startQuiz);
    startBtnCta.addEventListener('click', startQuiz);
    retakeBtn.addEventListener('click', returnToHome);
    backToHomeBtn.addEventListener('click', returnToHome);
    optionsContainer.addEventListener('click', handleAnswer);

    // Scroll animations
    const animatedItems = document.querySelectorAll('.animated-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    animatedItems.forEach(item => observer.observe(item));

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
