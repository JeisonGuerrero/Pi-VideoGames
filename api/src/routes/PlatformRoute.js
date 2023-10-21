const { Router } = require ('express');
const { getPlatforms } = require('../Controller/Controller');

// import all controllers

const routes = new Router();

// Add routes
routes.get('/', async (req, res) => {
try {
    const response = await getPlatforms();
    res.status(200).send(response);
} catch (error) {
    res.status(404).send('Error en getPlatform');
}
});


module.exports = routes;

