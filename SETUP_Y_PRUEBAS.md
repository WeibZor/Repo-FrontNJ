# 🚀 SETUP Y GUÍA DE PRUEBAS - RESTAURANTE TO CRUD

## ✅ Cambios Implementados

### 1. **Backend - Respuestas de API Corregidas**
**Archivos modificados:**
- `BACKEND_TIENDA_NODE_MYSQL/BACKEND_TIENDA_NODE_MYSQL/src/controllers/clientesController.js`
- `BACKEND_TIENDA_NODE_MYSQL/BACKEND_TIENDA_NODE_MYSQL/src/controllers/pedidosController.js`

**Cambios:** Ahora retornan `id_cliente` e `id_pedido` correctamente para que el checkout.html pueda procesarlos.

---

### 2. **Dashboard - Listados Implementados**
**Archivos modificados:**
- `dashboard-tienda/frontend-apicrud/listado-pedidos.html` - Carga pedidos desde API
- `dashboard-tienda/frontend-apicrud/listado-clientes.html` - Carga clientes desde API
- `dashboard-tienda/frontend-apicrud/listado-pro.html` - Carga productos desde API

**Funcionalidades añadidas:**
- ✅ Carga automática de datos desde `/api/`
- ✅ Búsqueda en tabla
- ✅ Cambiar estado de pedidos (PATCH)
- ✅ Eliminar registros (DELETE)
- ✅ Botones de edición (preparados para expandir)

---

### 3. **Formularios de Creación**
**Archivo modificado:**
- `dashboard-tienda/frontend-apicrud/crear-cliente.html` - Implementado POST a `/api/clientes`

**Funcionalidades:**
- Validación de campos requeridos
- POST a API con datos del formulario
- Redirect a listado después de crear
- Manejo de errores

---

### 4. **Restaurante - Checkout Corregido**
**Archivo modificado:**
- `Restaurant Website/Restaurant Website/platilla-carrito/checkout.html`

**Cambios:**
- Ahora incluye `precio` en cada producto del pedido
- Usa correctamente `cliente.id_cliente` del backend
- Usa correctamente `pedido.id_pedido` del backend

---

## 🔧 REQUISITOS PREVIOS

1. **Backend debe estar corriendo:**
   ```bash
   cd "BACKEND_TIENDA_NODE_MYSQL/BACKEND_TIENDA_NODE_MYSQL"
   npm install
   npm run dev
   ```
   Debe estar en http://localhost:3000

2. **Base de datos debe estar inicializada:**
   ```bash
   npm run init-db
   ```

3. **Navegadores deben permitir localStorage:**
   - El carrito se guarda en `localStorage`

---

## 🧪 GUÍA DE PRUEBAS PASO A PASO

### **FLUJO 1: Crear Pedido desde el Restaurante**

#### Paso 1: Acceder al sitio del Restaurante
```
Abrir: Restaurant Website/Restaurant Website/platilla-carrito/index.html
```

#### Paso 2: Agregar productos al carrito
- Hacer click en "Add to Cart" o similar
- Debe guardarse en localStorage bajo la clave `carrito`

#### Paso 3: Ir al carrito
```
Ir a: Restaurant Website/Restaurant Website/platilla-carrito/cart.html
```
- Ver los productos agregados

#### Paso 4: Checkout
```
Ir a: Restaurant Website/Restaurant Website/platilla-carrito/checkout.html
```

Completar formulario:
- **Nombres:** Juan
- **Apellidos:** Pérez
- **Email:** juan.perez@example.com
- **Celular:** 3001234567
- **Dirección:** Calle 123 #45
- **Método de Pago:** Contraentrega (o PSE/Transferencia)

#### Paso 5: Hacer click en "Place Order"

**Esperado:**
- ✅ Se crea el cliente en la BD
- ✅ Se crea el pedido en la BD
- ✅ Se redirige a `thankyou.html`
- ✅ Se limpia el carrito de localStorage

---

### **FLUJO 2: Ver Pedidos en el Dashboard**

#### Paso 1: Abrir Dashboard
```
Ir a: dashboard-tienda/frontend-apicrud/index.html
```

#### Paso 2: Ir a Listado de Pedidos
```
Menu → Pedidos → Ver Pedidos
```
O directamente:
```
dashboard-tienda/frontend-apicrud/listado-pedidos.html
```

**Esperado:**
- ✅ Se cargan todos los pedidos desde `/api/pedidos`
- ✅ Ver el pedido creado desde el restaurante
- ✅ Mostrar: #, Cliente, Email, Fecha, Total, Estado

