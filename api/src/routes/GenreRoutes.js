const { Router } = require ('express');
const { getGenres } = require ('../Controller/Controller.js')

const routes = new Router();

// Add routes
routes.get('/', async (req, res) => {
    try {
        const response = await getGenres();
        res.status(200).send(response)
    } catch (error) {
        console.log(error, 'Error en el Get Genre')
    }
});

module.exports = routes;
