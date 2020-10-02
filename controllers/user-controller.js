const {User} = require('../models');

const userController = {
    async getAllUsers(req, res) {
        try{
            const userData = await User.findAll({})
                .populate({
                    path: 'thought',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: desc});

            !userData
                ? res.status(404).json({message: 'No users found!'})
                : res.status(200).json(userData);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async getUserById(req, res) {
        try{
            const userData = await User.findOne(
                {
                    _id: req.params.id
                }
            )
            .populate({ path: 'thoughts', select: '-__v', options: { 'createdAt': desc }})
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
            const userData = await User.create(req.body);
            !userData
                ? res.status(404).json({message: 'User not found!'})
                : res.status(200).json(userData);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async updateExistingUser(req, res) {
        try{
            const userData = await User.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                body,
                {
                    new: true,
                    runValidators: true
                }
            );

            !userData
                ? res.status(404).json({message: 'Cannot find the user you wish to update!'})
                : res.status(200).json(userData);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async deletedExistingUser(req, res) {
        try {
            const userData = await User.findOneAndDelete(
                {
                    _id: req.params.id
                }
            );

            !userData
                ? res.status(404).json({message: 'Cannot find the user you wish to update!'})
                : res.status(200).json(userData);
        } catch(err) {
            res.status(400).json(err);
        }
    },
    // async addNewFriend(req, res) {
    //     try{

    //     } catch(err) {
    //         res.status(400).json(err);
    //     }
    // },
    // async deleteExistingFriend(req, res) {
    //     try{
            
    //     } catch(err) {
    //         res.status(400).json(err);
    //     }
    // }
};

module.exports = userController;