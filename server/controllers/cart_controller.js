const swag = require('../models/swag');

module.exports = {
    add : (req, res) => {
        const id  = parseInt(req.query.id);
        const { cart } = req.session.user;
        const index = cart.findIndex(obj => obj.id === id);
        if (index === -1) {
            const item = swag.find(obj => obj.id === id);
            if (!item) {
                res.sendStatus(404);
                return;
            }
            cart.push(item);
            req.session.user.total += item.price;
        }
        res.status(200).json(req.session.user);
    },
    delete : (req, res) => {
        const id = parseInt(req.query.id);
        const { cart } = req.session.user;
        const index = cart.findIndex(obj => obj.id === id);
        if (index > -1) {
            req.session.user.total -= cart[index].price;
            req.session.user.cart = req.session.user.cart.slice().splice(index, 1);
            
        }
        res.status(200).json(req.session.user);
    },
    checkout : (req, res) => {
        const { id } = req.query;
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).json(req.session.user);
    }
}