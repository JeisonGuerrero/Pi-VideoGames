const { Router } = require ('express');
const { allInfo, getByGame, getById } = require ('../Controller/Controller.js')
const { Videogame, Genre } = require('../db');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
routes.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            const query = await getByGame(name);
            query.length?
            res.status(200).send(query):
            res.status(404).send('Game not found');
        }else{
            const videogames = await allInfo();
            res.status(200).send(videogames)
        };
    } catch (error) {
        console.log(error, 'Error en el Get videogames')
    }
});

routes.get('/:id', async (req, res) => {
        const { id } = req.params;
        const query = await getById(id);
       if (query) {
        res.status(200).send(query);
       } else {
        res.status(404).send(' Id Not Found');
       }
});

routes.post('/', async (req, res) => {
    try {
        const {
            id,
            name,
            released,
            rating,
            plataforms,
            image,
            genre,
            description
        } = req.body;
        const newGame = await Videogame.create({
            id, 
            name, 
            released,
            rating,
            plataforms, 
            image,
            description
        });
        const newGenre = await Genre.findAll({
            where: { name: genre }
        })
    
        await newGame.addGenre(newGenre);
    
        res.status(200).send('Your Videogame has been created successfully');
    } catch (error) {
        console.log(error);
    }
});


module.exports = routes;
