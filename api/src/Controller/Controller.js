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
        const result = await Promise.all(promesa.flat())
        return result
    } catch (error) {
        console.log(error, 'Error en el infoApi')
    }
};

const dbInfo = async () => {
    try {
        const db = await Videogame.findAll({
            includes: [{
                model: Genre,
                attributes: ['name']
            }],
            through: [{
                attributes: []
            }]
        })
        return db;
    } catch (error) {
        console.log(error, 'Error en la dbInfo')
    }
};

const allInfo = async () => {
    const apiInfo = await infoApi();
    const infoDb = await dbInfo();
    const infoAll = infoDb.concat(apiInfo);
    
    return infoAll;
};

const getByGame = async (game) => {
    try {
        const response = await axios(`https://api.rawg.io/api/games?search=${game}&key=43ab0952436047b1a77b4a696628fd5a&page_size=15`);
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
        const result = await Promise.all(promesa.flat())
        return result
    } catch (error) {
        console.log(error, 'Error en Get By Name');
    }
};

const getById = async (id) => {
    try {
        const resId = await allInfo();
        const result = resId.find((ele)=> ele.id == id);
        return result;
    } catch (error) {
        console.log(error, 'Error en GetById');
    }
};

const getGenres = async () => {
    const promise = await axios ('https://api.rawg.io/api/genres?key=43ab0952436047b1a77b4a696628fd5a');
    // console.log(promise)
    const genres = promise.data.results.map((ele) => {
        return {
            id: ele.id,
            name: ele.name,
        }
    });

    const subirEnDB = genres.map((ele) => {
        Genre.findOrCreate({
            where:{ 
                id: ele.id,
                name: ele.name
            }
        });
    });

    const allGenres = await Genre.findAll({
        attributes: ['name']
    })

    return allGenres

};


module.exports = {
    allInfo,
    getByGame,
    getById,
    getGenres
}