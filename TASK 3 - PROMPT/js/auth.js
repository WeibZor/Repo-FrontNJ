// auth.js

// Inicializar usuarios de prueba si no existen
function initUsers() {
    if (!localStorage.getItem("users")) {
        const users = [
            { username: "admin", password: "1234", role: "Administrador" },
            { username: "empleado", password: "1234", role: "Empleado" }
        ];
        localStorage.setItem("users", JSON.stringify(users));
    }
}
initUsers();

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === username && u.password === password && u.role === role);

        if(user){
            localStorage.setItem("activeUser", JSON.stringify(user));
            window.location.href = "dashboard.html";
        } else {
            alert("Usuario, contraseña o rol incorrecto.");
        }
    });
}

// Verificar sesión (en dashboard)
function checkAuth() {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if(!activeUser){
        // Redirige al login si no hay usuario activo
        window.location.href = "index.html";
        return null;
    }
    return activeUser;
}
