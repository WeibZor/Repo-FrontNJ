//variables globales para el login

const d = document;

usuarioInput = d.querySelector("#usuario-form");
contraInput = d.querySelector("#contrasena-form");
btnIniciar = d.querySelector(".btn-iniciar");

//evento al boton del formulario

btnIniciar.addEventListener("click", () => {
//alert(`escribio : ${userInput.value}`);
    let dataForm = obtenerDatosLogin();
    enviarDatosLogin(dataForm);
});

//funcion para validad formulario y obtener datos del formulario

let obtenerDatosLogin = () => {
    //validar formulario
    let user;

    if(usuarioInput.value && contraInput.value){
        user = {
            usuario: usuarioInput.value,
            contrasena: contraInput.value
        }
        usuarioInput.value = "";
        contraInput.value = "";

    }else{
        alert("el usuario y contraseña es obligatorio")
    }
    console.log(user);
    return user;
};



//funcion para recibir los datos y realizar la peticion al servidor

let enviarDatosLogin = async (data) => {

    let url = "http://localhost:3000/api/login";
    try {

        let respuesta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        
    });


    if(respuesta.status === 401){
        alert("usuario y/o contraseña incorrecta");

    }else{
        let userLogin = await respuesta.json();
    alert("bienvenido : " + userLogin.usuario);
    //guardar datos en local storage
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    location.href = "index.html";
    }
    

    } catch (error) {
        console.log(error);
    }
    



}