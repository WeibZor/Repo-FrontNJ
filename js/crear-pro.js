// variables globales del formulario
let nombreInput = document.querySelector("#selector-productos");
let precioInput = document.querySelector("#precio-producto");
let cantidadInput = document.querySelector("#stock-producto");
let descripcionInput = document.querySelector("#descripcion-producto");
let imagenInput = document.querySelector("#imagen-producto");
let btnCrear = document.querySelector(".btn-crear");
let productoEditado

document.addEventListener("DOMContentLoaded", () => {
    productoEditado = JSON.parse(localStorage.getItem("productEdit"));
    console.log(productoEditado);
    if(productoEditado != null){
        actualizarDatosProducto();
    }

});

btnCrear.addEventListener("click", ()=>{
    let dataProduct = obtenerDatosProducto();
    enviarDatosProducto(dataProduct);
});

// funcion para validar el formulario y
// obtener los datos del formulario

let obtenerDatosProducto = () => {
    //validar formulario
    let product;

    if(nombreInput.value && precioInput.value && cantidadInput.value && descripcionInput.value && imagenInput.src){
        product = {
            nombre: nombreInput.value,
            descripcion: descripcionInput.value,
            precio : precioInput.value,
            stock : cantidadInput.value,
            imagen : imagenInput.src
        }
        descripcionInput.value = "";
        precioInput.value = "";
        cantidadInput.value = "";
        imagenInput.src ="https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg";
        console.log(product);

    }else{
        alert("Todos los campos son  obligatorios")
    }
    return product;
};


let enviarDatosProducto = async (data) => {

    let url = "http://localhost:3000/api/productos";
    try {

        let respuesta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        
    });


    if(respuesta.status === 406){
        alert("Los datos enviados no son admitidos");

    }else{
        let mensaje = await respuesta.json();
        alert(mensaje.message);
        location.href = "http://127.0.0.1:5500/Proyecto-Tienda-virtual-parte-1/lista-productos.html";
    }
    

    } catch (error) {
        console.log(error);
    }
};


//funcion para editar el producto
let actualizarDatosProducto = () => {
    // agregar datos a editar en los campos del formulario
    nombreInput.value = productoEditado.nombre;
    precioInput.value = productoEditado.precio;
    cantidadInput.value = productoEditado.stock;
    descripcionInput.value = productoEditado.descripcion;
    imagenInput.src = productoEditado.imagen;
    let product;
    // alternar el boton de crear y editar
    let btnEdit = document.querySelector(".btn-editar");
    btnCrear.classList.toggle("d-none");
    btnEdit.classList.toggle("d-none");
    // agregar evento al boton editar
    btnEdit.addEventListener("click", ()=> {
        product = {
            nombre: nombreInput.value,
            descripcion: descripcionInput.value,
            precio : precioInput.value,
            stock : cantidadInput.value,
            imagen : imagenInput.src
        }
        // borrar info de localStorage
        localStorage.removeItem("productEdit");
        // pasar los datos del producto a la funcion
        enviarActualizacionProducto(product);

    });
};

// funcion para realizar la peticion al servidor
let enviarActualizacionProducto = async ( pro ) => {
    let url = `http://localhost:3000/api/productos/${productoEditado.id}`;
    try {

        let respuesta = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pro)
        
    });


    if(respuesta.status === 406){
        alert("Los datos enviados no son admitidos");

    }else{
        let mensaje = await respuesta.json();
        alert(mensaje.message);
        location.href = "http://127.0.0.1:5500/Proyecto-Tienda-virtual-parte-1/lista-productos.html";
    }
    

    } catch (error) {
        console.log(error);
    }
}

