# 🛒 INSTRUCCIONES - SISTEMA DE CARRITO Y PEDIDOS

## 📋 Descripción General

Se ha preparado la estructura HTML/CSS para un sistema de carrito de compras. Los estudiantes deben implementar el JavaScript para:

1. **Agregar productos al carrito** (desde index.html)
2. **Gestionar el carrito** (mostrar, actualizar,eliminar)
3. **Realizar el checkout** (formulario con datos de entrega)
4. **Enviar pedido a la API** (POST a Backend)
5. **Mostrar confirmación** (thankyou.html)

---

## 🔑 IDs EN HTML - REFERENCIA PARA JAVASCRIPT

### **index.html** - Catálogo de Productos

Cada producto tiene estos atributos:

```html
<div class="card producto" 
     data-id="1" 
     data-price="10.50" 
     data-name="Tasty Burger" 
     data-image="./images/b1.png">
```

**Cómo acceder desde JS:**
```javascript
const card = document.querySelector('.card.producto');
const id = card.dataset.id;           // "1"
const precio = card.dataset.price;    // "10.50"
const nombre = card.dataset.name;     // "Tasty Burger"
const imagen = card.dataset.image;    // "./images/b1.png"
```

**Selector para TODOS los productos:**
```javascript
const productos = document.querySelectorAll('.card.producto');
productos.forEach(producto => {
  const id = producto.dataset.id;
  const boton = producto.querySelector('.btn-product');
  boton.addEventListener('click', () => agregarAlCarrito(id));
});
```

---

### **cart.html** - Página del Carrito

| ID | Tipo | Uso |
|-------|------|-----|
| `tabla-carrito` | `table` | Tabla que muestra los productos |
| `carrito-items` | `tbody` | Cuerpo de la tabla (AGREGAR FILAS HERE) |
| `subtotal-resumen` | `span` | Mostrar subtotal |
| `domicilio-resumen` | `span` | Mostrar costo de domicilio |
| `descuento-resumen` | `span` | Mostrar descuento |
| `total-resumen` | `span` | Mostrar TOTAL a pagar |

**Estructura de fila a agregar dinámicamente:**
```html
<tr>
  <td>
    <button class="remove-btn" data-product-id="1">✕</button>
    <img src="./images/b1.png" alt="">
    <span>Tasty Burger</span>
  </td>
  <td>$10.50</td>
  <td>
    <input type="number" value="1" min="1" class="cantidad-carrito" data-product-id="1">
  </td>
  <td class="subtotal-producto" data-product-id="1">$10.50</td>
</tr>
```

---

### **checkout.html** - Formulario de Entrega y Pago

| ID | Tipo | Campo |
|--------|------|-------|
| `form-checkout` | `form` | Formulario principal |
| `nombres-checkout` | `input` | Nombres del cliente |
| `apellidos-checkout` | `input` | Apellidos del cliente |
| `email-checkout` | `input` | Email |
| `celular-checkout` | `input` | Teléfono |
| `direccion-checkout` | `input` | Dirección principal |
| `direccion2-checkout` | `input` | Dirección secundaria (opcional) |
| `notas-checkout` | `textarea` | Notas especiales |
| `detalle-productos-checkout` | `div` | MOSTRAR CARRITO (dinámico) |
| `total-checkout` | `span` | Mostrar TOTAL $X.XX |
| `metodo-pago` | `radio` | Método de pago seleccionado |

**Valores de `metodo-pago`:**
- `contra-entrega` (valor por defecto +5%)
- `pse`
- `transferencia`

---

### **thankyou.html** - Página de Confirmación

| ID | Tipo | Uso |
|--------|------|-----|
| `numero-pedido-final` | `span` | Mostrar número de pedido generado |
| `tiempo-entrega` | `span` | Mostrar tiempo estimado |

---

## 💻 QUÉ DEBEN IMPLEMENTAR LOS ESTUDIANTES

### **1. LocalStorage para Carrito**

