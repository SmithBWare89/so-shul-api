const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createNewUser,
    updateExistingUser,
    deleteExistingUser
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .create(createNewUser);

router
    .route('/:userId')
    .get(getUserById)
    .put(updateExistingUser)
    .delete(deleteExistingUser);


module.exports = router;