const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router
    .use('/', homeRoutes)
    .use('/api', apiRoutes)    

module.exports = router;