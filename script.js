// Ensure React and ReactDOM are loaded globally via CDN in index.html
const { useState, useEffect, useRef } = React;

// Lucide React icons (simulated with inline SVGs for direct embed)
// These are defined as React components here as they are used directly in JSX.
const Brain = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-4z"></path><path d="M12 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4z"></path><path d="M12 16a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4z"></path></svg>;
const Lightbulb = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 3c0 1.3.5 2.6 1.5 3.5.8.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M10 19.5c.5.5 1 1.5 2 1.5s1.5-.5 2-1.5"></path></svg>;
const User = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path></svg>;
const Handshake = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 11V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6l-3 3-3-3z"></path><path d="M14 11l3 3 3-3v6a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-6z"></path><path d="M10 13l-3 3-3-3v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6z"></path></svg>;
const Cloud = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H18a2 2 0 0 0 2-2V8.5a2.5 2.5 0 0 0-2.5-2.5h-1.5A2.5 2.5 0 0 0 12 3a2.5 2.5 0 0 0-2.5 2.5H8A2.5 2.5 0 0 0 5.5 8.5V17a2 2 0 0 0 2 2H8"></path><path d="M12 19a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.5a2.5 2.5 0 0 0-2.5-2.5H16A2.5 2.5 0 0 0 13.5 12a2.5 2.5 0 0 0-2.5 2.5V17a2 2 0 0 0 2 2z"></path></svg>;
const Info = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>;
const Home = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const X = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>;
const Briefcase = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>;
const LightbulbSparkle = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 3c0 1.3.5 2.6 1.5 3.5.8.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M10 19.5c.5.5 1 1.5 2 1.5s1.5-.5 2-1.5"></path><path d="M12 2v1"></path><path d="M12 21v1"></path><path d="M3 12h1"></path><path d="M20 12h1"></path><path d="m18.364 5.636-.707.707"></path><path d="m5.636 18.364.707-.707"></path><path d="m18.364 18.364-.707-.707"></path><path d="m5.636 5.636.707.707"></path></svg>;
const Zap = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const MessageSquare = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const Sparkles = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.9 10.8c.1.5.8 1.2 1.5 1.9 1.4 1.5 2.8 2.2 4.2 2.8 1.4.6 2.8.9 4.2.9H22"></path><path d="M19 2h3"></path><path d="M20.5 3.5v3"></path><path d="M14 10l-2 2-2-2"></path><path d="M12 22v-2"></path><path d="M12 4V2"></path><path d="M4 12H2"></path><path d="M22 12h-2"></path><path d="m18.36 18.36-.71-.71"></path><path d="m5.64 5.64.71.71"></path><path d="m18.36 5.64-.71.71"></path><path d="m5.64 18.36.71-.71"></path></svg>;


