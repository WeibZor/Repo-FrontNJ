document.addEventListener('DOMContentLoaded', () => {

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const detalleProductos = document.getElementById('detalle-productos-checkout');
    const totalCheckout = document.getElementById('total-checkout');

    // Limpiar contenedor
    detalleProductos.innerHTML = '';

    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        // Crear HTML para cada producto
        const productoHTML = document.createElement('div');
        productoHTML.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');
        productoHTML.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.imagen}" alt="${item.nombre}" style="width:50px; height:50px; object-fit:cover; margin-right:10px; border-radius:5px;">
                <span>${item.nombre} x ${item.cantidad}</span>
            </div>
            <span>$${subtotal.toFixed(2)}</span>
        `;
        detalleProductos.appendChild(productoHTML);
    });

    // Mostrar total
    totalCheckout.textContent = `$${total.toFixed(2)}`;
});