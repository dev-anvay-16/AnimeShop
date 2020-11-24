const rootDir = require('../util/path');
const fs = require('fs');
const path = require('path');

const Product = require('./product');

const locationCart = path.join(rootDir , 'data' , 'Cart.json');

module.exports = class Cart{

   static deleteProductFromCart(id ){
      // content read 
      fs.readFile(locationCart ,(err,content) => {
         if(err){
            return;
         }
         let updatedProduct = [...JSON.parse(content)];
         //check whether element in the cart is present in product or not
         const ans = updatedProduct.find(prod => prod.id === id);
         if(!ans){
            return;
         }
         // if not pop that item from cart too
         updatedProduct = updatedProduct.filter(prod => prod.id !== id);
         fs.writeFile(locationCart , JSON.stringify(updatedProduct) , (err) => {
            console.log(err);

         });
      });
   };


   static findProduct(prod){
      fs.readFile(locationCart , (err,content) => {
         let product = [];
         if(!err){
            product = JSON.parse(content);
         }
         // * whether the element is present in the cart or not
         let updated = product;
         const prodAvailable = updated.findIndex(me => me.id == prod.id);
      
         // * if not then add product in json file
         if(prodAvailable === 0 || prodAvailable > 0 ){
            updated[prodAvailable].quantity +=1;
         } 
          // * if present then increment the quantity
         else{
             const prop = {
               id : prod.id,
               price:prod.price,
               quantity : 1,
            }
            updated.push(prop);
            console.log(updated);
         }
         fs.writeFile(locationCart, JSON.stringify(updated) , (err) => {
            console.log(err);
         })
      })
   }

   static fetchCart(cb , name){
      console.log(name);
      fs.readFile(locationCart , (err,c)=>{
         if(err)
         {
            cb([]);
         }
         const prod = JSON.parse(c);

         let sum = 0;
         
         prod.forEach(prod => {
            sum += parseInt(prod.price)*(prod.quantity);
         });
         const priceQ = {products : [...JSON.parse(c)] , totalPrice : sum }
         cb(priceQ);
      });
   }


}