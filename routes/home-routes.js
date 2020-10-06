const router = require('express').Router();
const {sendHomePage, renderLogin, renderLogout, renderDashboard, renderSignup, loginUser, logoutUser, deleteUser, createNewUser, createNewThought} = require('../controllers/home-controller');
const withAuth = require('../utils/auth');

router
    .route('/')
    .get(sendHomePage)

router
    .route('/homepage')
    .get(sendHomePage)

router
    .route('/login')
    .get(renderLogin)
    .post(loginUser)

router
    .route('/signup')
    .get(renderSignup)
    .post(createNewUser)

router
    .route('/logout', withAuth)
    .get(renderLogout)
    .post(logoutUser)

router
    .route('/dashboard', withAuth)
    .get(renderDashboard)
    .post(createNewThought)
    .delete(deleteUser)

module.exports = router;