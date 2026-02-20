// Conexiones internas y Externas.

// variables Globales
let contenedor = document.querySelector("#contenedor");
boton = document.querySelector("button");

// Eventos

boton.addEventListener("click", () =>{
    // alert("Todo bien");
    peticionApi();
})

// Función para realizar petición.

function peticionApi(){
    let urlExterna = "https://jsonplaceholder.typicode.com/users";
    fetch(urlExterna)
    .then((d) => d.json())
    .then((datos) => {
        console.log(datos);
    })
    .catch((error) => console.log(error));
}