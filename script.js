// GTM Quiz Data
const quizData = [
    {
        question: "How would you prefer to acquire your first 100 customers?",
        answers: [
            { text: "Pick up the phone and call them directly", score: { sales: 3, product: 0, community: 0, content: 1 } },
            { text: "Build something so good they can't help but share it", score: { sales: 0, product: 3, community: 1, content: 0 } },
            { text: "Create a passionate community around the problem you're solving", score: { sales: 0, product: 1, community: 3, content: 1 } },
            { text: "Publish insights that make people think 'I need to work with this person'", score: { sales: 1, product: 0, community: 1, content: 3 } }
        ]
    },
    {
        question: "What's your ideal relationship with early customers?",
        answers: [
            { text: "Close partnership — I'm on speed dial solving their problems", score: { sales: 3, product: 0, community: 1, content: 1 } },
            { text: "They love the product so much they become advocates without me asking", score: { sales: 0, product: 3, community: 1, content: 0 } },
            { text: "They're part of a movement, contributing ideas and bringing others in", score: { sales: 0, product: 1, community: 3, content: 1 } },
            { text: "They see me as a trusted voice and come back for more wisdom", score: { sales: 1, product: 0, community: 1, content: 3 } }
        ]
    },
    {
        question: "How should people discover what you're building?",
        answers: [
            { text: "Through a well-timed cold email or LinkedIn message from me", score: { sales: 3, product: 0, community: 0, content: 1 } },
            { text: "By stumbling on it and instantly seeing the value", score: { sales: 0, product: 3, community: 0, content: 1 } },
            { text: "A friend in the community says 'you have to check this out'", score: { sales: 0, product: 1, community: 3, content: 1 } },
            { text: "They read something I wrote and think 'this person gets it'", score: { sales: 1, product: 0, community: 1, content: 3 } }
        ]
    },
    {
        question: "What excites you most about growth?",
        answers: [
            { text: "Closing deals and building real relationships one customer at a time", score: { sales: 3, product: 0, community: 1, content: 0 } },
            { text: "Watching usage metrics climb because the product speaks for itself", score: { sales: 0, product: 3, community: 0, content: 1 } },
            { text: "Seeing people connect, collaborate, and champion what you've built", score: { sales: 0, product: 1, community: 3, content: 1 } },
            { text: "Becoming a go-to voice that attracts the right opportunities naturally", score: { sales: 1, product: 0, community: 1, content: 3 } }
        ]
    }
];

const gtmResults = {
    sales: {
        title: "Sales-Led GTM",
        description: "You're a relationship builder who thrives on direct conversations and closing deals. Your superpower is understanding customer needs deeply and crafting solutions through 1:1 engagement. Build your outbound engine, get on calls, and let your hustle turn conversations into revenue."
    },
    product: {
        title: "Product-Led Growth",
        description: "You believe the product should do the talking. Your approach is to build something so intuitive and valuable that users can't help but spread the word. Focus on an amazing user experience, viral loops, and letting metrics guide your iteration."
    },
    community: {
        title: "Community-First GTM",
        description: "You're a movement builder who knows that the best growth comes from passionate advocates. Your strength is creating spaces where people connect, contribute, and champion what you're building. Invest in your community and watch them become your growth engine."
    },
    content: {
        title: "Content & Thought Leadership",
        description: "You win by sharing insights that make people lean in and think. Your GTM strategy is about building trust and authority through valuable content that attracts the right audience. Publish, teach, and let your expertise create inbound opportunities."
    }
};

// Quiz State
let currentQuestion = 0;
let scores = { sales: 0, product: 0, community: 0, content: 0 };

// DOM Elements
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const restartBtn = document.getElementById('restart-btn');
const currentQuestionSpan = document.getElementById('current-question');
const progressBar = document.getElementById('progress-bar');

// Initialize Quiz
function initQuiz() {
    currentQuestion = 0;
    scores = { sales: 0, product: 0, community: 0, content: 0 };
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    showQuestion();
}

// Display Current Question
function showQuestion() {
    const current = quizData[currentQuestion];
    questionText.textContent = current.question;
    answersContainer.innerHTML = '';

    // Update progress
    const progressPercentage = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = progressPercentage + '%';
    currentQuestionSpan.textContent = currentQuestion + 1;

    current.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

// Handle Answer Selection
function selectAnswer(answerIndex) {
    const selectedAnswer = quizData[currentQuestion].answers[answerIndex];

    // Update scores
    scores.sales += selectedAnswer.score.sales;
    scores.product += selectedAnswer.score.product;
    scores.community += selectedAnswer.score.community;
    scores.content += selectedAnswer.score.content;

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Calculate and Display Result
function showResult() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    // Find the GTM approach with highest score
    const maxScore = Math.max(scores.sales, scores.product, scores.community, scores.content);
    let resultKey;

    if (scores.sales === maxScore) {
        resultKey = 'sales';
    } else if (scores.product === maxScore) {
        resultKey = 'product';
    } else if (scores.community === maxScore) {
        resultKey = 'community';
    } else {
        resultKey = 'content';
    }

    const result = gtmResults[resultKey];
    resultTitle.textContent = result.title;
    resultDescription.textContent = result.description;
}

// Restart Quiz
restartBtn.addEventListener('click', initQuiz);

// Start quiz on page load
initQuiz();
