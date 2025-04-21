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