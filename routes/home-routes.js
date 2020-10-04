const router = require('express').Router();
const {sendHomePage, renderLogin, renderLogout, renderDashboard} = require('../controllers/home-controller');

router
    .route('/')
    .get(sendHomePage)

router
    .route('/homepage')
    .get(sendHomePage)

router
    .route('/login')
    .get(renderLogin)

router
    .route('/logout')
    .get(renderLogout)

router
    .route('/dashboard')
    .get(renderDashboard)

module.exports = router;