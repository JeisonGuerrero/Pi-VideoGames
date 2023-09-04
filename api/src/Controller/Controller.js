const axios = require('axios');
const { Genres, Videogames } = require('../db.js');
const { API_KEY } = process.env

const infoApi = async() => {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`
    let videojuegos = []
    try {
        for(let i=0; i<5; i++) { //con un for recorro mi API, ya que es un arreglo, 5 veces
            const info = await axios(url) //realizo la peticion
            //en mi .data podemos encontrar dos propiedades, results que es es aquello que voy a mapear            
            info.data.results.map(v => { //a la respuesta/resultado lo mapeo
                videojuegos.push({ //y pusheo en mi array vacio todo aquello que mapee
                    id: v.id,
                    name: v.name,
                    image: v.background_image,
                    rating: v.rating,
                    platforms: v.platforms?.map(el => el.platform.name),
                    genres: v.genres?.map(el => el.name),
                })
            });
            //y next que es donde voy a entrar para pasar a la siguente pagina.
            url = info.data.next
        }
        return videojuegos
        
    } catch(e) {
        console.log(e)
    }
};

//A MI DB
const infoDB = async () => {
    try {
        return await Videogames.findAll({ //SELECT * FROM Videogame 
            include: [{
                model: Genres, 
                atributes: ['name'], 
                throught: { 
                    attributes: [] 
                }
            }]
        })
    } catch(e) {
        console.error(e)
    }
}

//UNO MIS DOS SOLICITUDES
const getVideogames = async () => {
    //para unir mis dos solicitudes, guardo en una variable la ejecucion de mis funciones
    const apiData = await infoApi();
    const dbData = await infoDB();
    //ahora uno mis dos constantes contenedoras de funciones
    const infoCompleta = dbData.concat(apiData)
    return infoCompleta
}

const getByName = async (name) => {
    try {
        const response = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        const promesa = response.data.results.map(async ele => {
            const infoId = await axios(`https://api.rawg.io/api/games/${ele.id}?key=${API_KEY}`)
            const descriptions = infoId.data.description.replace(/<[^>]+>/ig, '');
            const description = descriptions.replace(/(\r\n|\n|\r)/gm, '');
            return {
                id: ele.id,
                name: ele.name,
                released: ele.released,
                rating: ele.rating,
                plataforms: ele.platforms.map(s => s.platform.name).toString(),
                image: ele.background_image,
                genres: ele.genres.map(s => s.name), //Esto es la relacion de los generos
                description,
            }
        })
        const result = await Promise.all(promesa.flat())
        return result
    } catch (error) {
        console.log(error, 'Error en Get By Name');
    }
};

const getGenres = async () => {
    const promise = await axios (`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = promise.data.results.map((ele) => {
        return {
            id: ele.id,
            name: ele.name,
        }
    });

    const subirEnDB = genres.map((ele) => {
        Genres.findOrCreate({
            where:{ 
                id: ele.id,
                name: ele.name
            }
        });
    });

    const allGenres = await Genres.findAll({
        attributes: ['name']
    })

    return allGenres

};


module.exports = {
    getByName,
    getGenres,
    getVideogames,
    infoDB
}