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
    const scoresCell = document.createElement('td');
    scoresCell.className = 'scores-cell';
    if (user.scores && Object.keys(user.scores).length > 0) {
        let scoresText = '';
        for (const quizId in user.scores) {
            const quiz = quizzes.find(q => q.id == quizId);
            if (quiz) {
                scoresText += `${quiz.title}: ${user.scores[quizId]}/${quiz.questions.length}, `;
            }
        }
        scoresCell.textContent = scoresText;
    } 
    else {
        scoresCell.textContent = 'No scores yet';
    }
    row.appendChild(scoresCell);
    usersTable.appendChild(row);
});