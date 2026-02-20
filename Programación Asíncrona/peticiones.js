// Conexiones internas y Externas.

// variables Globales
let contenedor = document.querySelector("#contenedor");
boton = document.querySelector("button");

// Eventos

boton.addEventListener("click", () =>{
    // alert("Todo bien");
    peticionApi();
})

// Función para realizar petición. (API EXTERNA)

function peticionApi(){
    let urlExterna = "https://jsonplaceholder.typicode.com/users";
    fetch(urlExterna)
    .then((d) => d.json())
    .then((datos) => {
        console.log(datos);
        datos.forEach(users => {
            contenedor.innerHTML += `
            <h3 style="color:red">${users.name}</h3>
            <p>${users.phone}</p>
            <hr>
            `
        });
    })
    .catch((error) => console.log(error));
}

// Api Interna (XAMPP)
// http://localhost/Api%20Interna/Peliculas.txt
 