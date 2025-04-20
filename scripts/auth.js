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

if (!localStorage.getItem('quizzes')) {
    const defaultQuizzes = [
        {
            id: 1,
            title: "General Knowledge",
            questions: [{
                question: "What was the first movie ever to win the Academy Award for Best Picture?",
                options: ["Gone Wild", "Sunrise", "Wings"],
                answer: "Wings"
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter"],
                answer: "Mars"
            },
            {
                question: "What is the largest mammal?",
                options: ["Elephant", "Blue Whale", "Giraffe"],
                answer: "Blue Whale"
            }
        ]
        },
        {
            id: 2,
            title: "Science Quiz",
            questions: [
            {
                question: "What is H2O?",
                options: ["Gold", "Water", "Carbon Dioxide"],
                answer: "Water"
            },
            {
                question: "What is the chemical symbol for gold?",
                options: ["Au", "Ag", "Go"],
                answer: "Au"
            },
            {
                question: "What force pulls objects toward Earth?",
                options: ["Magnetism", "Friction", "Gravity"],
                answer: "Gravity"
            }
            ]
        },
        {
            id: 3,
            title: "Geography Quiz",
            questions: [
                {
                    question: "Which country has the largest population?",
                    options: ["India", "China", "USA"],
                    answer: "China"
                },
                {
                    question: "What is the capital of Canada?",
                    options: ["Toronto", "Vancouver", "Ottawa"],
                    answer: "Ottawa"
                },
                {
                    question: "How many states are in the United States of America?",
                    options: ["50", "52", "48"],
                    answer: "50"
                },
            ]
        }
        //You can add more questions but bewary of the duplicate IDs to avoid errors.
    ];
    localStorage.setItem('quizzes', JSON.stringify(defaultQuizzes));
}