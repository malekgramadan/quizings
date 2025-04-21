document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});
const users = JSON.parse(localStorage.getItem('users')) || [];
const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];