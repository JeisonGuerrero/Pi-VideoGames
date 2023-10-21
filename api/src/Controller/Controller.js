const axios = require('axios');
const { Genres, Videogames } = require('../db.js');
const { API_KEY } = process.env

const infoApi = async() => {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`
    let videojuegos = []
    try {
        for(let i=0; i<5; i++) {
            const info = await axios(url) 
            info.data.results.map(v => { 
                videojuegos.push({ 
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
        console.log(e)
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
        console.log(e)
    }
}

//UNO MIS DOS SOLICITUDES
const videogameId = async (id) => {
        const gameDb = await idDb(id);
        if(!gameDb){
            const gameApi = await idApi(id);
            console.log(gameApi)
            return gameApi;
        } else {
            return gameDb;
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

const getPlatforms = async () => {
    const promise = await axios (`https://api.rawg.io/api/platforms?key=${API_KEY}`);
    const platforms = promise.data.results.map((ele) => {
        return {
            id: ele.id,
            name: ele.name,
        }
    });

    return platforms

};


module.exports = {
    getByName,
    videogameId,
    getGenres,
    getVideogames,
    infoDB,
    getPlatforms,
}