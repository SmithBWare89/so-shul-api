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
    async renderLogout(req, res) {
     try {
         res.status(200).render("homepage");
     } catch (error) {
         res.status(400).json(error);
     }
    },
    async renderDashboard(req, res) {
        try {
            res.status(200).render("dashboard");
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

module.exports = homeController;