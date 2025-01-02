const mongoose = require('mongoose');
const dotenv= require('dotenv')  // Load environment variables from .env file

dotenv.config({ path: "./config/dotenv.config" });


const URL = process.env.MONGOURL;

const connectDatabase = async ()=>{
        try {
          await mongoose.connect(URL)
          console.log("database connection is successfull")
            
        } catch (error) {
            console.log("database connection failed",error)
            process.exit(0)
            
        }
    }

module.exports = connectDatabase;
