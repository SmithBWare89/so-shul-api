const router = require('express').Router();
const {getAllThoughts} = require('../controllers/dashboard-controller');

router
    .route('/')
    .get(getAllThoughts)

module.exports = router;