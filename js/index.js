// export function navbar(){
//     return `<nav><a href="index.html">Home</a>
//     <a href="women.html">Women</a>
//     <a href="signup.html">Signup</a>
//     </nav>`;
// }
//load navbar
fetch('nav.html').then(response=>
    response.text())
    .then(data=>
        document.getElementById('navbar').innerHTML=data);

        //load footer
        fetch('footer.html').then(response=>
            response.text())
            .then(data=>
            document.getElementById('footer').innerHTML=data);

//signUp page
document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
        age: document.querySelector('input[name="age"]').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
    };

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            window.location.href = '/login.html'; // Redirect to login page if needed
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong!');
    }
});
//login page
document.querySelector('#loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(result.user));

            // Redirect to home page
            window.location.href = '/index.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong!');
    }
});