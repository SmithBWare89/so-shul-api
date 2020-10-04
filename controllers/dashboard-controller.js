const {User, Thought} = require('../models');

const dashboardController = {
    async getAllThoughts(req, res) {
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
                .sort({_id: -1}); //newest to oldest
            if (thoughtData) {
                const thoughts = thoughtData.map(thought => thought.get({plain: true}));
                res.render('dashboard', {
                    thoughts,
                    loggedIn: true
                });
            } else {
                res.render('dashboard', {
                    loggedIn: true
                });
            }
        } catch (error) {
            res.status(400).json(error);
        }
    },
    async createNewThought(req, res) {
        
    }
};

module.exports = dashboardController