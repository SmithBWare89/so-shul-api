const router = require('express').Router();
const {
    gatherMyThoughts,
    thatRemindsMe,
    gottaWriteItDown,
    onSecondThought,
    ahForgetIt,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

const withAuth = require('../../utils/auth');

// Get All Thoughts
router
    .route('/', withAuth)
    .get(gatherMyThoughts)
    .post(gottaWriteItDown);

// Get Thought By Id
router
    .route('/:thoughtId', withAuth)
    .get(thatRemindsMe);

// Update And Delete Thought
router
    .route('/:userId/:thoughtId', withAuth)
    .put(onSecondThought)
    .delete(ahForgetIt);

router
    .route('/:thoughtId/reactions', withAuth)
    .post(createReaction)

router
    .route('/:thoughtId/reactions/:reactionId', withAuth)
    .delete(deleteReaction)

module.exports = router;
