const { Router } = require('express');
// Importar todos los routers;
const gamesRoute = require('./GamesRoute');
const genresRoute = require ('./GenreRoutes');
const platformsRoute = require('./PlatformRoute');


const router = Router();

// Configurar los routers
router.use('/videogames', gamesRoute);
router.use('/genres', genresRoute);
router.use('/platform', platformsRoute);


module.exports = router;
