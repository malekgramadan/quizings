document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

document.getElementById('userName').textContent = currentUser.name ? `, ${currentUser.name}` : '';

quizzes.forEach(quiz => {
    const quizCard = document.createElement('div');
    quizCard.className = 'quiz-card';
    quizCard.innerHTML = `
        <h3>${quiz.title}</h3>
        <p>${quiz.questions.length} questions</p>`;
    quizCard.addEventListener('click', () => {
        localStorage.setItem('currentQuiz', JSON.stringify(quiz));
        window.location.href = 'quiz.html';
    });
    quizzesList.appendChild(quizCard);
});