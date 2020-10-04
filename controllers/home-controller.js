const {User, Thought} = require('../models');

const homeController = {
    async sendHomePage(req, res) {
        try {
            req.session.username
                ? res.render("homepage", {
                        loggedIn: true
                })
                : res.render("homepage");
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

module.exports = homeController;