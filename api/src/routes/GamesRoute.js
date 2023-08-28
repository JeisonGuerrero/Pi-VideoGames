const { Router } = require ('express');
const { getByGame } = require ('../Controller/Controller.js')
const { Videogames, Genres } = require('../db');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
routes.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        const videogames = await Videogames.findAll( {
            include: [{
                model: Genres,
                attributes: ["name"],
            }]
        });

        if ( !videogames.length && !name ) {
            try {
                const response = await getByGame();
                const subirEnDb = await Videogames.bulkCreate( response );
                res.status( 200 ).send( subirEnDb )
            } catch (error) {
                console.log( 'Error en primer condicional', error );    
            }
        }

        if (name && videogames.length) {
            try {
                const game = await Videogames.findAll( { 
                    where:{
                        name: { [substing]: name }
                    },
                    include: [{
                        model: Genres,
                        attributes: ["name"],
                        through: { attributes: [] }
                    }]
                });

                game.length ? res.status( 200 ).send( game ) : res.status( 400 ).send( "Videogame not found" );

            } catch (error) {
                console.log( 'Error en segundo condicional' )
            }
        }

        if (!name && videogames.length) {
            try {
                res.status( 200 ).send( videogames )                
            } catch (error) {
                console.log( 'Error en tercer condicional' )
            }
        }

    } catch (error) {
        console.log(error, 'Error en el Get videogames')
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
            genres,
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
