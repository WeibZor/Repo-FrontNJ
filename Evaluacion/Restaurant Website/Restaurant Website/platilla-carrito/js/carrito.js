// js/carrito.js
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
    const carrito = obtenerCarrito();
    let total = 0;
    carrito.forEach(p => total += p.cantidad);
    const contador = document.getElementById("contador-carrito");
    if (contador) contador.textContent = total;
}

function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    const existe = carrito.find(p => p.id == producto.id);
    if (existe) {
        existe.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    guardarCarrito(carrito);
    actualizarContador();
    alert("Producto agregado al carrito");
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();

    const botones = document.querySelectorAll(".btn-product");
    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".producto");
            const producto = {
                id: card.dataset.id,
                nombre: card.dataset.name,
                precio: parseFloat(card.dataset.price),
                imagen: card.dataset.image
            };
            agregarAlCarrito(producto);
        });
    });

    // Click en navbar redirige a cart.html
    const btnNavbar = document.getElementById("btn-navbar-carrito");
    if(btnNavbar){
        btnNavbar.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "cart.html";
        });
    }
});

// js/navbar-carrito.js

// Función para obtener carrito
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Función para actualizar contador
function actualizarContadorNav() {
    const carrito = obtenerCarrito();
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const contador = document.querySelector(".contar-pro");
    if(contador) contador.textContent = total;
}

// Función para redirigir al carrito
function setupNavCarrito() {
    const navbarCarrito = document.getElementById("navbar-carrito");
    if(navbarCarrito) {
        navbarCarrito.addEventListener("click", () => {
            window.location.href = "cart.html";
        });
    }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorNav();
    setupNavCarrito();
});