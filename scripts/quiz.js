const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

const quiz = JSON.parse(localStorage.getItem('currentQuiz'));
if (!quiz) {
    window.location.href = 'homepage.html';
}
document.getElementById('quizTitle').textContent = quiz.title;
document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = 'homepage.html';
});

document.getElementById('quizTitle').textContent = quiz.title;
const questionsContainer = document.getElementById('questionsContainer');
quiz.questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;
    questionsContainer.appendChild(questionDiv);

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    question.options.forEach((option, optionIndex) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `
            <input type="radio" id="q${index}o${optionIndex}" name="q${index}" value="${option}">
            <label for="q${index}o${optionIndex}">${option}</label>
        `;
        optionsDiv.appendChild(optionDiv);
    });
    questionDiv.appendChild(optionsDiv);
});

document.getElementById('quizForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let score = 0;
    quiz.questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && selectedOption.value === question.answer) {
            score++;
        }
    });
    // Save score for current user
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex].scores[quiz.id] = score;
        localStorage.setItem('users', JSON.stringify(users));
        // Update current user in localStorage
        currentUser.scores = users[userIndex].scores;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('hidden');
    document.getElementById('scoreDisplay').textContent = `You scored ${score} out of ${quiz.questions.length}!`;
    document.getElementById('retakeBtn').addEventListener('click', () => {
        document.getElementById('quizContainer').classList.remove('hidden');
        document.getElementById('resultsContainer').classList.add('hidden');
        document.getElementById('quizForm').reset();
    });
});