// Header Component
const Header = ({ onGoHome, onLearnMore, currentPage }) => {
  return (
    <header className="w-full text-white p-4 flex justify-between items-center relative z-20
                       transform transition-all duration-700 ease-in-out">
      {/* Logo / Home Button */}
      <div className="flex items-center">
        {currentPage !== 'home' && (
          <button
            onClick={onGoHome}
            className="p-2 rounded-full bg-gray-700 bg-opacity-20 hover:bg-opacity-30 transition duration-300 mr-4"
            aria-label="Go to Home"
          >
            <Home className="w-6 h-6 text-white" />
          </button>
        )}
        {/* Adjusted text color for visibility and shimmer effect, now using 'Mersad' font */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wider animate-shimmer-text text-left text-gray-900" style={{ fontFamily: 'Mersad, cursive' }}>
          MienMe
        </h1>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex items-center">
        {currentPage !== 'about' && (
          <button
            onClick={onLearnMore}
            className="px-4 py-2 bg-white text-blue-800 rounded-full flex items-center justify-center border border-blue-300
                       hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            <Info className="w-5 h-5 mr-2" /> About Big Five
          </button>
        )}
      </nav>
    </header>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


  // Questions for the Big Five Personality Test - Rephrased for clarity
  const questions = [
    // Openness to Experience (O) - 10 questions
    { id: 1, text: "I enjoy learning new words and concepts.", trait: "O", direction: "positive" },
    { id: 2, text: "I have a very active and creative imagination.", trait: "O", direction: "positive" },
    { id: 3, text: "I often spend time thinking deeply about various topics.", trait: "O", direction: "positive" },
    { id: 4, text: "I am full of new and original ideas.", trait: "O", direction: "positive" },
    { id: 5, text: "I prefer practical and realistic ideas over abstract ones.", trait: "O", direction: "negative" },
    { id: 6, text: "I don't enjoy discussing deep philosophical or theoretical topics.", trait: "O", direction: "negative" },
    { id: 7, text: "I generally don't enjoy art, music, or poetry.", trait: "O", direction: "negative" },
    { id: 8, text: "I prefer traditional ways of doing things and familiar routines.", trait: "O", direction: "negative" },
    { id: 9, text: "I love trying new and different experiences.", trait: "O", direction: "positive" },
    { id: 10, text: "I prefer variety in my life rather than routine.", trait: "O", direction: "positive" },

    // Conscientiousness (C) - 10 questions
    { id: 11, text: "I am always prepared for tasks and events.", trait: "C", direction: "positive" },
    { id: 12, text: "I pay close attention to details and strive for accuracy.", trait: "C", direction: "positive" },
    { id: 13, text: "I get my chores and duties done right away.", trait: "C", direction: "positive" },
    { id: 14, text: "I like my surroundings to be neat and orderly.", trait: "C", direction: "positive" },
    { id: 15, text: "I often forget to put things back where they belong.", trait: "C", direction: "negative" },
    { id: 16, text: "I tend to make a mess or leave things disorganized.", trait: "C", direction: "negative" },
    { id: 17, text: "I sometimes avoid or neglect my responsibilities.", trait: "C", direction: "negative" },
    { id: 18, text: "I am not very systematic or methodical in my approach.", trait: "C", direction: "negative" },
    { id: 19, text: "I like to follow a plan or schedule.", trait: "C", direction: "positive" },
    { id: 20, text: "I am efficient and productive in my work.", trait: "C", direction: "positive" },

    // Extraversion (E) - 10 questions
    { id: 21, text: "I am often the center of attention at social gatherings.", trait: "E", direction: "positive" },
    { id: 22, text: "I feel comfortable and at ease around most people.", trait: "E", direction: "positive" },
    { id: 23, text: "I frequently start conversations with others.", trait: "E", direction: "positive" },
    { id: 24, text: "I tend to talk a lot when I'm with people.", trait: "E", direction: "positive" },
    { id: 25, text: "I don't mind being the focus of attention.", trait: "E", direction: "positive" },
    { id: 26, text: "I prefer not to draw attention to myself.", trait: "E", direction: "negative" },
    { id: 27, text: "I am quiet and reserved around strangers.", trait: "E", direction: "negative" },
    { id: 28, text: "I often have little to say in group settings.", trait: "E", direction: "negative" },
    { id: 29, text: "I prefer to stay in the background rather than stand out.", trait: "E", direction: "negative" },
    { id: 30, text: "I am a reserved person and keep to myself.", trait: "E", direction: "negative" },

    // Agreeableness (A) - 10 questions
    { id: 31, text: "I am genuinely interested in other people's lives and feelings.", trait: "A", direction: "positive" },
    { id: 32, text: "I feel sympathy and concern for others' feelings.", trait: "A", direction: "positive" },
    { id: 33, text: "I have a soft heart and am kind to others.", trait: "A", direction: "positive" },
    { id: 34, text: "I make people feel at ease and comfortable around me.", trait: "A", direction: "positive" },
    { id: 35, text: "I take time out of my day to help others.", trait: "A", direction: "positive" },
    { id: 36, text: "I sometimes insult or criticize people.", trait: "A", direction: "negative" },
    { id: 37, text: "I am not very interested in other people's problems.", trait: "A", direction: "negative" },
    { id: 38, text: "I feel little concern or empathy for others.", trait: "A", direction: "negative" },
    { id: 39, text: "I get angry quickly or easily.", trait: "A", direction: "negative" },
    { id: 40, text: "I am sometimes apathetic or indifferent towards others.", trait: "A", direction: "negative" },

    // Neuroticism (N) - 10 questions
    { id: 41, text: "I get stressed out easily by everyday situations.", trait: "N", direction: "positive" },
    { id: 42, text: "I worry a lot about various things.", trait: "N", direction: "positive" },
    { id: 43, text: "I am easily disturbed or bothered by things.", trait: "N", direction: "positive" },
    { id: 44, text: "I get upset easily and frequently.", trait: "N", direction: "positive" },
    { id: 45, text: "I experience frequent mood swings.", trait: "N", direction: "positive" },
    { id: 46, text: "I am generally relaxed and calm most of the time.", trait: "N", direction: "negative" },
    { id: 47, text: "I seldom feel sad, down, or depressed.", trait: "N", direction: "negative" },
    { id: 48, text: "I am not easily annoyed by minor things.", trait: "N", direction: "negative" },
    { id: 49, text: "I usually remain calm and composed in tense situations.", trait: "N", direction: "negative" },
    { id: 50, text: "I am emotionally stable and consistent.", trait: "N", direction: "negative" },
  ];

  // Function to handle answer selection
  const handleAnswer = (questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  // Function to navigate to the next question or calculate results
  const handleNextQuestion = () => {
    // Check if the current question has been answered
    if (answers[questions[currentQuestionIndex].id] === undefined) {
      // Using a custom message box instead of alert()
      const messageBox = document.getElementById('messageBox');
      const messageText = document.getElementById('messageText');
      const messageClose = document.getElementById('messageClose');

      if (messageBox && messageText && messageClose) {
        messageText.textContent = "Please select an answer before proceeding.";
        messageBox.classList.remove('hidden');
        messageClose.onclick = () => messageBox.classList.add('hidden');
      }
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      calculateResults();
      setCurrentPage('results');
    }
  };

  // Function to go back to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  // Algorithm to calculate Big Five scores
  const calculateResults = () => {
    const traitScores = {
      O: 0, // Openness
      C: 0, // Conscientiousness
      E: 0, // Extraversion
      A: 0, // Agreeableness
      N: 0, // Neuroticism
    };

    // Iterate through all questions and sum up scores for each trait
    questions.forEach(q => {
      const answerValue = answers[q.id];
      if (answerValue !== undefined) {
        // Reverse score for negative-worded questions
        // The scale is 1 (Strongly Disagree) to 5 (Strongly Agree)
        // For positive questions: 1=1, 2=2, 3=3, 4=4, 5=5
        // For negative questions: 1=5, 2=4, 3=3, 4=2, 5=1 (so 6 - answerValue)
        const score = q.direction === "positive" ? answerValue : (6 - answerValue);
        traitScores[q.trait] += score;
      }
    });

    // Normalize scores to a 0-100 scale (each trait has 10 questions, min score 10, max score 50)
    // Normalized score = ((raw_score - min_possible_score) / (max_possible_score - min_possible_score)) * 100
    // Min possible score for a trait (10 questions * 1 point/q) = 10
    // Max possible score for a trait (10 questions * 5 points/q) = 50
    const normalizedScores = {};
    for (const trait in traitScores) {
      normalizedScores[trait] = parseFloat(((traitScores[trait] - 10) / (50 - 10)) * 100).toFixed(2);
    }

    setScores(normalizedScores);
  };

  // Render different pages based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onStartTest={() => setCurrentPage('test')} onLearnMore={() => setCurrentPage('about')} />;
      case 'test':
        return (
          <TestPage
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            currentAnswer={answers[questions[currentQuestionIndex].id]}
          />
        );
      case 'results':
        return <ResultsPage scores={scores} onRetakeTest={() => {
          setCurrentPage('home');
          setAnswers({});
          setScores(null);
          setCurrentQuestionIndex(0);
        }}
        />;
      case 'about':
        return <AboutPage onGoHome={() => setCurrentPage('home')} onStartTest={() => setCurrentPage('test')} />;
      default:
        return <HomePage onStartTest={() => setCurrentPage('test')} onLearnMore={() => setCurrentPage('about')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF5F2] font-inter text-gray-800 flex flex-col items-center relative overflow-hidden animate-background-gradient">
      <Header onGoHome={() => setCurrentPage('home')} onLearnMore={() => setCurrentPage('about')} currentPage={currentPage} />

      {/* Background Animated Icons - Reduced to ~20 instances with varied animations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Brain icons (4) */}
        <div className="absolute top-[10%] left-[15%] w-16 h-16 opacity-20 animate-float-1" style={{ animationDelay: '0s' }}>
          <Brain className="w-full h-full text-blue-400" />
        </div>
        <div className="absolute top-[30%] left-[5%] w-12 h-12 opacity-25 animate-float-6" style={{ animationDelay: '2s' }}>
          <Brain className="w-full h-full text-blue-300" />
        </div>
        <div className="absolute bottom-[5%] right-[30%] w-14 h-14 opacity-30 animate-float-7" style={{ animationDelay: '4s' }}>
          <Brain className="w-full h-full text-blue-500" />
        </div>
        <div className="absolute top-[45%] left-[10%] w-10 h-10 opacity-20 animate-float-31" style={{ animationDelay: '6s' }}>
          <Brain className="w-full h-full text-blue-300" />
        </div>

        {/* Lightbulb icons (4) */}
        <div className="absolute bottom-[20%] left-[10%] w-16 h-16 opacity-20 animate-float-2" style={{ animationDelay: '1s' }}>
          <Lightbulb className="w-full h-full text-green-400" />
        </div>
        <div className="absolute top-[50%] right-[5%] w-12 h-12 opacity-25 animate-float-8" style={{ animationDelay: '3s' }}>
          <Lightbulb className="w-full h-full text-green-300" />
        </div>
        <div className="absolute top-[15%] left-[40%] w-14 h-14 opacity-30 animate-float-9" style={{ animationDelay: '5s' }}>
          <Lightbulb className="w-full h-full text-green-500" />
        </div>
        <div className="absolute top-[25%] right-[30%] w-10 h-10 opacity-20 animate-float-35" style={{ animationDelay: '7s' }}>
          <Lightbulb className="w-full h-full text-green-300" />
        </div>

        {/* User icons (4) */}
        <div className="absolute top-[25%] right-[10%] w-16 h-16 opacity-20 animate-float-3" style={{ animationDelay: '0.5s' }}>
          <User className="w-full h-full text-red-400" />
        </div>
        <div className="absolute bottom-[30%] left-[20%] w-12 h-12 opacity-25 animate-float-10" style={{ animationDelay: '2.5s' }}>
          <User className="w-full h-full text-red-300" />
        </div>
        <div className="absolute top-[5%] left-[60%] w-14 h-14 opacity-30 animate-float-11" style={{ animationDelay: '4.5s' }}>
          <User className="w-full h-full text-red-500" />
        </div>
        <div className="absolute top-[35%] left-[75%] w-10 h-10 opacity-20 animate-float-39" style={{ animationDelay: '6.5s' }}>
          <User className="w-full h-full text-red-300" />
        </div>

        {/* Handshake icons (4) */}
        <div className="absolute bottom-[15%] right-[20%] w-16 h-16 opacity-20 animate-float-4" style={{ animationDelay: '1.5s' }}>
          <Handshake className="w-full h-full text-purple-400" />
        </div>
        <div className="absolute top-[20%] left-[30%] w-12 h-12 opacity-25 animate-float-12" style={{ animationDelay: '3.5s' }}>
          <Handshake className="w-full h-full text-purple-300" />
        </div>
        <div className="absolute bottom-[10%] left-[45%] w-14 h-14 opacity-30 animate-float-13" style={{ animationDelay: '5.5s' }}>
          <Handshake className="w-full h-full text-purple-500" />
        </div>
        <div className="absolute top-[55%] right-[2%] w-10 h-10 opacity-20 animate-float-43" style={{ animationDelay: '7.5s' }}>
          <Handshake className="w-full h-full text-purple-300" />
        </div>

        {/* Cloud icons (4) */}
        <div className="absolute top-[5%] right-[40%] w-16 h-16 opacity-20 animate-float-5" style={{ animationDelay: '0.2s' }}>
          <Cloud className="w-full h-full text-gray-400" />
        </div>
        <div className="absolute bottom-[50%] right-[15%] w-12 h-12 opacity-25 animate-float-14" style={{ animationDelay: '2.2s' }}>
          <Cloud className="w-full h-full text-gray-300" />
        </div>
        <div className="absolute top-[70%] left-[25%] w-14 h-14 opacity-30 animate-float-15" style={{ animationDelay: '4.2s' }}>
          <Cloud className="w-full h-full text-gray-500" />
        </div>
        <div className="absolute top-[80%] left-[40%] w-10 h-10 opacity-20 animate-float-47" style={{ animationDelay: '6.2s' }}>
          <Cloud className="w-full h-full text-gray-300" />
        </div>
      </div>

      {/* Main content area */}
      <main className="flex-grow flex items-center justify-center w-full">
        <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 bg-white bg-opacity-90 rounded-2xl shadow-xl max-w-lg w-full mx-4 sm:mx-6 md:mx-auto animate-fade-in animate-card-float">
          {renderPage()}
        </div>
      </main>

      {/* Custom Message Box */}
      <div id="messageBox" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
          <p id="messageText" className="text-lg font-semibold mb-4"></p>
          <button id="messageClose" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ onStartTest, onLearnMore }) => {
  return (
    <div className="text-center p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-blue-700 animate-bounce-in">
        Discover Your Inner Self
      </h1>
      <p className="text-base sm:text-lg mb-8 text-gray-700 animate-slide-in-up delay-[200ms]">
        Unlock insights into your personality with the Big Five Test.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onStartTest}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 animate-pop-in delay-[400ms] hover-button-pulse"
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

// Test Page Component
const TestPage = ({ question, questionNumber, totalQuestions, onAnswer, onNext, onPrevious, currentAnswer }) => {
  const options = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" },
  ];

  // Function to get button classes based on value and selection
  const getButtonClasses = (optionValue, currentSelection) => {
    let baseClasses = "w-full py-3 px-4 rounded-lg border-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 transform hover:scale-105 active:scale-95";
    let colorClasses = "";

    if (optionValue <= 2) { // Disagree side (Purple)
      colorClasses = `bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200 hover:border-purple-400 focus:ring-purple-500`;
      if (currentSelection === optionValue) {
        colorClasses = `bg-purple-500 text-white border-purple-600 shadow-md focus:ring-purple-500`;
      }
    } else if (optionValue >= 4) { // Agree side (Green)
      colorClasses = `bg-green-100 text-green-800 border-green-300 hover:bg-green-200 hover:border-green-400 focus:ring-green-500`;
      if (currentSelection === optionValue) {
        colorClasses = `bg-green-500 text-white border-green-600 shadow-md focus:ring-green-500`;
      }
    } else { // Neutral (Blue)
      colorClasses = `bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 hover:border-blue-400 focus:ring-blue-500`;
      if (currentSelection === optionValue) {
        colorClasses = `bg-blue-500 text-white border-blue-600 shadow-md focus:ring-blue-500`;
      }
    }
    return `${baseClasses} ${colorClasses}`;
  };

  return (
    <div className="p-4 animate-fade-in">
      <div className="text-center mb-6">
        <p className="text-lg font-medium text-gray-600 animate-slide-in-up">Question {questionNumber} of {totalQuestions}</p>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-2 text-blue-800 animate-slide-in-up delay-[100ms]">{question.text}</h2>
      </div>

      <div className="space-y-4 mb-8">
        {options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => onAnswer(question.id, option.value)}
            className={`${getButtonClasses(option.value, currentAnswer)} animate-slide-in-up hover-button-pulse`}
            style={{ animationDelay: `${200 + index * 50}ms` }} // Staggered animation
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          disabled={questionNumber === 1}
          className={`px-6 py-2 rounded-full font-semibold shadow-md transition duration-300 ease-in-out
            ${questionNumber === 1
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-indigo-500 text-white hover:bg-indigo-600 transform hover:scale-105'
            }
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 hover-button-pulse`}
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 hover-button-pulse"
        >
          {questionNumber === totalQuestions ? "See Results" : "Next"}
        </button>
      </div>
    </div>
  );
};

// Modal Component for AI-generated content
const AiContentModal = ({ title, content, onClose, isLoading, error }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-xl md:max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transform scale-95 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">{title}</h2>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 border-opacity-25 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Generating your personalized insights...</p>
          </div>
        ) : error ? (
          <div className="text-red-600 bg-red-100 border border-red-200 p-4 rounded-lg text-center">
            <p className="font-semibold mb-2">Error: {error.title}</p>
            <p className="text-sm">{error.reason}</p>
          </div>
        ) : (
          <div className="prose max-w-none text-gray-800">
            {/* Render content dynamically, assuming it might contain paragraphs or lists */}
            {typeof content === 'string' ? (
                content.split('\n').map((paragraph, index) => (
                    // Basic markdown-like rendering for bold and list items
                    // This is a simple approach; for full markdown, a library would be needed
                    paragraph.startsWith('* ') ? (
                        <li key={index} className="list-disc ml-5">{paragraph.substring(2)}</li>
                    ) : paragraph.startsWith('- ') ? (
                        <li key={index} className="list-disc ml-5">{paragraph.substring(2)}</li>
                    ) : (
                        <p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                    )
                ))
            ) : (
                Array.isArray(content) ? (
                    <ul className="list-disc pl-5 space-y-2">
                        {content.map((item, index) => (
                            <li key={index}>
                                <span className="font-semibold">{item.career || item.title || item.strength || item.weakness || item.aspect || item.affirmation}</span> {item.artist ? `by ${item.artist}` : ''}
                                <p className="text-sm text-gray-600">{item.reason || item.description || item.tip}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No content available.</p>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};


// Results Page Component
const ResultsPage = ({ scores, onRetakeTest }) => {
  const [generatedSongSuggestion, setGeneratedSongSuggestion] = useState(null); // Changed to singular
  const [loadingSong, setLoadingSong] = useState(false);
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [insightsContent, setInsightsContent] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [insightsError, setInsightsError] = useState(null);
  const [showCareersModal, setShowCareersModal] = useState(false);
  const [careersContent, setCareersContent] = useState(null);
  const [loadingCareers, setLoadingCareers] = useState(false);
  const [careersError, setCareersError] = useState(null);
  const [showAffirmationsModal, setShowAffirmationsModal] = useState(false);
  const [affirmationsContent, setAffirmationsContent] = useState(null);
  const [loadingAffirmations, setLoadingAffirmations] = useState(false);
  const [affirmationsError, setAffirmationsError] = useState(null);


  const getTraitInterpretation = (trait, score) => {
    const s = parseFloat(score);
    let level = "";
    let description = "";

    switch (trait) {
      case 'O': // Openness to Experience
        if (s >= 81) { level = "Very High"; description = "You are exceptionally imaginative, intellectually curious, and have a profound appreciation for art, adventure, and unconventional ideas. You thrive on novelty and deep philosophical discussions."; }
        else if (s >= 61) { level = "High"; description = "You are highly imaginative, curious, and enjoy a wide variety of activities and ideas. You are open to new experiences, intellectually adventurous, and appreciate art and beauty."; }
        else if (s >= 41) { level = "Average"; description = "You are moderately open to new experiences, balancing a desire for novelty with a preference for familiarity. You can appreciate both artistic and practical aspects of life."; }
        else { level = "Low"; description = "You prefer routine and familiarity. You are practical, down-to-earth, and may be less interested in abstract or artistic pursuits."; }
        break;
      case 'C': // Conscientiousness
        if (s >= 81) { level = "Very High"; description = "You are exceptionally organized, disciplined, and driven to achieve. Your meticulous attention to detail and strong sense of duty make you highly reliable and successful in your endeavors."; }
        else if (s >= 61) { level = "High"; description = "You are organized, disciplined, and highly responsible. You tend to be efficient, detail-oriented, and strive for achievement, often planning carefully."; }
        else if (s >= 41) { level = "Average"; description = "You are moderately organized and disciplined, capable of planning but also comfortable with some flexibility. You balance responsibility with a degree of spontaneity."; }
        else { level = "Low"; description = "You are more spontaneous and flexible, but may also be more disorganized or careless. You might prefer not to be bound by strict plans."; }
        break;
      case 'E': // Extraversion
        if (s >= 81) { level = "Very High"; description = "You are an exceptionally outgoing and energetic individual who thrives in large social gatherings. You are highly assertive, seek constant excitement, and are a natural leader."; }
        else if (s >= 61) { level = "High"; description = "You are outgoing, energetic, and thrive in social situations. You enjoy being the center of attention, are assertive, and seek excitement."; }
        else if (s >= 41) { level = "Average"; description = "You exhibit a balance of extraverted and introverted tendencies. You enjoy social interaction but also value alone time, adapting to different social contexts."; }
        else { level = "Low"; description = "You are more reserved and prefer solitude or smaller social circles. You may be seen as quiet or reflective, and prefer less external stimulation."; }
        break;
      case 'A': // Agreeableness
        if (s >= 81) { level = "Very High"; description = "You are exceptionally compassionate, altruistic, and cooperative. You prioritize harmony above all else, are highly empathetic, and consistently put the needs of others before your own."; }
        else if (s >= 61) { level = "High"; description = "You are compassionate, cooperative, and empathetic. You tend to be trusting, kind, and value harmony in relationships, often putting others' needs first."; }
        else if (s >= 41) { level = "Average"; description = "You are generally cooperative and empathetic, but can also assert your own needs when necessary. You seek balance between personal interests and group harmony."; }
        else { level = "Low"; description = "You are more competitive and analytical, and may be skeptical of others' intentions. You tend to prioritize your own interests and can be more direct."; }
        break;
      case 'N': // Neuroticism (Emotional Stability)
        if (s >= 81) { level = "Very High"; description = "You tend to experience emotions with extreme intensity, often feeling anxious, worried, and prone to significant mood swings. Stressful situations can be particularly overwhelming for you."; }
        else if (s >= 61) { level = "High"; description = "You tend to experience emotions more intensely and may be prone to anxiety, worry, and mood swings. You might be more sensitive to stress."; }
        else if (s >= 41) { level = "Average"; description = "You generally maintain emotional stability, experiencing a normal range of emotions without extreme highs or lows. You can manage stress effectively."; }
        else { level = "Low"; description = "You are emotionally stable, calm, and resilient under pressure. You tend to be even-tempered and less reactive to stressful situations."; }
        break;
      default:
        level = "Unknown"; description = "No specific interpretation available for this trait.";
    }
    return { level, description };
  };

  // Function to call Gemini API for song suggestion
  useEffect(() => {
    const fetchSongSuggestion = async () => {
      if (!scores) return;

      setLoadingSong(true);
      setGeneratedSongSuggestion(null); // Clear previous suggestion when loading new one

      let dominantTrait = '';
      let maxScore = -1;
      for (const trait in scores) {
        if (parseFloat(scores[trait]) > maxScore) {
          maxScore = parseFloat(scores[trait]);
          dominantTrait = trait;
        }
      }

      const { level: traitLevel, description: traitDescription } = getTraitInterpretation(dominantTrait, scores[dominantTrait]);
      const traitName = { // Full names for display
        O: "Openness to Experience",
        C: "Conscientiousness",
        E: "Extraversion",
        A: "Agreeableness",
        N: "Neuroticism (Emotional Stability)",
      }[dominantTrait]; // Use dominantTrait here

      // Prompt for a single unique song
      const prompt = `Based on a Big Five personality test, my dominant trait is ${traitName} with a score of ${scores[dominantTrait]}%, which is considered ${traitLevel}. This means I am generally ${traitDescription}. Suggest a unique and fitting song (title and artist) from any genre, and a brief, creative reason (1-2 sentences) why this song perfectly matches this specific personality profile. Focus on a song that truly resonates with the core essence of this trait level. Format the output as a JSON object with 'title', 'artist', 'reason' keys.`;

      try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = {
          contents: chatHistory,
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                "title": { "type": "STRING" },
                "artist": { "type": "STRING" },
                "reason": { "type": "STRING" }
              },
              "propertyOrdering": ["title", "artist", "reason"]
            }
          }
        };
        const apiKey = "AIzaSyBKMO4stYtRSPHdtduQEmvxJZ7Kjvud51E"; // Your Gemini API key
        if (!apiKey) {
          console.error("API Key is missing. Please set your Gemini API key.");
          setGeneratedSongSuggestion({ title: "Error: API Key Missing", artist: "N/A", reason: "Please set your Gemini API key to get song suggestions." });
          setLoadingSong(false);
          return;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Gemini API error response for song:", errorData);
          setGeneratedSongSuggestion({ title: "Error Fetching Song", artist: "N/A", reason: `API Error: ${errorData.error ? errorData.error.message : response.statusText}.` });
          setLoadingSong(false);
          return;
        }

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const json = result.candidates[0].content.parts[0].text;
          let parsedJson;
          try {
            parsedJson = JSON.parse(json);
          } catch (parseError) {
            console.error("Error parsing JSON from Gemini API for song:", parseError, "Raw JSON:", json);
            setGeneratedSongSuggestion({ title: "Error Parsing Song", artist: "N/A", reason: "Received malformed data from the API." });
            setLoadingSong(false);
            return;
          }
          setGeneratedSongSuggestion(parsedJson);
        } else {
          console.error("Gemini API response structure unexpected or empty for song:", result);
          setGeneratedSongSuggestion({ title: "No song suggestion available.", artist: "", reason: "The API did not return a valid song suggestion." });
        }
      } catch (error) {
        console.error("Network or unexpected error fetching song suggestion:", error);
        setGeneratedSongSuggestion({ title: "Network Error", artist: "N/A", reason: `Failed to fetch song suggestion: ${error.message}. Check your internet connection.` });
      } finally {
        setLoadingSong(false);
      }
    };

    fetchSongSuggestion();
  }, [scores]); // Re-run when scores change

  // Function to call Gemini API for Detailed Insights
  const fetchDetailedInsights = async () => {
    setLoadingInsights(true);
    setInsightsError(null);
    setInsightsContent(null);
    setShowInsightsModal(true);

    // Construct a detailed personality profile string
    const profileSummary = Object.entries(scores).map(([trait, score]) => {
      const { level, description } = getTraitInterpretation(trait, score);
      const traitName = {
        O: "Openness to Experience", C: "Conscientiousness", E: "Extraversion",
        A: "Agreeableness", N: "Neuroticism (Emotional Stability)",
      }[trait];
      return `${traitName} (${level}, ${score}%): ${description}`;
    }).join('\n');

    const prompt = `Given the following Big Five personality test results:\n${profileSummary}\n\nProvide a comprehensive, detailed analysis of this personality profile. Highlight key characteristics, potential strengths, common challenges, and offer general, actionable advice for personal growth and understanding. Structure the response in clear paragraphs, using markdown for headings or bullet points if helpful.`;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "text/plain", // Expecting plain text or markdown
        }
      };
      const apiKey = "AIzaSyBKMO4stYtRSPHdtduQEmvxJZ7Kjvud51E"; // Your Gemini API key
      if (!apiKey) {
        setInsightsError({ title: "API Key Missing", reason: "Please set your Gemini API key to get detailed insights." });
        setLoadingInsights(false);
        return;
      }
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error response for insights:", errorData);
        setInsightsError({ title: "Error Fetching Insights", reason: `API Error: ${errorData.error ? errorData.error.message : response.statusText}.` });
        setLoadingInsights(false);
        return;
      }

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        setInsightsContent(result.candidates[0].content.parts[0].text);
      } else {
        console.error("Gemini API response structure unexpected or empty for insights:", result);
        setInsightsError({ title: "No Insights Available", reason: "The API did not return valid insights." });
      }
    } catch (error) {
      console.error("Network or unexpected error fetching insights:", error);
      setInsightsError({ title: "Network Error", reason: `Failed to fetch insights: ${error.message}. Check your internet connection.` });
    } finally {
      setLoadingInsights(false);
    }
  };

  // Function to call Gemini API for Career Suggestions
  const fetchCareerSuggestions = async () => {
    setLoadingCareers(true);
    setCareersError(null);
    setCareersContent(null);
    setShowCareersModal(true);

    const profileSummary = Object.entries(scores).map(([trait, score]) => {
      const { level, description } = getTraitInterpretation(trait, score);
      const traitName = {
        O: "Openness to Experience", C: "Conscientiousness", E: "Extraversion",
        A: "Agreeableness", N: "Neuroticism (Emotional Stability)",
      }[trait];
      return `${traitName} (${level}, ${score}%): ${description}`;
    }).join('\n');

    const prompt = `Based on the following Big Five personality test results:\n${profileSummary}\n\nSuggest 3-5 distinct career types or work environments that would align exceptionally well with this personality profile. For each suggestion, provide a brief (1-2 sentences) reason explaining the alignment. Ensure the suggestions are diverse. Format the output as a JSON array of objects, where each object has 'career' (string) and 'reason' (string) keys.`;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                "career": { "type": "STRING" },
                "reason": { "type": "STRING" }
              },
              "propertyOrdering": ["career", "reason"]
            }
          }
        }
      };
      const apiKey = "AIzaSyBKMO4stYtRSPHdtduQEmvxJZ7Kjvud51E"; // Your Gemini API key
      if (!apiKey) {
        setCareersError({ title: "API Key Missing", reason: "Please set your Gemini API key to get career suggestions." });
        setLoadingCareers(false);
        return;
      }
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error response for careers:", errorData);
        setCareersError({ title: "Error Fetching Careers", reason: `API Error: ${errorData.error ? errorData.error.message : response.statusText}.` });
        setLoadingCareers(false);
        return;
      }

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const json = result.candidates[0].content.parts[0].text;
        let parsedJson;
        try {
          parsedJson = JSON.parse(json);
        } catch (parseError) {
          console.error("Error parsing JSON from Gemini API for careers:", parseError, "Raw JSON:", json);
          setCareersError({ title: "Error Parsing Careers", reason: "Received malformed data from the API." });
          setLoadingCareers(false);
          return;
        }
        setCareersContent(parsedJson);
      } else {
        console.error("Gemini API response structure unexpected or empty for careers:", result);
        setCareersError({ title: "No Career Suggestions Available", reason: "The API did not return valid career suggestions." });
      }
    } catch (error) {
      console.error("Network or unexpected error fetching careers:", error);
      setCareersError({ title: "Network Error", reason: `Failed to fetch career suggestions: ${error.message}. Check your internet connection.` });
    } finally {
      setLoadingCareers(false);
    }
  };

  // Function to call Gemini API for Affirmations
  const fetchAffirmations = async () => {
    setLoadingAffirmations(true);
    setAffirmationsError(null);
    setAffirmationsContent(null);
    setShowAffirmationsModal(true);

    const profileSummary = Object.entries(scores).map(([trait, score]) => {
      const { level, description } = getTraitInterpretation(trait, score);
      const traitName = {
        O: "Openness to Experience", C: "Conscientiousness", E: "Extraversion",
        A: "Agreeableness", N: "Neuroticism (Emotional Stability)",
      }[trait];
      return `${traitName} (${level}, ${score}%): ${description}`;
    }).join('\n');

    const prompt = `Based on the following Big Five personality test results:\n${profileSummary}\n\nProvide 5-7 positive and empowering affirmations tailored to this personality profile. Each affirmation should be a concise, direct statement designed to foster self-belief and encourage growth. Format the output as a JSON array of strings, where each string is an affirmation.`;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: { "type": "STRING" } // Array of strings for affirmations
          }
        }
      };
      const apiKey = "AIzaSyBKMO4stYtRSPHdtduQEmvxJZ7Kjvud51E"; // Your Gemini API key
      if (!apiKey) {
        setAffirmationsError({ title: "API Key Missing", reason: "Please set your Gemini API key to get affirmations." });
        setLoadingAffirmations(false);
        return;
      }
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error response for affirmations:", errorData);
        setAffirmationsError({ title: "Error Fetching Affirmations", reason: `API Error: ${errorData.error ? errorData.error.message : response.statusText}.` });
        setLoadingAffirmations(false);
        return;
      }

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const json = result.candidates[0].content.parts[0].text;
        let parsedJson;
        try {
          parsedJson = JSON.parse(json);
        } catch (parseError) {
          console.error("Error parsing JSON from Gemini API for affirmations:", parseError, "Raw JSON:", json);
          setAffirmationsError({ title: "Error Parsing Affirmations", reason: "Received malformed data from the API." });
          setLoadingAffirmations(false);
          return;
        }
        setAffirmationsContent(parsedJson);
      } else {
        console.error("Gemini API response structure unexpected or empty for affirmations:", result);
        setAffirmationsError({ title: "No Affirmations Available", reason: "The API did not return valid affirmations." });
      }
    } catch (error) {
      console.error("Network or unexpected error fetching affirmations:", error);
      setAffirmationsError({ title: "Network Error", reason: `Failed to fetch affirmations: ${error.message}. Check your internet connection.` });
    } finally {
      setLoadingAffirmations(false);
    }
  };


  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-blue-700 animate-scale-in">Your Personality Profile</h1>

      {scores ? (
        <div className="space-y-6">
          {Object.entries(scores).map(([trait, score]) => {
            const { level, description } = getTraitInterpretation(trait, score);
            const traitName = { // Full names for display
              O: "Openness to Experience",
              C: "Conscientiousness",
              E: "Extraversion",
              A: "Agreeableness",
              N: "Neuroticism (Emotional Stability)",
            }[trait];

            return (
              <div key={trait} className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 animate-trait-card-enter animate-card-float">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex justify-between items-center">
                  <span>{traitName}</span>
                  <span className="text-blue-600 text-2xl font-bold">{score}%</span>
                </h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold">{level}:</span> {description}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            );
          })}

          {/* Song Suggestion Section */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-200 mt-6 animate-fade-in animate-card-float">
            <h3 className="text-xl font-semibold text-blue-700 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music mr-2 animate-icon-pulse">
                <path d="M9 18V5l12-2v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7l12-2v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z"></path>
                <circle cx="5" cy="20" r="2"></circle>
                <circle cx="17" cy="18" r="2"></circle>
              </svg>
              Song Suggestion for You!
            </h3>
            {loadingSong ? (
              <p className="text-gray-600 text-center py-4 animate-shimmer-text">Generating a unique song for you...</p>
            ) : (
              generatedSongSuggestion ? (
                <>
                  <p className="text-gray-700">Based on your dominant personality trait:</p>
                  <p className="text-lg font-medium text-gray-800 mt-2">
                    <span className="font-bold">{generatedSongSuggestion.title}</span> by {generatedSongSuggestion.artist}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{generatedSongSuggestion.reason}</p>
                </>
              ) : (
                <p className="text-gray-600 text-center py-4">No song suggestion available. Please try again later.</p>
              )
            )}
          </div>

          {/* New Gemini API Feature Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <button
              onClick={fetchDetailedInsights}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 flex items-center justify-center hover-button-pulse"
            >
              <LightbulbSparkle className="w-5 h-5 mr-2" /> ✨ Detailed Insights
            </button>
            <button
              onClick={fetchCareerSuggestions}
              className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-full shadow-lg hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 flex items-center justify-center hover-button-pulse"
            >
              <Briefcase className="w-5 h-5 mr-2" /> ✨ Career Paths
            </button>
            <button
              onClick={fetchAffirmations}
              className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-full shadow-lg hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75 flex items-center justify-center hover-button-pulse"
            >
              <Sparkles className="w-5 h-5 mr-2" /> ✨ Affirmations
            </button>
          </div>

        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No results to display. Please take the test first.</p>
      )}

      <div className="text-center mt-8">
        <button
          onClick={onRetakeTest}
          className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 hover-button-pulse"
        >
          Retake Test
        </button>
      </div>

      {/* Modals for Detailed Insights, Career Suggestions, and Affirmations */}
      {showInsightsModal && (
        <AiContentModal
          title="Detailed Personality Insights"
          content={insightsContent}
          onClose={() => setShowInsightsModal(false)}
          isLoading={loadingInsights}
          error={insightsError}
        />
      )}
      {showCareersModal && (
        <AiContentModal
          title="Suggested Career Paths"
          content={careersContent}
          onClose={() => setShowCareersModal(false)}
          isLoading={loadingCareers}
          error={careersError}
        />
      )}
      {showAffirmationsModal && (
        <AiContentModal
          title="Affirmations for Growth"
          content={affirmationsContent}
          onClose={() => setShowAffirmationsModal(false)}
          isLoading={loadingAffirmations}
          error={affirmationsError}
        />
      )}
    </div>
  );
};

// New About Page Component
const AboutPage = ({ onGoHome, onStartTest }) => {
  const traits = [
    {
      name: "Openness to Experience",
      icon: <Brain className="w-16 h-16 text-blue-500 mb-4 animate-rotate-in" />,
      description: "This trait reflects a person's willingness to try new things, their imagination, and their intellectual curiosity. High openness indicates a preference for variety and new ideas, while low openness suggests a more traditional and routine-oriented approach.",
      color: "blue",
    },
    {
      name: "Conscientiousness",
      icon: <Lightbulb className="w-16 h-16 text-green-500 mb-4 animate-rotate-in" />,
      description: "Conscientiousness describes how organized and disciplined a person is. Highly conscientious individuals are efficient, responsible, and self-controlled. Those with low conscientiousness tend to be more spontaneous and less structured.",
      color: "green",
    },
    {
      name: "Extraversion",
      icon: <User className="w-16 h-16 text-red-500 mb-4 animate-rotate-in" />,
      description: "Extraversion characterizes individuals who are outgoing, sociable, and energetic. They thrive in social situations and enjoy being the center of attention. Introverted individuals (low extraversion) prefer solitude and smaller social circles.",
      color: "red",
    },
    {
      name: "Agreeableness",
      icon: <Handshake className="w-16 h-16 text-purple-500 mb-4 animate-rotate-in" />,
      description: "Agreeableness refers to how cooperative and compassionate a person is. Highly agreeable individuals are empathetic, kind, and value harmony. Those with low agreeableness tend to be more competitive and direct.",
      color: "purple",
    },
    {
      name: "Neuroticism (Emotional Stability)",
      icon: <Cloud className="w-16 h-16 text-gray-500 mb-4 animate-rotate-in" />,
      description: "Neuroticism measures emotional stability and refers to a person's tendency to experience negative emotions like anxiety, worry, and moodiness. Low neuroticism indicates emotional resilience and calmness under pressure.",
      color: "gray",
    },
  ];

  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-blue-700 animate-bounce-in">
        Understanding the Big Five
      </h1>
      <p className="text-base sm:text-lg mb-8 text-gray-700 text-center animate-slide-in-up delay-[100ms]">
        The Big Five personality traits are a widely accepted model for understanding human personality.
      </p>

      <div className="space-y-8">
        {traits.map((trait, index) => (
          <div
            key={trait.name}
            className={`group bg-white p-6 rounded-lg shadow-lg border-t-4 border-${trait.color}-500 flex flex-col items-center text-center animate-trait-card-enter animate-card-float`}
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            {/* Icon with hover animation */}
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 animate-icon-hover">
              {trait.icon}
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold mb-2 text-${trait.color}-700 animate-slide-in-up`} style={{ animationDelay: `${200 + index * 100 + 50}ms` }}>
              {trait.name}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base animate-slide-in-up" style={{ animationDelay: `${200 + index * 100 + 100}ms` }}>
              {trait.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
        <button
          onClick={onGoHome}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 flex items-center justify-center hover-button-pulse"
        >
          <Home className="w-5 h-5 mr-2" /> Back to Home
        </button>
        <button
          onClick={onStartTest}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 hover-button-pulse"
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

// Render the App component into the root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
