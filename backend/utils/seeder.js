const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const products = require('../data/product.json');

// *configure Dotenv
dotenv.config({path:'backend/config/config.env'});

// *Database Connected
connectDatabase();

const seedProducts = async()=>{
    try {
        
        // ^ First Delete all the products
        await Product.deleteMany();
        console.log("Products Deleted");
        
        // ^ Then Add all the products
        await Product.insertMany(products);
        console.log("Products Added");
        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}
seedProducts();