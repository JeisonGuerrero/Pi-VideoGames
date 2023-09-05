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
          
            url = info.data.next
        }
        return videojuegos
        
    } catch(e) {
        console.log(e)
    }
};


const infoDB = async () => {
    try {
        return await Videogames.findAll({ 
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


const getVideogames = async () => {
    
    const apiData = await infoApi();
    const dbData = await infoDB();
   
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

const idApi = async (id) => {
    try {
        const infoApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        const descriptions = infoApi.data.description.replace(/<[^>]+>/ig, '');
        const description = descriptions.replace(/(\r\n|\n|\r)/gm, '');
        if(infoApi) {
            const ele = await infoApi.data
            const info = {
                id: ele.id,
                name: ele.name,
                image: ele.background_image,
                genres: ele.genres?.map(g => g.name),
                description,
                released: ele.released,
                rating: ele.rating,
                platforms: ele.platforms?.map(el => el.platform.name)

            }
            return info
        } else {
            return("No hay un videojuego con ese id")
        }

    } catch(e) {
        console.error(e)
    }
}

//A MI DB
const idDb = async (id) => {
    try {
    return await Videogames.findByPk(id, {
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
const videogameId = async (id) => {
    const dbID = id.includes("-")
    if(dbID) { 
        const gameDb = await idDb(id);
        return gameDb     
    } else {
        const gameApi = await idApi(id);
        return gameApi
   }
}


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
    videogameId,
    getGenres,
    getVideogames,
    infoDB
}