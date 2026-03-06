const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');

document.getElementById('sign-in-btn').addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if(username !== 'admin'){
        alert('Please Enter Demo Username');
        return
    }
    console.log(username);

    if(password !== 'admin123'){
        alert('Please Enter Demo Password');
        return;
    }
    console.log(password);

    alert('Login success');
    window.location.assign('home.html');
})


// Enter Button Click
passwordInput.addEventListener('keypress', (click) => {
    if(click.key === 'Enter'){
        document.getElementById('sign-in-btn').click();
    }
})