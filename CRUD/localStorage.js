let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo")) || null;
let peliculaEditando = null;

/* ======================= USUARIOS DE PRUEBA ======================= */
if (usuarios.length === 0) {
    usuarios = [
        { usuario: "admin", password: "1234" },
        { usuario: "usuario", password: "1234" },
        { usuario: "demo", password: "1234" }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

/* ======================= PELÍCULAS DE EJEMPLO =======================  */
if (peliculas.length === 0) {
    peliculas = [
        { id: 1, titulo: "Fuerza Final", genero: "Acción", director: "J. Carter", ano: 2024, calificacion: 8.2, descripcion: "Un agente enfrenta una amenaza global.", imagen: "https://picsum.photos/id/1011/400/300" },
        { id: 2, titulo: "Zona Roja", genero: "Acción", director: "L. Brown", ano: 2023, calificacion: 7.9, descripcion: "Misiones encubiertas en territorio hostil.", imagen: "https://picsum.photos/id/1015/400/300" },
        { id: 3, titulo: "Impacto Letal", genero: "Acción", director: "M. Stone", ano: 2025, calificacion: 8.5, descripcion: "Una carrera contra el tiempo.", imagen: "https://picsum.photos/id/1016/400/300" },

        { id: 4, titulo: "Vidas Cruzadas", genero: "Drama", director: "A. López", ano: 2022, calificacion: 8.7, descripcion: "Historias humanas que se entrelazan.", imagen: "https://picsum.photos/id/1025/400/300" },
        { id: 5, titulo: "El Último Otoño", genero: "Drama", director: "R. Méndez", ano: 2024, calificacion: 8.9, descripcion: "Reflexión sobre el paso del tiempo.", imagen: "https://picsum.photos/id/1035/400/300" },
        { id: 6, titulo: "Silencios", genero: "Drama", director: "C. Rivera", ano: 2023, calificacion: 8.1, descripcion: "Decisiones que cambian destinos.", imagen: "https://picsum.photos/id/1033/400/300" },

        { id: 7, titulo: "Vacaciones Inesperadas", genero: "Comedia", director: "P. Gómez", ano: 2023, calificacion: 7.8, descripcion: "Nada sale como estaba planeado.", imagen: "https://picsum.photos/id/1040/400/300" },
        { id: 8, titulo: "Mi Vecino es Raro", genero: "Comedia", director: "S. Torres", ano: 2022, calificacion: 7.5, descripcion: "Convivir nunca fue tan divertido.", imagen: "https://picsum.photos/id/1041/400/300" },
        { id: 9, titulo: "Risas a Domicilio", genero: "Comedia", director: "D. Ruiz", ano: 2024, calificacion: 8.0, descripcion: "Una comedia ligera.", imagen: "https://picsum.photos/id/1042/400/300" }
    ];

    localStorage.setItem("peliculas", JSON.stringify(peliculas));
}

/* ======================= LOGIN ======================= */
formLogin.addEventListener("submit", e => {
    e.preventDefault();

    const user = usuarios.find(u =>
        u.usuario === inputUser.value &&
        u.password === inputPassword.value
    );

    if (user) {
        localStorage.setItem("usuarioActivo", JSON.stringify(user));
        mostrarApp();
        renderPeliculas(peliculas);
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

/* ======================= LOGOUT ======================= */
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    location.reload();
});

/* ======================= MOSTRAR APP ======================= */
function mostrarApp() {
    loginSection.classList.add("d-none");
    mainContent.classList.remove("d-none");
    btnLogin.classList.add("d-none");
    btnLogout.classList.remove("d-none");
    btnAgregar.classList.remove("d-none");
}

/* ======================= GUARDAR ======================= */
btnGuardarPelicula.addEventListener("click", () => {
    const pelicula = {
        id: peliculaEditando ? peliculaEditando : Date.now(),
        titulo: inputTitulo.value,
        genero: inputGenero.value,
        director: inputDirector.value,
        ano: inputAno.value,
        calificacion: inputCalificacion.value,
        descripcion: inputDescripcion.value,
        imagen: inputImagen.value
    };

    if (peliculaEditando) {
        peliculas = peliculas.map(p => p.id === pelicula.id ? pelicula : p);
        peliculaEditando = null;
    } else {
        peliculas.push(pelicula);
    }

    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    renderPeliculas(peliculas);
    formPelicula.reset();
    bootstrap.Modal.getInstance(modalPelicula).hide();
});

/* ======================= RENDER ======================= */
function renderPeliculas(lista) {
    gridPeliculas.innerHTML = "";

    if (lista.length === 0) {
        sinResultados.classList.remove("d-none");
        return;
    }

    sinResultados.classList.add("d-none");

    lista.forEach(p => {
        const col = document.createElement("div");
        col.className = "col-md-3 col-sm-6";

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${p.imagen}" class="card-img-top" style="height:200px; object-fit:cover">
                <div class="card-body d-flex flex-column">
                    <h6>${p.titulo}</h6>
                    <span class="badge bg-secondary mb-2">${p.genero}</span>
                    <small>${p.director} (${p.ano})</small>
                    <small>⭐ ${p.calificacion}</small>

                    <div class="mt-auto d-flex justify-content-end gap-2">
                        <button class="btn btn-outline-warning btn-sm" onclick="editarPelicula(${p.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="eliminarPelicula(${p.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        gridPeliculas.appendChild(col);
    });

    renderSlider(lista);
}

/* ======================= SLIDER ======================= */
function renderSlider(lista) {
    carouselMovies.innerHTML = "";
    lista.slice(-5).reverse().forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.minWidth = "150px";

        card.innerHTML = `
            <img src="${p.imagen}" class="card-img-top" style="height:100px; object-fit:cover">
            <div class="card-body p-2">
                <small>${p.titulo}</small>
            </div>
        `;
        carouselMovies.appendChild(card);
    });
}

function scrollSlider(dir) {
    carouselMovies.scrollLeft += dir * 200;
}

/* =======================  BUSCADOR + FILTRO =======================  */
inputBuscar.addEventListener("input", filtrar);
selectGenero.addEventListener("change", filtrar);

function filtrar() {
    const texto = inputBuscar.value.toLowerCase();
    const genero = selectGenero.value;

    const filtradas = peliculas.filter(p =>
        p.titulo.toLowerCase().includes(texto) &&
        (genero === "" || p.genero === genero)
    );

    renderPeliculas(filtradas);
}

/* ======================= ELIMINAR ======================= */
function eliminarPelicula(id) {
    if (confirm("¿Eliminar película?")) {
        peliculas = peliculas.filter(p => p.id !== id);
        localStorage.setItem("peliculas", JSON.stringify(peliculas));
        renderPeliculas(peliculas);
    }
}

/* ======================= EDITAR ======================= */
function editarPelicula(id) {
    const p = peliculas.find(p => p.id === id);
    peliculaEditando = id;

    inputTitulo.value = p.titulo;
    inputGenero.value = p.genero;
    inputDirector.value = p.director;
    inputAno.value = p.ano;
    inputCalificacion.value = p.calificacion;
    inputDescripcion.value = p.descripcion;
    inputImagen.value = p.imagen;

    modalTitulo.innerText = "Editar Película";
    new bootstrap.Modal(modalPelicula).show();
}
