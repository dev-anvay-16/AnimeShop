const express = require('express');

const path = require('path');

const rootDir = require('../util/path');

const adminData = require('./admin-routes');

const shopProductsController = require('../controllers/shop');

const routes = express.Router();

routes.get('/cart' ,shopProductsController.getCart);

routes.get('/checkout',shopProductsController.getCheckout);

routes.get('/shop',shopProductsController.getProductsPage);

routes.get('/shop/:productId',shopProductsController.getProductPage);

routes.post('/cart',shopProductsController.postCart);

routes.post('/cart-delete' , shopProductsController.postDeleteCartItem);

routes.get('/',shopProductsController.getHome);




module.exports = routes;