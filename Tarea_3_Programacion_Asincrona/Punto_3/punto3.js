const btnBuscar = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");

btnBuscar.addEventListener("click", buscarPokemon);

async function buscarPokemon() {
  const nombrePokemon = document
    .getElementById("pokemon")
    .value
    .toLowerCase();

  if (nombrePokemon === "") {
    resultado.innerHTML = "<p>Escribe el nombre o número de un Pokémon</p>";
    return;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }

    const data = await response.json();

    const tipos = data.types
      .map(tipo => `<span>${tipo.type.name}</span>`)
      .join("");

    const habilidades = data.abilities
      .map(habilidad => `<li>${habilidad.ability.name}</li>`)
      .join("");

    resultado.innerHTML = `
      <div class="card">
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        
        <p><strong>Tipos:</strong></p>
        <div class="types">${tipos}</div>

        <p><strong>Habilidades:</strong></p>
        <ul>${habilidades}</ul>

        <p><strong>HP:</strong> ${data.stats[0].base_stat}</p>
        <p><strong>Ataque:</strong> ${data.stats[1].base_stat}</p>
        <p><strong>Defensa:</strong> ${data.stats[2].base_stat}</p>
      </div>
    `;

  } catch (error) {
    resultado.innerHTML = "<p>Pokémon no encontrado 😢</p>";
  }
}