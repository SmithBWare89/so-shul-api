const router = require('express').Router();
const {sendHomePage} = require('../controllers/home-controller');

router
    .route('/')
    .get(sendHomePage);

module.exports = router;