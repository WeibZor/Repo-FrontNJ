# 🔐 CONTROL DE ACCESO POR ROLES - DOCUMENTACIÓN

## ¿QUÉ ES EL CONTROL DE ACCESO POR ROLES?

Es un sistema de **seguridad** que impide que ciertos usuarios vean o hagan cosas que no deberían.

En nuestro caso:
- **ADMINISTRADOR** → Puede ver y hacer TODO
- **VENDEDOR** → Puede ver productos pero NO crear nuevos
- **CAJERO** → Solo puede ver (no puede crear ni editar)

---

## 🔄 FLUJO GENERAL DEL SISTEMA

```
1. Usuario escribe usuario + contraseña
                    ↓
2. Hace clic en "Iniciar Sesión"
                    ↓
3. El servidor verifica credenciales
                    ↓
4. Responde con: { usuario: "juan", rol: "vendedor" }
                    ↓
5. JavaScript GUARDA esto en localStorage
                    ↓
6. Usuario entra al dashboard (index.html)
                    ↓
7. JavaScript LEE del localStorage qué rol tiene
                    ↓
8. Según el rol, OCULTA o MUESTRA botones/enlaces
```

---

## 💾 PASO 1: GUARDAR EL ROL EN localStorage

### Archivo: `login.js`

Cuando el usuario inicia sesión correctamente, el servidor devuelve:

```javascript
{
  usuario: "juan",
  rol: "administrador",
  id: 1
}
```

Nuestro código hace esto:

```javascript
// Guardar la respuesta completa en localStorage
localStorage.setItem("userLogin", JSON.stringify(respuesta));
```

### ¿Qué significa?
- `localStorage` = Una "caja" que almacena datos en el navegador del usuario
- `setItem()` = Guarda un dato en esa caja
- `"userLogin"` = El nombre con el que guardamos
- `JSON.stringify()` = Convierte un objeto JavaScript a texto (así lo almacena)

### ¿Cómo queda guardado?
```json
{
  "usuario": "juan",
  "rol": "administrador",
  "id": 1
}
```

---

## 🔍 PASO 2: LEER EL ROL DESDE localStorage

### Archivo: `local.js`

En TODAS las páginas del dashboard, necesitamos saber qué rol tiene el usuario.

```javascript
// Obtener el usuario logueado
let userLogin = JSON.parse(localStorage.getItem("userLogin"));

// Ahora podemos acceder al rol así:
console.log(userLogin.rol); // Muestra: "administrador"
```

### ¿Qué significa?
- `localStorage.getItem()` = Obtiene un dato que guardamos antes
- `JSON.parse()` = Convierte el texto de vuelta a un objeto JavaScript

---

## 👁️ PASO 3: VERIFICAR EL ROL Y OCULTAR ELEMENTOS

### OPCIÓN A: Ocultar elementos sin eliminarlos

**Archivo: `index.html` (en el <script> final)**

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el usuario
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    
    // Si NO es administrador, ocultar el botón de crear producto
    if(userLogin.rol !== "administrador") {
        // Encuentra el botón
        let boton = document.getElementById("btnCrearProductoIndex");
        
        // Lo oculta (pero sigue en el HTML)
        boton.style.display = "none";
    }
});
```

**¿Qué hace?**
- Verifica si `rol !== "administrador"` (es decir, si es vendedor o cajero)
- Busca el elemento con `id="btnCrearProductoIndex"`
- Lo oculta con `display: "none"` (la CSS propiedad que esconde elementos)

**Resultado:**
```
ADMIN → Ve el botón ✓
VENDEDOR → No ve el botón ✗
CAJERO → No ve el botón ✗
```

---

### OPCIÓN B: Eliminar elementos del HTML (más seguro)

**Archivo: `lista-productos.html`**

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el usuario
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    
    // Si NO es administrador, eliminar el botón
    if(userLogin.rol !== "administrador") {
        // Encuentra el botón
        let boton = document.getElementById("btnCrearProducto");
        
        // Lo ELIMINA del HTML completamente (no solo lo oculta)
        boton.remove();
    }
});
```

**¿Qué es mejor: `display: "none"` o `.remove()`?**

