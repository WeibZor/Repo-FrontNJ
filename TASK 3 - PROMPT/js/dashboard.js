// dashboard.js

// ================== AUTENTICACIÓN ==================
const activeUser = checkAuth();
if (!activeUser) throw new Error("Acceso no autorizado");

document.getElementById("userRole").textContent =
    `${activeUser.username} (${activeUser.role})`;

// ================== ESTADO GLOBAL ==================
let products = StorageService.get("products") || [];
let categories = StorageService.get("categories") || [];
const mainContent = document.getElementById("mainContent");

// ================== CONTROL POR ROL ==================
if (activeUser.role === "Empleado") {
    ["categoriesMenu", "movementsMenu", "reportsMenu"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
}

// ================== LOGOUT (FIX DEFINITIVO) ==================
window.logout = function () {
    localStorage.removeItem("activeUser");
    window.location.href = "index.html";
};

// ================== NAVEGACIÓN ==================
function loadView(view) {
    const views = {
        dashboard: renderDashboard,
        products: renderProducts,
        categories: renderCategories,
        movements: renderMovements,
        reports: renderReports
    };

    views[view]
        ? views[view]()
        : mainContent.innerHTML = "<p>Vista no encontrada</p>";
}

// ================== DASHBOARD ==================
function renderDashboard() {
    const lowStock = products.filter(p => p.stock <= p.stockMin);
    const totalMovements = products.reduce(
        (acc, p) => acc + p.movements.length, 0
    );

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
            <h6>Categorías</h6>
            <h4>${categories.length}</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <h6>Bajo Stock</h6>
            <h4>${lowStock.length}</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card shadow-sm p-3">
            <h6>Movimientos</h6>
            <h4>${totalMovements}</h4>
          </div>
        </div>
      </div>
    `;
}

// ================== PRODUCTOS ==================
function renderProducts() {
    mainContent.innerHTML = `
      <h4>Productos</h4>
      ${activeUser.role === "Administrador"
        ? `<button class="btn btn-success mb-3" onclick="addProduct()">Agregar Producto</button>`
        : ""}

      <table class="table table-striped align-middle">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => `
            <tr>
              <td><img src="${p.image}" width="60" alt="${p.name}"></td>
              <td>${p.name}</td>
              <td>${p.category}</td>
              <td>$${p.price}</td>
              <td class="${p.stock <= p.stockMin ? 'text-danger fw-bold' : ''}">
                ${p.stock}
              </td>
              <td>
                <button class="btn btn-info btn-sm" onclick="viewProduct(${p.id})">Ver</button>

                ${activeUser.role === "Administrador" ? `
                  <button class="btn btn-warning btn-sm" onclick="editProduct(${p.id})">Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Eliminar</button>
                ` : `
                  <button class="btn btn-success btn-sm" onclick="registerMovement(${p.id}, 'entrada')">Comprar</button>
                  <button class="btn btn-secondary btn-sm" onclick="registerMovement(${p.id}, 'salida')">Vender</button>
                `}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
}

// ================== CRUD PRODUCTOS ==================
function addProduct() {
    const name = prompt("Nombre del producto:");
    const category = prompt(`Categoría (${categories.join(", ")}):`);
    const price = Number(prompt("Precio:"));
    const image = prompt("URL de imagen:");

    if (!name || !category || !price || !image) return;

    products.push({
        id: Date.now(),
        name,
        category,
        price,
        stock: 0,
        stockMin: 10,
        image,
        movements: []
    });

    StorageService.set("products", products);
    renderProducts();
}

function editProduct(id) {
    const p = products.find(p => p.id === id);
    if (!p) return;

    p.name = prompt("Nombre:", p.name);
    p.price = Number(prompt("Precio:", p.price));
    p.image = prompt("Imagen:", p.image);

    StorageService.set("products", products);
    renderProducts();
}

function deleteProduct(id) {
    if (!confirm("¿Eliminar producto?")) return;

    products = products.filter(p => p.id !== id);
    StorageService.set("products", products);
    renderProducts();
}

// ================== MOVIMIENTOS (EMPLEADO) ==================
function registerMovement(id, type) {
    const qty = Number(prompt("Cantidad:"));
    if (!qty || qty <= 0) return;

    const p = products.find(p => p.id === id);
    if (!p) return;

    if (type === "salida" && p.stock < qty) {
        alert("Stock insuficiente");
        return;
    }

    p.stock += type === "entrada" ? qty : -qty;
    p.movements.push({
        date: new Date().toLocaleString(),
        type,
        qty,
        user: activeUser.username
    });

    StorageService.set("products", products);
    renderProducts();
}

// ================== MODAL PRODUCTO ==================
function viewProduct(id) {
    const p = products.find(p => p.id === id);
    if (!p) return;

    document.getElementById("modalTitle").textContent = p.name;
    document.getElementById("modalImage").src = p.image;
    document.getElementById("modalInfo").innerHTML = `
      <p><strong>Categoría:</strong> ${p.category}</p>
      <p><strong>Precio:</strong> $${p.price}</p>
      <p><strong>Stock:</strong> ${p.stock}</p>
      <p><strong>Movimientos:</strong> ${p.movements.length}</p>
    `;

    new bootstrap.Modal(document.getElementById("productModal")).show();
}

// ================== CATEGORÍAS ==================
function renderCategories() {
    mainContent.innerHTML = `
      <h4>Categorías</h4>
      <button class="btn btn-success mb-3" onclick="addCategory()">Agregar Categoría</button>
      <ul class="list-group">
        ${categories.map(c => `<li class="list-group-item">${c}</li>`).join("")}
      </ul>
    `;
}

function addCategory() {
    const name = prompt("Nombre de la categoría:");
    if (!name) return;

    categories.push(name);
    StorageService.set("categories", categories);
    renderCategories();
}

// ================== MOVIMIENTOS (ADMIN) ==================
function renderMovements() {
    const rows = products.flatMap(p =>
        p.movements.map(m => `
          <tr>
            <td>${p.name}</td>
            <td>${m.type}</td>
            <td>${m.qty}</td>
            <td>${m.user}</td>
            <td>${m.date}</td>
          </tr>
        `)
    );

    mainContent.innerHTML = `
      <h4>Historial de Movimientos</h4>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Usuario</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          ${rows.length ? rows.join("") : "<tr><td colspan='5'>Sin movimientos</td></tr>"}
        </tbody>
      </table>
    `;
}

// ================== REPORTES ==================
function renderReports() {
    const lowStock = products.filter(p => p.stock <= p.stockMin);

    mainContent.innerHTML = `
      <h4>Estadísticas</h4>
      <div class="alert alert-warning">
        Productos con bajo stock: <strong>${lowStock.length}</strong>
      </div>
    `;
}

// ================== INICIO ==================
renderDashboard();
