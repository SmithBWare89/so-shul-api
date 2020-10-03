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

// Get All Thoughts
router
    .route('/')
    .get(gatherMyThoughts)

// Create A New Thought
router
    .route('/:userId')
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
