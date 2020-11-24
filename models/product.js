const rootDir = require('../util/path');
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');


const location = path.join(rootDir , 'data' , 'products.json');


const getProductFromFile = cb => {

   fs.readFile(location , (err,content) => {
      if(err){
         cb([]);
      }
      else{
         cb(JSON.parse(content));
      }
   });
};

module.exports = class Product{

   constructor(details){
      this.details = details;
   }

   save(){
      this.prop = {
         id:(Math.floor(Math.random()*1000)+1).toString(),
         title:this.details.prodName,
         description:this.details.prodDescription,
         imageUrl : this.details.prodImageUrl,
         price : this.details.prodPrice,
         year:this.details.prodSeason,
      };

      getProductFromFile(product => {
            product.push(this.prop);
            fs.writeFile(location,JSON.stringify(product),(err) => {
         });   
   });}

   static deleteProduct(id){

      getProductFromFile(products => {
         const remove = products.filter(product => product.id !== id);
         const updated = [...remove];
         fs.writeFile(location,JSON.stringify(updated) , (err) => {
            if(!err){
               const Cart = require('./cart');
               console.log(true);
               Cart.deleteProductFromCart(id);
            }
         });
      });

   };

    static updateProduct(Uproduct){

      getProductFromFile(product => {

         const exist = product.findIndex(prod => prod.id === Uproduct.prodId);
         const updated =[ ...product];
         updated[exist].title = Uproduct.prodName; 
         updated[exist].description = Uproduct.prodDescription;
         updated[exist].imageUrl = Uproduct.prodImageUrl;
         updated[exist].price = Uproduct.prodPrice;
         updated[exist].year = Uproduct.prodSeason;

         fs.writeFile(location , JSON.stringify(updated) , (err) => {
            console.log(err);
         });
      });
   }

   static fetchAll(cb){
     getProductFromFile(cb);
   }

   static findById(id,cb){
      getProductFromFile(products => {
         const product = products.find(prod => prod.id === id);
         cb(product);
      });
   }
};