```javascript
// Estructura sugerida
const carrito = [
  {
    id: 1,
    nombre: "Tasty Burger",
    precio: 10.50,
    cantidad: 2,
    imagen: "./images/b1.png"
  },
  // ...
];

// Guardar en localStorage
localStorage.setItem('carrito', JSON.stringify(carrito));

// Obtener del localStorage
const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
```

---

### **2. Funciones Necesarias**

#### **Agregar al Carrito (index.html)**
```javascript
function agregarAlCarrito(idProducto) {
  const producto = document.querySelector(`[data-id="${idProducto}"]`);
  const id = producto.dataset.id;
  const nombre = producto.dataset.name;
  const precio = parseFloat(producto.dataset.price);
  const imagen = producto.dataset.image;

  // TODO: Obtener carrito de localStorage
  // TODO: Buscar si el producto ya existe
  // TODO: Si existe, incrementar cantidad
  // TODO: Si no existe, agregar nuevo
  // TODO: Guardar en localStorage
  // TODO: Mostrar notificación al usuario
  // TODO: Actualizar contador del carrito (.contar-pro)
}
```

#### **Mostrar Carrito (cart.html)**
```javascript
function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const tabla = document.getElementById('carrito-items');
  tabla.innerHTML = ''; // Limpiar tabla

  // TODO: Iterar sobre cada producto del carrito
  // TODO: Crear fila <tr> dinámicamente
  // TODO: Agregar botón de eliminar
  // TODO: Agregar evento de cambio de cantidad
  // TODO: Calcular subtotal por producto
  
  // TODO: Calcular y mostrar totales:
  //       - Subtotal
  //       - Domicilio
  //       - Descuento (si aplica)
  //       - TOTAL
}
```

#### **Cargar Carrito en Checkout (checkout.html)**
```javascript
function cargarCarritoEnCheckout() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const detalle = document.getElementById('detalle-productos-checkout');
  detalle.innerHTML = '';

  // TODO: Mostrar nombre y precio de cada producto
  // TODO: Incluir cantidad
  // TODO: Mostrar subtotal
  // TODO: Mostrar total final
}
```

#### **Enviar Pedido a API (checkout.html)**
```javascript
document.getElementById('form-checkout').addEventListener('submit', async (e) => {
  e.preventDefault();

  // TODO: Obtener valores del formulario:
  const nombres = document.getElementById('nombres-checkout').value;
  const apellidos = document.getElementById('apellidos-checkout').value;
  const email = document.getElementById('email-checkout').value;
  const celular = document.getElementById('celular-checkout').value;
  const direccion = document.getElementById('direccion-checkout').value;
  const direccion2 = document.getElementById('direccion2-checkout').value;
  const notas = document.getElementById('notas-checkout').value;
  const metodoPago = document.querySelector('[name="metodo-pago"]:checked').value;

  // TODO: Obtener carrito de localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // TODO: Crear objeto de pedido:
  const pedido = {
    id_cliente: null, // TODO: Obtener del usuario logueado
    metodo_pago: metodoPago,
    estado: 'pendiente',
    total: 0, // TODO: Calcular
    productos: carrito // Items del carrito
  };

  // TODO: Validar que todos los campos estén completos
  // TODO: Calcular total (suma de productos + domicilio - descuentos)
  
  // TODO: Hacer POST a: http://localhost:3000/api/pedidos
  try {
    const response = await fetch('http://localhost:3000/api/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
    });

    if (response.ok) {
      const data = await response.json();
      // TODO: Guardar número de pedido en localStorage
      // TODO: Limpiar carrito
      // TODO: Redirigir a thankyou.html
      window.location.href = 'thankyou.html';
    } else {
      // TODO: Mostrar error al usuario
      alert('Error al procesar el pedido');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión');
  }
});
```

---

## 🚀 FLUJO DE TRABAJO RECOMENDADO

1. **Crear archivo `js/carrito.js`**
   - Función: `agregarAlCarrito(id)`
   - Función: `actualizarCarrito()`
   - Función: `eliminarDelCarrito(id)`
   - Usar localStorage

