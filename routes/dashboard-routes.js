const router = require('express').Router();
const {getAllThoughts} = require('../controllers/dashboard-controller');
const withAuth = require('../utils/auth.js')

router
    .route('/', withAuth)
    .get(getAllThoughts)

module.exports = router;