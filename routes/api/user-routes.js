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
    .route('/', withAuth)
    .get(getAllUsers)
    .post(createNewUser);

router
    .route('/:userId', withAuth)
    .get(getUserById)
    .put(updateExistingUser)
    .delete(deleteExistingUser);

router
    .route('/:userId/friends/:friendId', withAuth)
    .post(addNewFriend)
    .delete(deleteExistingFriend);

module.exports = router;