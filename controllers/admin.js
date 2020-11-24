const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getAddProductPage =  (req,res,next) => {
  res.render('Admin/edit-product',{pageTitle:"Add Product" , path: "/admin/add-product" , editMode : false})};

exports.postAddProductPage =  (req,res,next) => {
   const product = new Product(req.body);
   product.save();
   res.redirect('/');
};

exports.getEditProductPage =  (req,res,next) => {
   const editMode = req.query;
   const prodId = req.params.productId;
   Product.findById(prodId , (product) => {
      res.render('Admin/edit-product',{pageTitle:"Edit Product" , path: "/admin/edit-product" , editMode : editMode , product : product})
   })

  };

exports.postEditProductPage = (req,res,next) => {
   const prod = req.body;
   Product.updateProduct(prod);
   res.redirect('/');

}  

exports.postDelete = (req,res,next) => {
   const prodId = req.body.productId;
   Product.deleteProduct(prodId);
 
   res.redirect('/');
}

exports.getProductsPage = (req,res,next) => {
   Product.fetchAll(product => {
      res.render('Admin/products',{pageTitle : 'Admin Products' , products: product , path : '/admin/products'});
   });
};

