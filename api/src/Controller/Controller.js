const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { ENDPOINT_GENERAL } = process.env;

const infoApi = async () => {
    try {
        const response = await axios(ENDPOINT_GENERAL);
        const promesa = response.data.results.map(async ele => {
            const infoId = await axios(`https://api.rawg.io/api/games/${ele.id}?key=43ab0952436047b1a77b4a696628fd5a`)
            const description = infoId.data.description.replace(/<[^>]+>/ig, '');
            return {
                id: ele.id,
                name: ele.name,
                released: ele.released,
                rating: ele.rating,
                plataforms: ele.platforms.map(s => s.platform.name),
                image: ele.background_image,
                genre: ele.genres.map(s => s.name),
                description
            }
        })
        const result = await Promise.all(promesa)
        return result
    } catch (error) {
        console.log(error, 'Error en el infoApi')
    }
};



module.exports = {
    infoApi,
}