const { Router } = require('express');
// Importar todos los routers;
const gamesRoute = require('./GamesRoute');
const genresRoute = require ('./GenreRoutes');


const router = Router();

// Configurar los routers
router.use('/videogames', gamesRoute);
router.use('/genres', genresRoute);


module.exports = router;
