const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');
const searchController = require('./controllers/search_controller');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true
}));
app.use(checkForSession);

const swagBaseUrl = '/api/swag';
app.get( swagBaseUrl, swagController.read );

app.post( '/api/login', authController.login);
app.post( '/api/register', authController.register);
app.post( '/api/signout', authController.signOut);
app.get( '/api/user', authController.getUser);

const cartBaseURL = '/api/cart';
app.post( cartBaseURL, cartController.add);
app.post( cartBaseURL + '/checkout', cartController.checkout );
app.delete( cartBaseURL, cartController.delete);

app.get('/api/search', searchController);

const SERVER_PORT = process.env.SERVER_PORT || 3000;
app.listen(SERVER_PORT, () => console.log('Listening on port:', SERVER_PORT));