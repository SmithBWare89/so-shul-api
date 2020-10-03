const {User} = require('../models');
const Thought = require('../models/Thought');

const userController = {
    async getAllUsers(req, res) {
        try{
            const userData = await User
                .find({})
                .populate({
                    path: 'thoughts',
                    select: '-__v',
                    options: { 
                        sort: { 
                            _id: 1 
                        }
                    }
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: 1});

            res.status(200).json(userData);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async getUserById(req, res) {
        try{
            const userData = await User
                .findOne({_id: req.params.userId})
                .populate({ 
                    path: 'thoughts', 
                    select: '-__v', 
                    options: { 
                        sort: { 
                            _id: 1 
                        }
                    }
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v')

            !userData
                ? res.status(404).json({message: 'User not found!'})
                : res.status(200).json(userData);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async createNewUser(req, res) {
        try{
            const userData = await User.create(
                {
                    username: req.body.username, 
                    email: req.body.email
                }
            )
            !userData
                ? res.status(404).json({message: 'User not created!'})
                : res.status(200).json(userData);
        } catch(err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async updateExistingUser(req, res) {
        try{
            const userData = await User
                .findOneAndUpdate(
                    {
                        _id: req.params.userId
                    },
                    req.body,
                    {
                        new: true,
                        runValidators: true
                    }
                )
                .populate({ 
                    path: 'thoughts', 
                    select: '-__v', 
                    options: { 
                        sort: { 
                            _id: 1 
                        }
                    }
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v');

            !userData
                ? res.status(404).json({message: 'Cannot find the user you wish to update!'})
                : res.status(200).json(userData);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async deleteExistingUser(req, res) {
        try {
            // Find The User
            const findUser = await User.findOne(
                {
                    _id: req.params.userId
                }
            );

            if (!findUser) {
                res.status(404).json({message: 'Cannot find a User to delete!'});
            }

            // Delete all thoughts that match the username
            const deleteThoughts = await Thought.deleteMany(
                {
                    username: findUser.username
                }
            )

            if(!deleteThoughts) {
                res.status(404).json({message: 'Cannot find the thoughts to delete!'})
            };

            // Delete the user
            const deleteUsers = await User.findOneAndDelete(
                {
                    _id: req.params.userId
                }
            );

            deleteUsers
                ? res.status(404).json({message: 'Cannot find the user you wish to update!'})
                : res.status(200).json(deleteUsers);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async addNewFriend(req, res) {
        try{
            const friendData1 = await User.findOneAndUpdate(
                {
                    _id: req.params.userId
                },
                {
                    $addToSet: {
                        friends: req.params.friendId
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            .select('-__v');

            const friendData2 = await User.findOneAndUpdate(
                {
                    _id: req.params.friendId
                },
                {
                    $addToSet: {
                        friends: req.params.userId
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            .select('-__v');

            friendData1 && friendData2
                ? res.status(200).json({friendData1, friendData2})
                : res.status(404).json({ message: 'Unable to find the user you want to be friends with.' });
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async deleteExistingFriend(req, res) {
        try{
            const friendData1 = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }                
            );
            const friendData2 = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.userId } },
                { new: true }                
            );
            friendData1 && friendData2
                ? res.status(200).json(friendData1)
                : res.status(404).json({ message: 'Unable to find the user you want to unfriend.' });
        } catch(err) {
            res.status(400).json(err);
        }
    }
};

module.exports = userController;