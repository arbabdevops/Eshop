const express = require('express');
const app = express();
app.use(express.json());
const errorMiddleware = require('./middlewares/errors');


// *ALl routes
const products = require('./routes/product');
app.use('/api/v1',products);

// *Middleware to handle Errors
app.use(errorMiddleware);

module.exports = app;
