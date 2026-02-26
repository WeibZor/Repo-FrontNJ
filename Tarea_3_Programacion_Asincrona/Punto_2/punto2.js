    async function buscarClima() {
      const ciudad = document.getElementById('ciudad').value;
      const apiKey = 'ee9fa7850cb1aecd68c8a7652989ccc1';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

      try {
        document.getElementById('resultado').innerText = 'Consultando clima...';
        const res = await fetch(url);
        const data = await res.json();
        if (data.cod !== 200) {
          document.getElementById('resultado').innerText = 'Ciudad no encontrada';
          return;
        }
        document.getElementById('resultado').innerHTML = `
          <h2>${data.name}</h2>
          <p>Temperatura: ${data.main.temp} °C</p>
          <p>Clima: ${data.weather[0].description}</p>
        `;
      } catch (error) {
        document.getElementById('resultado').innerText = 'Error al consultar el clima';
      }
    }