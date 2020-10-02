const {Thought} = require('../models');

const thoughtController = {
    async gatherMyThoughts(req, res){
        try{
            const thoughtData = await Thought.findAll({})
                .populate({path: 'username', select: ['username', '-__v']})
                .select('-__v')
            ;

            thoughtData
                ? res.status(200).json(thoughtData)
                : res.status(404).json({message: 'Cannot find that thought!'})
        } catch (err) {
            res.status(400).json(err)
        }
    };
    async thatRemindsMe(req, res){
        try{
            const thoughtData = await Thought.findOne(
                {
                    _id: req.params.thoughtId
                }
            )
            .populate({path: 'username', select: ['username', '-__v']})
            .select('-__v')

            thoughtData
                ? res.status(200).json(thoughtData)
                : res.status(404).json({message: 'Cannot find that thought!'})
        } catch (err) {
            res.status(400).json(err)
        }
    };
    async gottaWriteItDown(req, res){
        try{
            const thoughtData = await Thought.create(req.body)
            thoughtData
                ? res.status(200).json(thoughtData)
                : res.status(404).json({message: 'Cannot find that thought!'})
        } catch (err) {
            res.status(400).json(err)
        }
    };
    async onSecondThought(req, res){
        try{
            const thoughtData = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId
                },
                body,
                {
                    new: true,
                    runValidators: true
                }
            );

            thoughtData
                ? res.status(200).json(thoughtData)
                : res.status(404).json({message: 'Cannot find that thought!'})
        } catch (err) {
            res.status(400).json(err)
        }
    };
    async ahForgetIt(req, res){
        try{
            const thoughtData = await Thought.findOneAndDelete(
                {
                    _id: req.params.thoughtId
                }
            )
            thoughtData
                ? res.status(200).json(thoughtData)
                : res.status(404).json({message: 'Cannot find that thought!'})
        } catch (err) {
            res.status(400).json(err)
        }
    };
};

module.exports = thoughtController;