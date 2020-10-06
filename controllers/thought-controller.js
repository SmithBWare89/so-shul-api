const {Thought, User} = require('../models');

const thoughtController = {
    // Get All Thoughts
    async gatherMyThoughts(req, res){
        try{
            const thoughtData = await Thought
                .find({})
                .select('-__v')
                .sort({ _id: 1 });

            thoughtData
                ? res.status(200).json(thoughtData)
                : res.status(404).json({message: 'Cannot find that thought!'})
        } catch (err) {
            res.status(400).json(err)
        }
    },
    // Get Thought By Id
    async thatRemindsMe(req, res){
        try{
            const thoughtData = await Thought
                .findOne(
                    {
                        _id: req.params.thoughtId
                    }
                )
                .select('-__v');

            thoughtData
                ? res.status(200).json(thoughtData)
                : res.status(404).json({message: 'Cannot find that thought!'})
        } catch (err) {
            res.status(400).json(err)
        }
    },
    // Create A New Thought
    async gottaWriteItDown(req, res){
        try{
            const thoughtData = await Thought
                .create(
                    {
                        thoughtText: req.body.thoughtText,
                        username: req.body.username
                    }
                );

            const userUpdate = await User
                .findOneAndUpdate(
                    {
                        _id: req.body.userId
                    },
                    {
                        $push: {
                            thoughts: thoughtData._id
                        }
                    },
                    {
                        new: true
                    }
                )
                .select('-__v -password');

            userUpdate
                ? res.status(200).json(userUpdate)
                : res.status(404).json({ message: 'Cannot find that user!' });
        } catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    },
    // Update A Thought
    async onSecondThought(req, res){
        try{
            const userData = await User
                .find(
                    {
                        _id: req.params.userId
                    }
                )
                .select('-__v');

            if(userData) {
                const thoughtData = await Thought
                    .findOneAndUpdate(
                        {
                            _id: req.params.thoughtId
                        },
                        req.body,
                        {
                            new: true,
                            runValidators: true
                        }
                    )
                    .select('-__v');

                thoughtData
                ? res.status(200).json(thoughtData)
                : res.status(404).json({message: 'Cannot find that thought!'})
            } else {
                res.status(404).json({ message: 'Cannot find a user with that ID!'});
            }
        } catch (err) {
            res.status(400).json(err)
        }
    },
    // Delete A Thought
    async ahForgetIt(req, res){
        try{
            const thoughtData = await Thought
                .findOneAndDelete(
                    {
                        _id: req.params.thoughtId
                    }
                );
            
            if(!thoughtData){
                res.status(404).json({ message: 'No thought with this ID!' });
            }

            const userUpdate = await User
                .findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
                .select('-__v');

            userUpdate && thoughtData
                ? res.status(200).json(userUpdate)
                : res.status(404).json({message: 'Cannot find a user that matches that thought!'});
        } catch (err) {
            res.status(400).json(err)
        }
    },
    async createReaction(req, res){
        try {
            const reactionData = await Thought
                .findOneAndUpdate(
                    {
                        _id: req.params.thoughtId
                    },
                    {
                        $push: {
                            reactions: req.body
                        }
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                )
                .select('-__v');
                
            reactionData
                ? res.status(200).json(reactionData)
                : res.status(404).json({ message: 'Cannot find the thought you are reacting to.'});
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async deleteReaction(req, res){
        try {
            const reactionData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            
            reactionData
                ? res.status(200).json(reactionData)
                : res.status(404).json(reactionData);
        } catch(err) {
            res.status(400).json(err);
        }
    }
};

module.exports = thoughtController;