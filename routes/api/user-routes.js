const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createNewUser,
    updateExistingUser,
    deleteExistingUser,
    addNewFriend,
    deleteExistingFriend
} = require('../../controllers/user-controller');
const withAuth = require('../../utils/auth');

router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser);

router
    .route('/:userId')
    .get(getUserById)
    .put(updateExistingUser)
    .delete(deleteExistingUser);

router
    .route('/:userId/friends/:friendId')
    .post(addNewFriend)
    .delete(deleteExistingFriend);

module.exports = router;