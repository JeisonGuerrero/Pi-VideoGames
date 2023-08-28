const axios = require('axios');
const { Videogames, Genres } = require('../db');
const { API_KEY } = process.env

const getByGame = async (game) => {
    try {
        const response = await axios(`https://api.rawg.io/api/games?search=${game}&key=${API_KEY}&page_size=15`);
        const promesa = response.data.results.map(async ele => {
            const infoId = await axios(`https://api.rawg.io/api/games/${ele.id}?key=${API_KEY}`)
            const descriptions = infoId.data.description.replace(/<[^>]+>/ig, '');
            const description = descriptions.replace(/(\r\n|\n|\r)/gm, '');
            return {
                id: ele.id,
                name: ele.name,
                released: ele.released,
                rating: ele.rating,
                plataforms: ele.platforms.map(s => s.platform.name),
                image: ele.background_image,
                genres: ele.genres.map(s => s.name).toString(),
                description
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
    getByGame,
    getGenres
}