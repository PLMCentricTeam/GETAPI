function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === "Admin" && password === "Admin") {
        alert("Login successful!");
        localStorage.setItem('isLoggedIn', true); // Simpan data login ke localStorage
        window.location.href = 'Data/index.html';
        return false; // Cegah form submit default
    } else {
        errorMessage.style.display = 'block';
        return false; // Cegah form submit default
    }
}