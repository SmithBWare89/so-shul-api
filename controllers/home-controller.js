const {User, Thought} = require('../models');
const bcrypt = require('bcrypt');

const homeController = {
    async sendHomePage(req, res) {
        try {
            req.session.loggedIn
                ? res.render("homepage", {
                        loggedIn: true
                })
                : res.render("homepage");
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async renderLogin(req, res) {
     try {
         req.session.loggedIn
            ? res.redirect('/dashboard', {
                loggedIn: true
            })
            : res.status(200).render("login");
     } catch (error) {
         res.status(400).json(error);
     }
    },
    async renderSignup(req, res) {
        try {
            req.session.loggedIn
               ? res.redirect('/dashboard', {
                   loggedIn: true
               })
               : res.status(200).render("signup");
        } catch (error) {
            res.status(400).json(error);
        }
       },
    async renderLogout(req, res) {
     try {
         res.status(200).render("homepage");
     } catch (error) {
         res.status(400).json(error);
     }
    },
    async renderDashboard(req, res) {
        try {
            const thoughtData = await Thought
                .find(
                    {
                        username: req.session.username
                    }
                )
                .populate(
                    {
                        path: 'reactions',
                        select: '-__v'
                    }
                )
                .select('-__v')
                .lean()
                .sort({_id: -1}); //newest to oldest

            if (thoughtData.length > 0) {
                res.render("dashboard", {
                    thoughtData,
                    loggedIn: true
                });
            } else {
                res.render("dashboard", {
                    loggedIn: true
                });
            }
        } catch (error) {
            res.status(400).json(error);
        }
    },
    async loginUser(req, res) {
        try {
            const userData = await User
                .findOne(
                    {
                        email: req.body.email
                    }
                )
                .populate({path: 'friends', select: '-__v', sort: {_id: -1}})
                .populate({path: 'thoughts', select: '-__v',  sort: {_id: -1}})
                .select('-__v');
            
            // If not in DB the notify user
            if (!userData) {
                res.status(400).json(
                    {
                        message: 'No user account found!'
                    }
                );
                return;
            };
            
            bcrypt.compare(req.body.password, userData.password, (err, result) => {
                if (result) {
                    req.session.user_id = userData._id;
                    req.session.username = userData.username;
                    req.session.loggedIn = true;
                    req.session.save(() => {});
                    
                    res.status(200).render("dashboard", {
                        loggedIn: true
                    });
                } else {
                    res.status(404).json({message: 'You have entered an invalid password.'});
                }
            });
        } catch (error) {
            res.status(400).json(error);
        }
    },
    async logoutUser(req, res) {
        try {
            if (req.session.loggedIn) {
                req.session.destroy(() => {
                    res.status(204).end();
                })
            } else {
                res.status(404).end();
            }
        } catch (error) {
            res.status(400).json(error);
        }
    },
    async deleteUser(req, res) {
        try {
            // Find The User
            const findUser = await User.findOne(
                {
                    _id: req.session.user_id
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
                    _id: req.session.user_id
                }
            );

            if (deleteUsers) {
                req.session.destroy(() => {
                    res.status(204).end();
                })
            } else {
                res.status(404).json({message: 'Cannot find the user you wish to update!'})
            }
        } catch(err) {
            res.status(400).json(err);
        }
    },
    async createNewUser(req, res) {
        try{
            const userData = await User.create(
                {
                    username: req.body.username, 
                    email: req.body.email,
                    password: req.body.password
                }
            );
            if (userData) {
                req.session.save(() => {
                    req.session.username = userData.username;
                    req.session.user_id = userData._id;
                    req.session.loggedIn = true;
                    res.json(userData);
                })
            };
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createNewThought(req, res){
        try{
            const thoughtData = await Thought
                .create(
                    {
                        thoughtText: req.body.thoughtText,
                        username: req.session.username
                    }
                );

            const userUpdate = await User
                .findOneAndUpdate(
                    {
                        _id: req.session.user_id
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
    async deleteNewThought(req, res){
        try{
            const thoughtData = await Thought
                .findOneAndDelete(
                    {
                        _id: req.body.thoughtId
                    }
                );
            
            if(!thoughtData){
                res.status(404).json({ message: 'No thought with this ID!' });
            }

            const userUpdate = await User
                .findOneAndUpdate(
                    { _id: req.session.user_id },
                    { $pull: { thoughts: req.body.thoughtId } },
                    { new: true }
                )
                .select('-__v');

            userUpdate
                ? res.status(200).json(userUpdate)
                : res.status(404).json({message: 'Cannot find a user that matches that thought!'});
        } catch (err) {
            res.status(400).json(err)
        }
    },
}

module.exports = homeController;