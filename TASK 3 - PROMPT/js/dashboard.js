// dashboard.js

// 1️⃣ Verificar usuario activo
const activeUser = checkAuth();

// Si no hay usuario activo, se detiene la ejecución
if(!activeUser) throw new Error("No hay usuario activo");

// 2️⃣ Mostrar usuario y rol en navbar
document.getElementById("userRole").textContent = `${activeUser.username} (${activeUser.role})`;

// 3️⃣ Inicializar productos y categorías
let products = StorageService.get("products") || [];
let categories = StorageService.get("categories") || [];
const mainContent = document.getElementById("mainContent");

// 4️⃣ Configurar menú según rol
if(activeUser.role === "Empleado"){
    document.getElementById("reportsMenu").style.display = "none";
    document.getElementById("movementsMenu").style.display = "none";
    document.getElementById("categoriesMenu").style.display = "none";
}

// 5️⃣ Logout
function logout() {
    localStorage.removeItem("activeUser");
    window.location.href = "index.html";
}

// 6️⃣ Cargar vistas
function loadView(view){
    switch(view){
        case "dashboard": renderDashboard(); break;
        case "products": renderProducts(); break;
        case "categories": renderCategories(); break;
        case "movements": renderMovements(); break;
        case "reports": renderReports(); break;
        default: mainContent.innerHTML="<p>Vista no encontrada</p>";
    }
}

// ------------------ DASHBOARD ------------------
function renderDashboard(){
    const lowStockProducts = products.filter(p => p.stock <= p.stockMin);
    const totalMovements = products.reduce((acc,p)=>acc+p.movements.length,0);
    const mostMoved = products.reduce((prev,curr)=>curr.movements.length>prev.movements.length?curr:prev, products[0]);

    mainContent.innerHTML = `
        <h3 class="mb-4">Panel Principal</h3>
        <div class="row g-3">
          <div class="col-md-3">
            <div class="card shadow-sm p-3">
              <h6>Total Productos</h6>
              <h4>${products.length}</h4>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card shadow-sm p-3">
              <h6>Productos bajo stock</h6>
              <h4>${lowStockProducts.length}</h4>
              <ul class="mb-0">
                ${lowStockProducts.map(p=>`<li>${p.name} (${p.stock})</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card shadow-sm p-3">
              <h6>Total Movimientos</h6>
              <h4>${totalMovements}</h4>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card shadow-sm p-3">
              <h6>Producto más movido</h6>
              <h5>${mostMoved.name}</h5>
              <p>${mostMoved.movements.length} movimientos</p>
            </div>
          </div>
        </div>
    `;
}

// ------------------ PRODUCTOS ------------------
function renderProducts(){
    if(!products || products.length === 0){
        mainContent.innerHTML = "<p>No hay productos cargados.</p>";
        return;
    }

    let rows = products.map(p => `
        <tr>
            <td><img src="${p.image}" width="50" alt="${p.name}"></td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.price}</td>
            <td class="${p.stock <= p.stockMin ? 'text-danger' : ''}">${p.stock}</td>
            <td>${p.stockMin}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewProduct(${p.id})">Ver</button>
                ${activeUser.role==="Administrador"?`<button class="btn btn-sm btn-warning" onclick="editProduct(${p.id})">Editar</button>`:""}
                ${activeUser.role==="Administrador"?`<button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Eliminar</button>`:""}
                ${activeUser.role==="Empleado"?`
                  <button class="btn btn-sm btn-success" onclick="registerMovement(${p.id}, 'entrada')">Entrada</button>
                  <button class="btn btn-sm btn-secondary" onclick="registerMovement(${p.id}, 'salida')">Salida</button>
                `:""}
            </td>
        </tr>
    `).join('');

    mainContent.innerHTML = `
      <h4>Productos</h4>
      ${activeUser.role==="Administrador"?`<button class="btn btn-success mb-3" onclick="addProduct()">Agregar Producto</button>`:""}
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Stock Mínimo</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
}

// ------------------ MODAL PRODUCTO ------------------
function viewProduct(id){
    const p = products.find(p=>p.id===id);
    if(!p) return;

    document.getElementById("modalTitle").textContent = p.name;
    document.getElementById("modalImage").src = p.image;
    const lastMovements = p.movements.slice(-5).reverse();
    document.getElementById("modalInfo").innerHTML = `
      <p><strong>Categoría:</strong> ${p.category}</p>
      <p><strong>Precio:</strong> ${p.price}</p>
      <p><strong>Stock:</strong> ${p.stock}</p>
      <p><strong>Stock mínimo:</strong> ${p.stockMin}</p>
      <p><strong>Últimos Movimientos:</strong></p>
      <ul>${lastMovements.map(m=>`<li>${m.date} - ${m.type} - Cant: ${m.qty} - Usuario: ${m.user}</li>`).join('')}</ul>
    `;

    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
}

// ------------------ CRUD y MOVIMIENTOS ------------------
// (Aquí se mantiene la lógica de addProduct, editProduct, deleteProduct y registerMovement igual que antes)

// ------------------ CATEGORÍAS, MOVIMIENTOS, REPORTES ------------------
// (Mantener igual que tu código anterior, con renderCategories, renderMovements y renderReports)
