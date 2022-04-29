const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');


// *Create New Product
exports.newProduct = async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

// *Get All Products
exports.getProducts = async (req,res,next)=>{

    const resultsPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter().pagination(resultsPerPage);
    // const products = await Product.find();
    const products = await apiFeatures.query;
    res.status(200).json({
        success:true,
        count:products.length,
        productCount,
        products
    })
}

// *Get Single Product
exports.getSingleProduct = async (req,res,next)=>{
    
    const product = await Product.findById(req.params.id);
   
    if(!product){
      return next(new ErrorHandler("Product not Found",404))
    }


    // if(!product){
    //    res.status(404).json({
    //         success:false,
    //         message:"Product Not Found"
    //     }) 
    // }
    res.status(200).json({
        success:true,
        product
    })
}

// *Delete Single Product
exports.deleteProduct = async (req,res,next)=>{
    
    const product = await Product.findById(req.params.id);
    if(!product){
       res.status(404).json({
            success:false,
            message:"Product Not Found"
        }) 
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product Deleted"
    })
}

// *Update Single Product
exports.updateProduct = async (req,res,next)=>{
    
    let product = await Product.findById(req.params.id);

    if(!product){
       res.status(404).json({
            success:false,
            message:"Product Not Found"
        }) 
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
}