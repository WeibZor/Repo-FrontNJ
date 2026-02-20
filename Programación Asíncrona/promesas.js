let peliculas = [
    {
    "titulo": "Megalodon",
    "sinopsis": "Un tiburon que se come a la gente en una playa",
    "genero": "Acción, Aventura",
    "imagen": ""
    },

    {
    "titulo": "La llorona",
    "sinopsis": "Una mujer que perdio sus hijos",
    "genero": "Teror, Mieod",
    "imagen": "",
    },

    {
    "titulo": "El Padrino",
    "sinopsis": "El capo de la mafia Italiana",
    "genero": "Acción, Drama",
    "imagen": "",
    }
]

function ObtenerPeliculas(pelis) {
    // Simular retraso de 2 seg.
    return new Promise((resolve,reject) => {
        setTimeout(() => {
        // Validar si hay datos en la BD
        if (pelis.length == 0){
            reject("No se han encontrado películas")
        } else{
            resolve(pelis)
        }
        }, 2000)
    })

    // Esto es básicamnete para indicar a la consola que le espere 2000 milisegundos para mostrar los datos, ya que el proceso de obtener las peliculas es asincrono y tarda 2 segundos en completarse.
    // Ahora bien la Promise puede brindar dos respuestas dado positiva como negativa resolve o reject, en este caso se esta utilizando resolve para indicar que la promesa se ha cumplido y se han obtenido las peliculas, pero si por alguna razon no se pudieran obtener las peliculas se podria utilizar reject para indicar que la promesa no se ha cumplido y se ha producido un error.
}

// mostrar datos
//ObtenerPeliculas(peliculas)
//.then((d) => console.log(d))
//.catch((e) => console.log(e))

// Forma 2 - Async/Await

function getMovies(){
    try{
        let movies = await ObtenerPeliculas(peliculas);
        console.log(movies);    
    } catch(error){
        console.log(error);
    }
}

