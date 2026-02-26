
async function obtenerFotos() {
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/photos');
    const fotos = await respuesta.json();

    const primerasFotos = fotos.slice(0, 10);

    mostrarGaleria(primerasFotos);
  } catch (error) {
    console.error('Error al obtener las fotos:', error);
  }
}

function mostrarGaleria(fotos) {
  const galeria = document.getElementById('galeria');

  fotos.forEach(foto => {
    const div = document.createElement('div');
    div.classList.add('foto');

    div.innerHTML = `
      <img src="${foto.url}" alt="${foto.title}">
      <p>${foto.title}</p>
    `;

    galeria.appendChild(div);
  });
}

obtenerFotos();