| Método | Ventaja | Desventaja |
|--------|---------|-----------|
| `display: "none"` | Rápido, el botón sigue existiendo | Hackers pueden hacerlo visible con DevTools |
| `.remove()` | Más seguro (no existe en el HTML) | Pide más procesamiento |

**Para áreas sensibles como "Crear Producto" → Usar `.remove()`**

---

### OPCIÓN C: Redirigir si el usuario no tiene permiso

**Archivo: `crear-producto.html` (en el <head> o principio del <body>)**

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el usuario
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    
    // Si NO es administrador, redirigir a otra página
    if(userLogin.rol !== "administrador") {
        alert("⛔ Acceso denegado. Solo administradores pueden crear productos.");
        
        // Redirige a la página de listado
        window.location.href = "lista-productos.html";
    }
});
```

**¿Qué hace?**
- Verifica el rol
- Si no es admin, muestra un mensaje
- Y manda al usuario a otra página (redirige)

**Esta es la MÁS SEGURA porque:**
- Aunque el usuario sea curioso y cambie el HTML con DevTools
- El servidor NO lo dejará crear el producto (seguridad de verdad)

---

## 🚀 EJEMPLO PRÁCTICO COMPLETO

### Escenario: Juan es VENDEDOR

**1. Juan inicia sesión**
```
Usuario: juan
Contraseña: juan123
```

**2. El servidor responde**
```json
{
  "usuario": "juan",
  "rol": "vendedor",
  "id": 2
}
```

**3. login.js GUARDA**
```javascript
localStorage.setItem("userLogin", JSON.stringify({...}));
```

**4. Juan entra al dashboard (index.html)**

Mi código hace:
```javascript
let userLogin = JSON.parse(localStorage.getItem("userLogin"));
// userLogin.rol ahora es "vendedor"

