const swag = require('../models/swag'); // array of swag

module.exports = {
    read : (req, res) => {
        res.status(200).json(swag);
    },

}