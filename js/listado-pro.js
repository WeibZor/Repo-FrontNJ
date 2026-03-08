// variables globales
let tablaProductos = document.querySelector("#tabla-productos tbody");
let busquedaInput = document.querySelector("#busqueda-productos");

let obtenerUsuarioLogueado = () => {
  try {
    return JSON.parse(localStorage.getItem("userLogin"));
  } catch (e) {
    return null;
  }
};

let esAdmin = () => {
  let userLogin = obtenerUsuarioLogueado();
  return userLogin && userLogin.rol === "administrador";
};

let alternarColumnaAcciones = () => {
  const admin = esAdmin();
  const table = document.querySelector("#tabla-productos");
  if (!table) return;

  const ths = table.querySelectorAll("thead th");
  if (ths.length >= 7) {
    ths[6].style.display = admin ? "" : "none"; 
  }
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((tr) => {
    const tds = tr.querySelectorAll("td");
    if (tds.length >= 7) {
      tds[6].style.display = admin ? "" : "none";
    }
  });
};

let renderizarTabla = (tableData) => {
  tablaProductos.innerHTML = ""; 

  // guardar lo que se está mostrando (importantísimo para editar/eliminar)
  localStorage.setItem("datosTablaFiltrada", JSON.stringify(tableData));

  if (!tableData || tableData.length === 0) {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="7" class="text-center text-muted py-4">
        No hay productos para mostrar.
      </td>
    `;
    tablaProductos.appendChild(row);
    alternarColumnaAcciones();
    return;
  }
  const admin = esAdmin();

  tableData.forEach((prod, i) => {
    let row = document.createElement("tr");

    const actionsHtml = admin
      ? `
        <button onclick="editarFilaTabla(${i})" type="button" class="btn btn-warning m-3"> Editar </button>
        <button class="btn btn-danger" onclick="eliminarFilaTabla(${i})" type="button"> Eliminar </button>
      `
      : ``;

    row.innerHTML = ` 
      <td> ${i + 1} </td>
      <td> ${prod.nombre} </td>
      <td> ${prod.descripcion} </td>
      <td> ${prod.precio} </td>
      <td> ${prod.stock} </td>
      <td> <img src="${prod.imagen}" width="100px"></td>
      <td>
        ${actionsHtml}
      </td>
    `;

    tablaProductos.appendChild(row);
  });

  alternarColumnaAcciones();
};

let filtrarYRenderizar = (query) => {
  let productsSaved = JSON.parse(localStorage.getItem("datosTabla")) || [];
  let q = (query || "").trim().toLowerCase();

  if (!q) {
    renderizarTabla(productsSaved);
    return;
  }
  let filtered = productsSaved.filter((prod) => {
    let nombre = (prod.nombre || "").toLowerCase();
    return nombre.includes(q);
  });

  renderizarTabla(filtered);
};

busquedaInput.addEventListener("keyup", () => {
  filtrarYRenderizar(busquedaInput.value);
});

document.addEventListener("DOMContentLoaded", () => {
  obtenerDatosTabla();
  alternarColumnaAcciones();
});

let obtenerDatosTabla = async () => {
  let url = "http://localhost:3000/api/productos";
  try {
    let respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (respuesta.status === 204) {
      console.log("No hay datos en la BD");
      renderizarTabla([]);
    } else {
      let tableData = await respuesta.json();
      console.log(tableData);

      // agregar los datos a LocalStorage (tabla completa)
      localStorage.setItem("datosTabla", JSON.stringify(tableData));

      // pintar tabla
      renderizarTabla(tableData);
    }
  } catch (error) {
    console.log(error);
  }
};
let editarFilaTabla = (pos) => {
  if (!esAdmin()) {
    alert("No tienes permisos para editar productos.");
    return;
  }

  let products = [];
  let productsSaved = JSON.parse(localStorage.getItem("datosTablaFiltrada"));
  if (productsSaved != null) {
    products = productsSaved;
  }

  let singleProduct = products[pos];
  localStorage.setItem("productEdit", JSON.stringify(singleProduct));
  location.href =
    "http://127.0.0.1:5500/Proyecto-Tienda-virtual-parte-1/crear-producto.html";
};

let eliminarFilaTabla = (pos) => {
  if (!esAdmin()) {
    alert("No tienes permisos para eliminar productos.");
    return;
  }

  let products = [];
  let productsSaved = JSON.parse(localStorage.getItem("datosTablaFiltrada"));
  if (productsSaved != null) {
    products = productsSaved;
  }

  let singleProduct = products[pos];

  let IDProduct = {
    id: singleProduct.id,
  };

  let confirmar = confirm(`¿Deseas eliminar ${singleProduct.nombre} ?`);
  if (confirmar) {
    enviarEliminarProducto(IDProduct);
  }
};

let enviarEliminarProducto = async (id) => {
  let url = `http://localhost:3000/api/productos/${id.id}`;
  try {
    let respuesta = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (respuesta.status === 406) {
      alert("El ID enviado no fue admitido");
    } else {
      let mensaje = await respuesta.json();
      alert(mensaje.message);

      // recargar tabla sin recargar toda la página
      obtenerDatosTabla();
      if (busquedaInput) busquedaInput.value = ""; 
    }
  } catch (error) {
    console.log(error);
  }
};