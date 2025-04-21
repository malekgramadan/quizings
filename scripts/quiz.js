const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

const quiz = JSON.parse(localStorage.getItem('currentQuiz'));
if (!quiz) {
    window.location.href = 'homepage.html';
}
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