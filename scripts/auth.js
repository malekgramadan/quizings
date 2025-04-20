if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    //Users input for Name, email, and password
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const users = JSON.parse(localStorage.getItem('users'));
    
    //Check if user already exists displaying an error message if it is true
    if (users.some(user => user.email === email)) {
        document.getElementById('registerError').textContent = 'Email already registered!';
        return;
    }
    //Add new user
    users.push({
        name,
        email,
        password,
        scores: {}
    });
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('registerError').textContent = '';
    alert('Registration successful! You can now log in.');
    //Clears the fields after a successful register
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);
    const adminUser = {
        name: 'Admin',
        email: 'admin@quiz.com',
        password: 'admin123',
        scores: {},
        isAdmin: true
    };
    if (email === 'admin@quiz.com' && password === 'admin123') {
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        window.location.href = 'dashboard.html';
        return;
    }
    if (!user) {
        document.getElementById('loginError').textContent = 'Invalid email or password!';
        return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'homepage.html';
});