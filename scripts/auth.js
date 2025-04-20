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
});