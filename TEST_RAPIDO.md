# 🧪 TEST RÁPIDO - Verificar que el Flujo Funciona

## ✅ PROBLEMAS SOLUCIONADOS

### 1. **Backend no guardaba el ESTADO del pedido**
- **Archivo:** `pedidosController.js`
- **Problema:** El INSERT no incluía el campo `estado`
- **Solución:** Agregué `estado` al desestructurado y al INSERT
- **Status:** ✅ ARREGLADO

### 2. **GET de Pedidos no retornaba el TOTAL**
- **Archivo:** `pedidosController.js`
- **Problema:** Los pedidos no mostraban el total en el dashboard
- **Solución:** Agregué SUM(dp.precio * dp.cantidad) en la query con LEFT JOIN a detalle_pedido
- **Status:** ✅ ARREGLADO

### 3. **Dashboard buscaba `created_at` pero el campo es `fecha`**
- **Archivo:** `listado-pedidos.html`
- **Problema:** Falseaba los pedidos con undefined en fecha
- **Solución:** Cambié `pedido.created_at` por `pedido.fecha`
- **Status:** ✅ ARREGLADO

---

## 🔍 PASO A PASO - VERIFICAR QUE FUNCIONA

### **Paso 1: Asegurate que el Backend está activado**
```bash
cd "Evaluacion/BACKEND_TIENDA_NODE_MYSQL/BACKEND_TIENDA_NODE_MYSQL"
npm run dev
```

**Esperado:** Deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
💾 Base de datos MySQL: inventario_db
```

---

### **Paso 2: Abre el Restaurante en http://localhost (o abre el archivo localmente)**

Archivo:
```
Restaurant Website/Restaurant Website/platilla-carrito/index.html
```

- Agrega 2-3 productos al carrito
- Verifica que se guardaron en localStorage (F12 → Application → Local Storage)

---

### **Paso 3: Ve al Checkout**

Archivo:
```
Restaurant Website/Restaurant Website/platilla-carrito/checkout.html
```

- Completa el formulario:
  - **Nombres:** Juan
  - **Apellidos:** Pérez
  - **Email:** juan@example.com (NO REPETIR)
  - **Celular:** 3001234567
  - **Dirección:** Calle 123 Apt 45
  - **Método Pago:** Contraentrega

- Click en **"Place Order"**

**Esperado en Console (F12):**
- ✅ Ver requests POST a `/api/clientes` y `/api/pedidos`
- ✅ Ambas deben retornar 201 (Created)
- ✅ Redirigir a `thankyou.html`

---

### **Paso 4: Verifica en el Backend (Console del Server)**

Deberías ver logs indicando que se insertaron:
- Cliente nuevo
- Pedido nuevo
- Detalles del pedido

---

### **Paso 5: Abre el Dashboard**

Archivo:
```
dashboard-tienda/frontend-apicrud/listado-pedidos.html
```

**Esperado:**
- ✅ Ver el pedido que acabas de crear
- ✅ Mostrar: Juan | juan@example.com | Hoy | $TOTAL | pendiente
- ✅ Poder cambiar estado (click en 🔄)
- ✅ Poder eliminar (click en 🗑️)

---

### **Paso 6: Verifica Cliente en Dashboard**

Archivo:
```
dashboard-tienda/frontend-apicrud/listado-clientes.html
```

**Esperado:**
- ✅ Ver el cliente "Juan Pérez" que se creó automáticamente
- ✅ Mostrar todos sus datos

---

## 📊 SI ALGO NO FUNCIONA

### **Opción 1: Verifica Errores en Console**
```bash
F12 → Console → Ver mensajes de error
```

Busca errores como:
- `Failed to fetch` → Backend no está corriendo
- `404 Not Found` → Ruta incorrecta
- `Connection refused` → Verificar localhost:3000

---

### **Opcion 2: Verifica el Payload que Envía**

En checkout.html, agrega antes de `place order`:
```javascript
const clienteData = { /* datos */ };
console.log("Enviando Cliente:", clienteData);

const pedidoData = { /* datos */ };
console.log("Enviando Pedido:", pedidoData);
```

Verifica en Console que tengan toda la estructura correcta.

---

### **Opción 3: Verifica la Respuesta del Backend**

En checkout.html, modifica el .then():
```javascript
const cliente = await clienteRes.json();
console.log("Respuesta Cliente:", cliente);

const pedido = await pedidoRes.json();
console.log("Respuesta Pedido:", pedido);
```

Debe retornar `id_cliente` e `id_pedido` respectivamente.

---

### **Opcion 4: Verifica la BD Directamente**

Conectate a MySQL y ejecuta:
```sql
SELECT * FROM clientes ORDER BY id_cliente DESC LIMIT 5;
SELECT * FROM pedido ORDER BY id DESC LIMIT 5;
SELECT * FROM detalle_pedido ORDER BY id DESC LIMIT 5;
```

Verifica que se insertaron los datos.

---

## ✨ SI TODO FUNCIONA

¡PERFECTO! Ahora:

1. **Los pedidos desde el restaurante se guardan en la BD** ✅
2. **El estado del pedido se guarda correctamente** ✅
3. **El total se calcula dinámicamente** ✅
4. **El dashboard carga todos los pedidos** ✅
5. **Se pueden cambiar estados y eliminar** ✅

---

## 📝 NOTA IMPORTANTE

Si reinicia el servidor backend:
1. Los datos **NO** se pierden (están en MySQL)
2. El carrito en localStorage **sí se mantiene** en el navegador
3. Todos los CRUD siguen funcionando

¡Todo está integrado correctamente! 🎉
