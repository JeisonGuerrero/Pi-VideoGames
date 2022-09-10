const { Router } = require ('express');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
routes.get('/', async (req, res) => {
    res.status(200).send('Soy el get de genres')
});

module.exports = routes;
