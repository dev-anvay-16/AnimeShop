
const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getProductsPage = (req,res,next) => {
   Product.fetchAll(product => {
      res.render('Customer/product-list',{pageTitle : 'Shop' , products: product , path : '/shop'});
   });
};

exports.getProductPage = (req,res,next) => {
    const prodId = req.params.productId;  
        Product.findById(prodId, (particularProduct) => {
        res.render('Customer/product-details',{pageTitle : 'Shop' ,
        product: particularProduct ,
         //cart : cartProducts.products,
         //totalPrice : cartProducts.totalPrice,
        path : `/shop`});
        });   
};

exports.getHome = (req,res,next) => {
    Product.fetchAll(product => {
    res.render('Customer/home',{pageTitle : 'Home' , products: product , path : '/home'});
    });
};


exports.getCart = (req,res,next) => {
    Cart.fetchCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const CartProductData = cart.products.find(pro => pro.id === product.id);
                if(CartProductData){
                    cartProducts.push({productData:product , quantity : CartProductData.quantity});
                }
            }
            res.render('Customer/cart',{pageTitle : 'Cart'  , products : cartProducts , totalPrice : cart.totalPrice , path : '/cart'});
        })
    })  
};

exports.postDeleteCartItem = (req,res,next) => {
    const id = req.body.productId;
    Cart.deleteProductFromCart(id);
    res.redirect('/cart');
}

exports.postCart = (req,res,next) => {
    const prodId = req.body.prodId;
    Product.findById(prodId , product => {
        Cart.findProduct(product);
    })
    res.redirect('/cart');
};

exports.getCheckout = (req,res,next) => {
    res.render('Customer/checkout',{pageTitle : 'Checkout' , products: product , path : '/checkout'});
}






