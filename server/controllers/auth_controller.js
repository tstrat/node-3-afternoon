const users = require('../models/users');

// user =  { id: int, username: string, password: string }

let id = 1;

module.exports = {
    login: (req, res) => {
        const { username, password } = req.body;
        let currentUser = null;
        currentUser = users.find(user => user.username === username && user.password === password);
        if (!currentUser) {
            res.sendStatus(500);
        } else {
            console.log(req.session.user);
            console.log(currentUser);
            req.session.user.username = currentUser.username;
            res.status(200).json(req.session.user);
        }
    },
    register: (req, res) => {
        const { username, password } = req.body;
        users.push({
            id,
            username,
            password
        });
        id++;
        req.session.user.username = username;
        res.status(200).json(req.session.user);
    },
    signOut: (req, res) => {
        req.session.destroy();
        res.status(200).json(req.session);
    },
    getUser: (req, res) => {
        res.status(200).json(req.session.user);
    }
}