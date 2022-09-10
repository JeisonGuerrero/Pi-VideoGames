const { Router } = require ('express');
const { infoApi } = require ('../Controller/Controller.js')

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
routes.get('/', async (req, res) => {
    try {
        const games = await infoApi();
        res.status(200).send(games)
        
    } catch (error) {
        console.log(error, 'Error en el Get videogames')
    }
});
routes.get('/:id', async (req, res) => {
    res.status(200).send('Soy la ruta del get games by id')
});
routes.post('/', async (req, res) => {
    res.status(200).send('Soy la ruta del post games')
});


module.exports = routes;
