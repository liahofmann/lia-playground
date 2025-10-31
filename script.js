// LiaGPT Chat Data
const chatData = [
    {
        question: "If you were an animal, what would you be — and why?",
        answer: "A dolphin: social, curious, and always on the move. I love exploring, connecting with others, and finding fun even in serious situations."
    },
    {
        question: "What's your most controversial food that you like?",
        answer: "I really love mint chocolate chip ice cream — oh, and pineapple on pizza."
    },
    {
        question: "If you had 24 hours in a new city with no plans, what's the first thing you'd do?",
        answer: "Go to a café, grab a coffee, and ask the waiter for local tips. They always know the good stuff."
    },
    {
        question: "What would 10-year-old you be most surprised you're doing today?",
        answer: "Living in Lisbon for my studies and meeting people from all over the world. At that age, little Lia had no idea how big and full of possibility life could be."
    }
];

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const questionButtons = document.getElementById('question-buttons');

// Track asked questions
let askedQuestions = new Set();

// Initialize Chat
function initChat() {
    // Display initial greeting
    addMessage("Hi! I'm LiaGPT. Ask me anything about Lia! 👋", 'bot');

    // Create question buttons
    renderQuestionButtons();
}

// Render question buttons
function renderQuestionButtons() {
    questionButtons.innerHTML = '';

    chatData.forEach((item, index) => {
        if (!askedQuestions.has(index)) {
            const button = document.createElement('button');
            button.className = 'question-btn';
            button.textContent = item.question;
            button.addEventListener('click', () => askQuestion(index));
            questionButtons.appendChild(button);
        }
    });

    // If all questions asked, show reset option
    if (askedQuestions.size === chatData.length) {
        const resetBtn = document.createElement('button');
        resetBtn.className = 'question-btn reset-btn';
        resetBtn.textContent = '🔄 Ask more questions';
        resetBtn.addEventListener('click', resetChat);
        questionButtons.appendChild(resetBtn);
    }
}

// Ask a question
function askQuestion(index) {
    const item = chatData[index];

    // Add user question
    addMessage(item.question, 'user');

    // Mark as asked
    askedQuestions.add(index);

    // Show typing indicator
    const typingId = addTypingIndicator();

    // Simulate thinking time, then show answer
    setTimeout(() => {
        removeTypingIndicator(typingId);
        addMessage(item.answer, 'bot');
        renderQuestionButtons();
    }, 800);
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Animate in
    setTimeout(() => {
        messageDiv.classList.add('visible');
    }, 10);
}

// Add typing indicator
function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.id = 'typing-' + Date.now();

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

    typingDiv.appendChild(bubble);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return typingDiv.id;
}

// Remove typing indicator
function removeTypingIndicator(id) {
    const indicator = document.getElementById(id);
    if (indicator) {
        indicator.remove();
    }
}

// Reset chat
function resetChat() {
    askedQuestions.clear();
    chatMessages.innerHTML = '';
    initChat();
}

// Start chat on page load
initChat();
