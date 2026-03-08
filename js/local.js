//variables locales de admin
const d = document;

let nombreUsuario = d.querySelector("#usuario-nombre");
let btnCerrarSesion = d.querySelector("#btn-cerrar-sesion");

//funcion para poner el nombre del usuario
d.addEventListener("DOMContentLoaded", () => {
    obtenerUsuario();

});

let obtenerUsuario = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nombreUsuario.textContent = user.usuario;
}

btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("userLogin");
    window.location.href = "iniciar-sesion.html";
});