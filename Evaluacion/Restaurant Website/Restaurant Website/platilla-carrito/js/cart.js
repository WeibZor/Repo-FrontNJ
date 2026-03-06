function obtenerCarrito(){
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito(){
    const carrito = obtenerCarrito();
    const tbody = document.getElementById("carrito-items");
    let subtotal = 0;
    tbody.innerHTML = "";

    carrito.forEach((item,index)=>{
        const sub = item.precio * item.cantidad;
        subtotal += sub;
        tbody.innerHTML += `
        <tr>
            <td><img src="${item.imagen}" width="50"></td>
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>
                <input type="number" value="${item.cantidad}" min="1" onchange="cambiarCantidad(${index}, this.value)">
            </td>
            <td>$${sub}</td>
            <td><button onclick="eliminarProducto(${index})">X</button></td>
        </tr>
        `;
    });

    const domicilio = 5000;
    const total = subtotal + domicilio;

    document.getElementById("subtotal-resumen").innerText = "$"+subtotal;
    document.getElementById("domicilio-resumen").innerText = "$"+domicilio;
    document.getElementById("total-resumen").innerText = "$"+total;
}

function cambiarCantidad(index,cantidad){
    let carrito = obtenerCarrito();
    carrito[index].cantidad = parseInt(cantidad);
    guardarCarrito(carrito);
    mostrarCarrito();
}

function eliminarProducto(index){
    let carrito = obtenerCarrito();
    carrito.splice(index,1);
    guardarCarrito(carrito);
    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);