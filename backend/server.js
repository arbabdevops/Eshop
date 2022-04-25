const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// *configure Dotenv
dotenv.config({path:'backend/config/config.env'});

// *Connection Database
connectDatabase();

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(process.env.PORT ,()=>{
    console.log(`Server Listening at Port http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})