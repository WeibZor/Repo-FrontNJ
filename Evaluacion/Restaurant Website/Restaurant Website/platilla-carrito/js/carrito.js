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
    
    // También actualizar el contador en navbar
    actualizarContadorNav();
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

function setupProductosEventListeners() {
    const botones = document.querySelectorAll(".btn-product");
    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = e.target.closest(".producto");
            const producto = {
                id: card.dataset.id,
                nombre: card.dataset.name,
                precio: parseFloat(card.dataset.price),
                imagen: card.dataset.image || ""
            };
            agregarAlCarrito(producto);
        });
    });
}

// Cargar productos dinámicamente desde la API
async function cargarProductos() {
    try {
        console.log("Cargando productos desde la API...");
        const response = await fetch("http://localhost:3000/api/productos");
        
        if (!response.ok) {
            throw new Error(`Error al cargar productos: ${response.status}`);
        }
        
        const productos = await response.json();
        console.log("Productos cargados:", productos);
        
        const container = document.getElementById("productos-container");
        
        if (!container) {
            console.error("No se encontró el contenedor de productos");
            return;
        }
        
        if (productos.length === 0) {
            container.innerHTML = '<div class="col-12 text-center"><p>No hay productos disponibles</p></div>';
            return;
        }
        
        // Limpiar el contenedor
        container.innerHTML = "";
        
        // Crear tarjetas de productos
        productos.forEach(producto => {
            const imagenUrl = producto.imagen && producto.imagen.startsWith('http') 
                ? producto.imagen 
                : './images/default-product.png';
            
            const col = document.createElement("div");
            col.className = "col-md-3 py-3 py-md-0";
            
            const card = document.createElement("div");
            card.className = "card producto";
            card.dataset.id = producto.id;
            card.dataset.price = producto.precio;
            card.dataset.name = producto.nombre;
            card.dataset.image = imagenUrl;
            
            const stock = parseInt(producto.stock);
            const stockClass = stock > 0 ? "" : "disabled";
            const stockText = stock > 0 ? `${stock} disponibles` : "Agotado";
            
            card.innerHTML = `
                <img src="${imagenUrl}" alt="${producto.nombre}" style="max-height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion || "Producto delicioso"}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h5>$${parseFloat(producto.precio).toFixed(2)}</h5>
                        <span class="btn-product ${stockClass}" style="${stock <= 0 ? 'opacity: 0.5; cursor: not-allowed;' : 'cursor: pointer;'}">
                            <i class="fa-solid fa-basket-shopping"></i>
                        </span>
                    </div>
                    <small style="color: #666; font-size: 0.85em;">${stockText}</small>
                </div>
            `;
            
            col.appendChild(card);
            container.appendChild(col);
        });
        
        // Configurar event listeners para los nuevos botones
        setupProductosEventListeners();
        console.log("✅ Productos cargados y visualizados");
        
    } catch (error) {
        console.error("Error al cargar productos:", error);
        const container = document.getElementById("productos-container");
        if (container) {
            container.innerHTML = '<div class="col-12 text-center"><p style="color: red;">Error al cargar los productos</p></div>';
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    
    // Cargar productos dinámicamente desde la API
    cargarProductos();
    
    // Para productos que puedan estar en HTML ya (si existen)
    setupProductosEventListeners();

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
function obtenerCarritoNav() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Función para actualizar contador
function actualizarContadorNav() {
    const carrito = obtenerCarritoNav();
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