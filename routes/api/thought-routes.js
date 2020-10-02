const router = require('express').Router();
const {
    gatherMyThoughts,
    thatRemindsMe,
    gottaWriteItDown,
    onSecondThought,
    ahForgetIt
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(gatherMyThoughts)
    .create(gottaWriteItDown);

router
    .route('/:thoughtId')
    .get(thatRemindsMe)
    .put(onSecondThought)
    .delete(ahForgetIt);

module.exports = router;
