/**
 * SCRIPT DE REGISTRO DE USUARIOS
 * Este archivo maneja la creación de nuevas cuentas de usuario
 * Valida los datos y los envía al servidor mediante API REST
 */

// ==================== VARIABLES GLOBALES ====================
// Guardamos una referencia corta al objeto document para usarlo menos
const d = document;

// Capturamos los elementos del formulario por su ID
// querySelector busca el elemento por ID (# es para ID en CSS)
let rolInput = d.querySelector("#rolForm");              // El input donde se guarda el rol seleccionado
let usuarioInput = d.querySelector("#usuarioInput");     // El input del nombre de usuario
let contraInput = d.querySelector("#passwordInput");   // El input de la contraseña
let confirmarContraInput = d.querySelector("#confirmPasswordInput"); // El input para confirmar contraseña
let btnRegistrar = d.querySelector(".btn-registrar");       // El botón de Registrar (busca por clase con .)

// ==================== EVENT LISTENER DEL BOTÓN ====================
/**
 * addEventListener: escucha cuando el usuario HACE CLIC el botón
 * "click" = cuando hace clic
 * Las funciones flecha () => {} son formas modernas de escribir funciones
 */
btnRegistrar.addEventListener("click", () => {
    // Llamamos a la función que valida el formulario
    let dataForm = obtenerDatosRegistro();
    
    // Si obtenerDatosRegistro() devuelve datos válidos (no null)
    if(dataForm) {
        // Enviamos los datos al servidor
        enviarDatosRegistro(dataForm);
    }
    // Si devuelve null, significa un error de validación (ya mostró alert)
});

// ==================== FUNCIÓN DE VALIDACIÓN ====================
/**
 * getDataRegister()
 * PROPÓSITO: Validar todos los campos del formulario
 * RETORNA: 
 *   - Un objeto con los datos si TODO está correcto
 *   - null si hay algún error
 * 
 * VALIDACIONES QUE HACE:
 * 1. Que el rol esté seleccionado
 * 2. Que el usuario no esté vacío
 * 3. Que el usuario tenga mínimo 3 caracteres
 * 4. Que la contraseña no esté vacía
 * 5. Que confirmir contraseña no esté vacía
 * 6. Que las dos contraseñas sean idénticas
 * 7. Que la contraseña tenga mínimo 6 caracteres
 */
let obtenerDatosRegistro = () => {
    
    // VALIDACIÓN 1: ¿Se seleccionó un rol?
    // !rolInput.value significa "si el valor está vacío"
    if(!rolInput.value) {
        alert("Debe seleccionar un rol");
        return null; // Retorna null (error) y detiene la función
    }

    // VALIDACIÓN 2: ¿El usuario no está vacío?
    if(!usuarioInput.value) {
        alert("El usuario es obligatorio");
        return null;
    }

    // VALIDACIÓN 3: ¿El usuario tiene al menos 3 caracteres?
    // .length devuelve la cantidad de caracteres en un string
    if(usuarioInput.value.length < 3) {
        alert("El usuario debe tener al menos 3 caracteres");
        return null;
    }

    // VALIDACIÓN 4: ¿La contraseña no está vacía?
    if(!contraInput.value) {
        alert("La contraseña es obligatoria");
        return null;
    }

    // VALIDACIÓN 5: ¿La confirmación de contraseña no está vacía?
    if(!confirmarContraInput.value) {
        alert("Debe confirmar la contraseña");
        return null;
    }

    // VALIDACIÓN 6: ¿Las dos contraseñas son iguales?
    // !== significa "no es igual a"
    if(contraInput.value !== confirmarContraInput.value) {
        alert("Las contraseñas no coinciden");
        return null;
    }

    // VALIDACIÓN 7: ¿La contraseña tiene mínimo 6 caracteres?
    if(contraInput.value.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        return null;
    }

    // SI PASÓ TODAS LAS VALIDACIONES, creamos un objeto con los datos
    // Este objeto es lo que enviaremos al servidor
    let userData = {
        rol: rolInput.value,           // Ejemplo: "administrador"
        usuario: usuarioInput.value,   // Ejemplo: "juan123"
        contrasena: contraInput.value // Ejemplo: "miPassword123"
    }

    console.log(userData); // Mostramos en consola qué datos se van a enviar
    return userData; // Retornamos el objeto con los datos válidos
};

// ==================== FUNCIÓN DE ENVÍO AL SERVIDOR ====================
/**
 * sendDataRegister(data)
 * PROPÓSITO: Enviar los datos del usuario al servidor para crear la cuenta
 * PARÁMETRO: data = objeto con {rol, usuario, contrasena}
 * 
 * FLUJO:
 * 1. Hace una petición POST al servidor (en http://localhost:3000/api/usuarios)
 * 2. El servidor procesa y guarda el usuario en la base de datos
 * 3. Dependiendo de la respuesta, mostramos un mensaje de éxito o error
 * 
 * NOTA: "async" y "await" permiten esperar respuestas de internet sin congelar la página
 */
let enviarDatosRegistro = async (data) => {

    // URL del servidor donde vamos a enviar los datos
    let url = "http://localhost:3000/api/usuarios";
    
    try { // try = intenta ejecutar esto
        
        /**
         * fetch() = función para comunicarse con servidores
         * method: "POST" = estamos ENVIANDO datos (no pidiendo)
         * headers = información sobre el tipo de datos que enviamos
         * body = los datos a enviar, convertidos a JSON (formato que entiende el servidor)
         * 
         * await = espera a que el servidor responda antes de continuar
         */
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // Convierte el objeto JavaScript a JSON
        });

        // ==================== MANEJO DE RESPUESTAS ====================
        
        // ¿El servidor respondió que TODO ESTÁ BIEN? (código 201 = creado, 200 = ok)
        if(respuesta.status === 201 || respuesta.status === 200) {
            // Convertimos la respuesta a un objeto JavaScript para usarlo
            let userCreated = await respuesta.json();
            
            // Mostramos mensaje de éxito con los datos del usuario creado
            alert("✓ Usuario registrado exitosamente:\n Usuario: " + userCreated.usuario + "\n Rol: " + userCreated.rol + "\n\nAhora puedes iniciar sesión");
            
            // LIMPIAR EL FORMULARIO = Borramos todo lo que escribió el usuario
            // para que quede listo para otro registro o que cierre la página
            rolInput.value = "";
            usuarioInput.value = "";
            contraInput.value = "";
            confirmarContraInput.value = "";
        } 
        // ¿El servidor dice que hay un error (código 400 = solicitud incorrecta)?
        else if(respuesta.status === 400) {
            // Obtenemos el mensaje de error del servidor
            let error = await respuesta.json();
            // || significa "o si no" (si no hay mensaje, mostramos uno genérico)
            alert("❌ Error: " + (error.mensaje || "El usuario ya existe o hay un error en los datos"));
        } 
        // ¿Algún otro error?
        else {
            alert("❌ Error en el registro, por favor intente nuevamente");
        }

    } catch (error) { // catch = si algo falla, captura el error
        console.log(error); // Muestra el error en la consola (para los desarrolladores)
        // Muestra un mensaje al usuario sobre el error de conexión
        alert("❌ Error de conexión: " + error.message);
    }
}
