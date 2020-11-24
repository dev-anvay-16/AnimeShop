const mysql = require('mysql2');

const pool = mysql.createPool({
   host:'localhost',
   user:'root',
   database:'ecommerceapplication',
   password:'condensed'
});

module.exports = pool.promise();