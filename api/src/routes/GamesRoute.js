const { Router } = require ('express');
const { getVideogames, infoDB, getByName, videogameId } = require ('../Controller/Controller.js')
const { Videogames, Genres } = require('../db.js');

const routes = new Router();

// Add routes
routes.get('/', async (req, res) => {
    const { name } = req.query; //el nombre me llega por query
    let allVideogames = await getVideogames()

    if(name) { 
        try { 
            const foundGamesAPI = await getByName(name)
            const gamesByNameDB = await infoDB()
            let foundGamesDB =  gamesByNameDB.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            let allResults = foundGamesDB.concat(foundGamesAPI)
            allResults.length ? res.status(200).send(allResults.slice(0,15)) : res.status(400).send('Videogame not found')

        } catch(err) {
            console.error(err)
        }
    }
    else {
        res.send(allVideogames)
        return
    }
});

routes.get('/:id', async (req, res) => {
        
    const { id } = req.params;

    let data = await videogameId(id)

    try {
        data ? res.send(data) : res.status(404).send('El id ingresado no coincide con un videojuego en particular')

    } catch(error) {
        console.log(error);
    }

});

routes.post('/', async (req, res) => {
    try {
        const {
            name,
            released,
            rating,
            plataforms,
            image,
            genres,
            description
        } = req.body;
        const newGame = await Videogames.create({
            name, 
            released,
            rating,
            plataforms, 
            image,
            description,
        });
        const newGenre = await Genres.findAll({
            where: { name: genres }
        })
    
        await newGame.addGenres(newGenre);
    
        res.status(200).send(newGame);
    } catch (error) {
        console.log(error);
    }
});


module.exports = routes;