if(userLogin.rol !== "administrador") {
    // ¡Es vendedor! Ocultar botón
    document.getElementById("btnCrearProductoIndex").remove();
}
```

**5. Resultado**
```
Juan ve:
✓ Navbar con su nombre
✓ Botón "Listar Productos"
✓ Sidebar con menú
✗ Botón "Crear Producto" (DESAPARECE)
✗ No puede acceder a crear-producto.html
```

---

## 📋 COMPARATIVA DE LOS 3 ROLES

| Acción | Admin | Vendedor | Cajero |
|--------|-------|----------|--------|
| Ver productos | ✓ | ✓ | ✓ |
| Crear productos | ✓ | ✗ | ✗ |
| Editar productos | ✓ | ✓ | ✗ |
| Eliminar productos | ✓ | ✗ | ✗ |
| Ver botón "Crear" | ✓ | ✗ | ✗ |
| Acceder a crear-producto.html | ✓ | ✗ (redirige) | ✗ (redirige) |

---

## 🔧 CÓDIGO EN CADA PÁGINA

### **iniciar-sesion.html y iniciar-sesion.js** (Punto de entrada)
- El usuario entra credenciales
- Se autentica con el servidor
- El servidor devuelve el ROL
- Se guarda en localStorage

```javascript
// En login.js
localStorage.setItem("userLogin", JSON.stringify(respuesta));
```

---

### **index.html** (Dashboard)
- Verifica el rol
- Oculta botón "Crear Producto" para no-admins

```javascript
if(userLogin.rol !== "administrador") {
    document.getElementById("btnCrearProductoIndex").remove();
}
```

---

### **lista-productos.html** (Lista de productos)
- Muestra el usuario en navbar mediante local.js
- Oculta botones de crear para no-admins

```javascript
// Ocultar botones
if(userLogin.rol !== "administrador") {
    document.getElementById("btnCrearProducto").remove();
    document.getElementById("btnCrearProductoSidebar").remove();
}
```

---

### **crear-producto.html** (Crear producto)
- ES LA MÁS IMPORTANTE
- Redirige si no es admin (ANTES de cargar el formulario)

```javascript
if(userLogin.rol !== "administrador") {
    alert("⛔ Acceso denegado. Solo administradores pueden crear productos.");
    window.location.href = "lista-productos.html";
}
```

Esta página es la MÁS PROTEGIDA porque:
1. El frontend lo impide (redirige)
2. El backend lo impide (cuando intenta enviar datos)

---

### **local.js** (Utilidad para todas las páginas)
- Se ejecuta en TODAS las páginas
- Lee el usuario de localStorage
- Muestra el nombre en el navbar

```javascript
let userLogin = JSON.parse(localStorage.getItem("userLogin"));
document.getElementById("usuario-nombre").textContent = userLogin.usuario;
```

---

## 🛡️ SEGURIDAD: ¿CÓMO SABEMOS QUE ES REAL?

### Nivel 1: Frontend (lo que hicimos)
✓ Ocultamos botones según el rol
✓ Redirigimos a páginas no-permitidas
✗ **PERO** un hacker puede cambiar esto con DevTools

### Nivel 2: Backend (en el servidor)
✓ El servidor VERIFICAR de verdad si el usuario puede crear
✓ Si alguien intenta hackear el frontend, el servidor lo rechaza
✓ ✓ ✓ **ESTO ES LO IMPORTANTE**

**Nuestro SERVER hace:**
```javascript
// En el servidor (Node.js)
if(usuario.rol !== "administrador") {
    return res.status(403).json({
        mensaje: "No tienes permiso para crear productos"
    });
}
```

---

## 📝 RESUMEN PASO A PASO

1. **Login**: Usuario se autentica → Servidor devuelve ROL
2. **Guardar**: `localStorage.setItem("userLogin", ...)`
3. **Verificar**: `let user = JSON.parse(localStorage.getItem("userLogin"))`
4. **Controlar**: `if(user.rol !== "admin") { ... }`
5. **Acción**: 
   - Opción A: Ocultar con `display: "none"`
   - Opción B: Eliminar con `.remove()`
   - Opción C: Redirigir con `window.location.href`

---

## 🎯 PARA TI: CONCEPTOS CLAVE

**localStorage**
- Es como una "libreta" que guarda datos en el navegador
- El usuario puede verla en DevTools
- Se borra cuando se limpia el historial

**JSON.stringify() y JSON.parse()**
- stringify: Objeto → Texto (para guardar)
- parse: Texto → Objeto (para usar)

**querySelector vs getElementById**
- `querySelector("#id", ".clase")` - más flexible
- `getElementById("id")` - específico para IDs

**addEventListener**
- Espera a que pase algo (clic, carga, etc.)
- Luego ejecuta una función

**Control de acceso**
- Frontend: UX (experiencia del usuario)
- Backend: Seguridad REAL

---

## 📚 EJERCICIOS PARA PRACTICAR

1. **Ejercicio 1**: Agrega un rol "supervisor" que vea todo pero no pueda eliminar
2. **Ejercicio 2**: Crea un botón "Editar" que solo vea ADMIN y VENDEDOR
3. **Ejercicio 3**: Protege la página de editar (crear-producto.html) con los 3 métodos

---

## 📞 DUDAS COMUNES

**P: ¿Por qué usas tanto `if(userLogin.rol !== "administrador")`?**
R: Porque queremos hacer ALGO si NO es admin. Con `!==` (no igual a) es más fácil escribir la lógica.

**P: ¿Qué pasa si localStorage está vacío?**
R: Daría error. Por eso deberías agregar validación:
```javascript
let userLogin = JSON.parse(localStorage.getItem("userLogin"));
if(!userLogin) {
    window.location.href = "iniciar-sesion.html";
}
```

**P: ¿Se puede hackear localStorage?**
R: Sí, pero solo afecta al frontend. El backend SIEMPRE verifica.

**P: ¿Por qué hay botones con diferentes IDs en index.html?**
R: Porque hay botones en diferentes lugares (barra lateral, centro)
y queremos controlarlos todos.

---

## ✅ CHECKLIST: LO QUE HICE

- ✅ Sistema de login que devuelve ROL
- ✅ Almacenamiento de ROL en localStorage
- ✅ Lectura del ROL con local.js
- ✅ Ocultación de botones por rol
- ✅ Redirección en crear-pro.html
- ✅ Comentarios en el código
- ✅ Validaciones en cada página

---

**¡Ahora entiendes cómo funciona el control de acceso por roles! 🎉**
