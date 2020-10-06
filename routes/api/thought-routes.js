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
    .route('/')
    .get(gatherMyThoughts)
    .post(gottaWriteItDown);

// Get Thought By Id
router
    .route('/:thoughtId')
    .get(thatRemindsMe);

// Update And Delete Thought
router
    .route('/:userId/:thoughtId')
    .put(onSecondThought)
    .delete(ahForgetIt);

router
    .route('/:thoughtId/reactions')
    .post(createReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)


module.exports = router;