#### Paso 3: Cambiar Estado del Pedido
- Click en botón "🔄" (sync icon)
- Cambiar estado: pendiente → procesando → completado → cancelado
- Se debe actualizar en tiempo real

#### Paso 4: Eliminar Pedido (opcional)
- Click en "🗑️" (trash icon)
- Confirmar eliminación
- El pedido debe desaparecer de la tabla

---

### **FLUJO 3: Ver Clientes en el Dashboard**

#### Paso 1: Ir a Listado de Clientes
```
Menu → Clientes → Ver Clientes
```

**Esperado:**
- ✅ Ver el cliente "Juan Pérez" que se creó desde el restaurante
- ✅ Mostrar: #, Nombre, Apellido, Email, Celular, Dirección

#### Paso 2: Crear Cliente desde Dashboard
```
Menu → Clientes → Crear Clientes
```

Completar formulario y click en "Crear Cliente"

**Esperado:**
- ✅ POST exitoso a `/api/clientes`
- ✅ Redirect a listado de clientes
- ✅ Nuevo cliente aparece en la tabla

---

### **FLUJO 4: Ver Productos en el Dashboard**

#### Paso 1: Ir a Listado de Productos
```
Menu → Productos → Ver Productos
```

**Esperado:**
- ✅ Se cargan todos los productos desde `/api/productos`
- ✅ Mostrar: #, Nombre, Descripción, Precio, Stock, Imagen

---

## 🔍 DEBUGGING / SOLUCIÓN DE PROBLEMAS

### Si los pedidos NO aparecen en el Dashboard:
1. Verificar que el backend está corriendo (http://localhost:3000)
2. Verificar que la BD tiene datos (ver logs del backend)
3. Abrir DevTools (F12) → Console → Ver errores
4. Ejecutar en consola:
   ```javascript
   fetch('http://localhost:3000/api/pedidos')
     .then(r => r.json())
     .then(d => console.log(d))
   ```

### Si el checkout no funciona:
1. Abrir DevTools → Console
2. Buscar mensajes de error
3. Verificar que el Backend está en http://localhost:3000
4. Verificar estructura del carrito en localStorage:
   ```javascript
   console.log(JSON.parse(localStorage.getItem('carrito')))
   ```

### Si falta el `id_cliente`:
1. Verificar que el backend fue actualizado (buscar `id_cliente` en responses)
2. Reiniciar el servidor backend

---

## 📊 ESTRUCTURA DE DATOS ESPERADA

### Cliente (POST a `/api/clientes`):
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "celular": "3001234567",
  "direccion": "Calle 123",
  "direccion2": "",
  "descripcion": "Notas"
}
```

**Respuesta exitosa:**
```json
{
  "message": "Cliente creado con éxito",
  "id_cliente": 5,
  "id": 5
}
```

---

### Pedido (POST a `/api/pedidos`):
```json
{
  "id_cliente": 5,
  "metodo_pago": "contra-entrega",
  "estado": "pendiente",
  "total": 45.50,
  "productos": [
    {
      "id_producto": 1,
      "precio": 10.50,
      "cantidad": 2
    }
  ]
}
```

**Respuesta exitosa:**
```json
{
  "message": "Pedido creado con éxito",
  "id_pedido": 10,
  "id": 10
}
```

---

## 🔐 ENDPOINTS UTILIZADOS

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/pedidos` | Obtener todos los pedidos |
| POST | `/api/pedidos` | Crear nuevo pedido |
| PATCH | `/api/pedidos/:id/estado` | Cambiar estado |
| DELETE | `/api/pedidos/:id` | Eliminar pedido |
| GET | `/api/clientes` | Obtener todos los clientes |
| POST | `/api/clientes` | Crear nuevo cliente |
| DELETE | `/api/clientes/:id` | Eliminar cliente |
| GET | `/api/productos` | Obtener todos los productos |
| DELETE | `/api/productos/:id` | Eliminar producto |

---

## ✨ PRÓXIMAS MEJORAS (Opcional)

- [ ] Implementar edición de pedidos
- [ ] Agregar imágenes de productos
- [ ] Implementar filtros más avanzados
- [ ] Agregar paginación a listados
- [ ] Implementar autenticación (login del dashboard)
- [ ] Agregar reportes/estadísticas

---

## 📝 NOTAS IMPORTANTES

1. **El carrito se guarda en localStorage**, no en el servidor
2. **Los clientes se crean automáticamente** cuando se completa un pedido en el restaurante
3. **Los estados de pedidos son:** pendiente, procesando, completado, cancelado
4. **CORS está habilitado en el backend** para permitir requests desde el restaurante

---

¡Listo! Sigue los pasos de prueba y verifica que todo fluya correctamente. 🎉
