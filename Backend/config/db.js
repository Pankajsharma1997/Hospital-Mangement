require('dotenv').config()
const mongoose = require('mongoose')

// conecting to mongo db
const url = process.env.MONGO_CONNECTION_STRING 
const conDB = async()=> {
    try{
        const connectDB = await mongoose.connect(url);
        if(connectDB){
            console.log("connected to the database")
        }
        else {
            console.log("error => error");
        }
    }catch(error){
        console.log(`Error:${error.message}`);
    }
}
module.exports = conDB 



