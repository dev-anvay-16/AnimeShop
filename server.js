const express = require('express');
const body = require('body-parser');
const path = require('path');

const rootDir = require('./util/path');

const errorController = require('./controllers/error');

const db = require('./util/database');

const app = express();
app.set('view engine' , 'ejs');
app.set('views' , 'Views');

const adminRoute = require('./Routes/admin-routes');
const shopRoute = require('./Routes/shop-routes');

db.execute('SELECT * FROM products').then(content => {
   console.log(content);
}).catch(err => {
   console.log(err);
});


app.use(body.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoute.routes);
app.use(shopRoute);


app.use(errorController.error);

app.listen(6716);


