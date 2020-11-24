const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const adminAddProductController = require('../controllers/admin');

const routes = express.Router();

routes.get('/add-product' ,adminAddProductController.getAddProductPage);

routes.get('/products',adminAddProductController.getProductsPage);


routes.get('/edit-product/:productId',adminAddProductController.getEditProductPage);

routes.post('/edit-product' , adminAddProductController.postEditProductPage);

routes.post('/add-product' ,adminAddProductController.postAddProductPage);

routes.post('/delete-product' , adminAddProductController.postDelete );

exports.routes = routes;
