const swag = require('../models/swag');

module.exports = (req, res, next) => {
    const { category } = req.query;
    const filter = swag.filter(s => s.category === category);
    filter ? res.status(200).json(filter) : res.status(200).json(swag);
}