2. **En index.html**
   - Agregar evento click a `.btn-product`
   - Llamar a `agregarAlCarrito(id)`

3. **Crear archivo `js/cart.js`**
   - Función: `cargarCarrito()`
   - Hacer fetch de datos si es necesario
   - Mostrar tabla dinámicamente
   - Agregar eventos a botones

4. **Crear archivo `js/checkout.js`**
   - Precargar carrito en checkout
   - Validar formulario
   - Hacer POST a `/api/pedidos`
   - Redirigir a thankyou

5. **Crear archivo `js/api.js` (opcional pero recomendado)**
   - Funciones centralizadas para fetch
   - Manejo de errores
   - URLs base de API

---

## 📝 ESTRUCTURA BASE DE UN ARCHIVO JS

**Archivo: `js/carrito.js`**

```javascript
// Configuración
const API_URL = 'http://localhost:3000/api';

// Obtener carrito del localStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
  // TODO: Implementar
}

// Actualizar cantidad
function actualizarCantidad(idProducto, nuevaCantidad) {
  // TODO: Implementar
}

// Eliminar del carrito
function eliminarDelCarrito(idProducto) {
  // TODO: Implementar
}

// Calcular total del carrito
function calcularTotal() {
  // TODO: Implementar
}

// Limpiar carrito
function limpiarCarrito() {
  localStorage.removeItem('carrito');
}
```

---

## ✅ CHECKLIST PARA COMPLETAR

- [ ] Crear archivo `js/carrito.js` con funciones de localStorage
- [ ] Crear archivo `js/index.js` para agregar productos
- [ ] Crear archivo `js/cart.js` para mostrar carrito
- [ ] Crear archivo `js/checkout.js` para procesar pedidos
- [ ] Implementar validación de formularios
- [ ] Hacer POST a `/api/pedidos` exitosamente
- [ ] Mostrar mensajes de error/éxito
- [ ] Probar flujo completo: Agregar → Carrito → Checkout → Confirmación

---

## 🔗 ENDPOINTS DEL BACKEND

```
POST /api/pedidos
Crear nuevo pedido

Body:
{
  "id_cliente": 1,
  "metodo_pago": "contra-entrega",
  "estado": "pendiente",
  "total": 25.50,
  "notas": "Sin cebolla"
}

Response (si es exitoso):
{
  "id_pedido": 5,
  "estado": "pendiente",
  "mensaje": "Pedido creado exitosamente"
}
```

---

## 💡 TIPS PARA LOS ESTUDIANTES

1. **Prueba en la consola** antes de usar los datos
   ```javascript
   console.log(JSON.parse(localStorage.getItem('carrito')));
   ```

2. **Usa `event.preventDefault()`** en formularios
   ```javascript
   form.addEventListener('submit', (e) => {
     e.preventDefault(); // Evita recarga de página
     // Tu código aquí
   });
   ```

3. **Maneja errores de red**
   ```javascript
   fetch(url).catch(error => {
     console.error('Error:', error);
     alert('Error de conexión con el servidor');
   });
   ```

4. **Limpia el carrito después de enviar**
   ```javascript
   localStorage.removeItem('carrito');
   ```

5. **Guarda el número de pedido para mostrar en thankyou**
   ```javascript
   localStorage.setItem('numeroPedido', respuesta.id_pedido);
   ```

---

## 🎯 EVALUACIÓN

Los estudiantes serán evaluados sobre:

✅ **Funcionamiento del carrito** - Agregar, actualizar, eliminar  
✅ **Persistencia en localStorage** - Los datos se guardan y recuperan  
✅ **Validación de formularios** - Todos los campos requeridos  
✅ **Integración con API** - POST exitoso a `/api/pedidos`  
✅ **UX/Feedback** - Mensajes claros al usuario  
✅ **Código limpio** - Funciones bien organizadas  

---

¡A programar! 🚀
