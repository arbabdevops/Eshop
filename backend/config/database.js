const mongoose = require('mongoose');

const connectDatabase =()=>{
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then((con)=>{
        console.log(`Database Connected with Host: ${con.connection.host}`);
    })
    .catch((e)=>{
    console.log("Database Not Connected"+e);
    });
}

module.exports = connectDatabase;