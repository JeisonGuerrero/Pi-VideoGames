const { Router } = require ('express');
const { getVideogames, infoDB, getByName } = require ('../Controller/Controller.js')
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
            next(err)
        }
    }
    else {
        res.send(allVideogames)
        return
    }
});

routes.get('/:id', async (req, res) => {
        
    const { id } = req.params;

    try {
        const game = await Videogames.findByPk( id, 
            {
                include: [{
                    model: Genres,
                    attributes: ["name"],
                    through: { attributes: [] }
                }]
            });
         !game ? res.status( 404 ).send( "Id not found" ) : res.status( 200 ).send( game );
    } catch (error) {
        console.log( 'Error en getById', error);
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
