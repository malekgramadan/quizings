const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || !currentUser.isAdmin) {
    window.location.href = 'index.html';
}
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});
const users = JSON.parse(localStorage.getItem('users')) || [];
const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
const usersTable = document.getElementById('usersTable').querySelector('tbody');
users.forEach(user => {
    const row = document.createElement('tr');
    
    const nameCell = document.createElement('td');
    nameCell.textContent = user.name || 'N/A';
    row.appendChild(nameCell);
    
    const emailCell = document.createElement('td');
    emailCell.textContent = user.email;
    row.appendChild(emailCell);
});