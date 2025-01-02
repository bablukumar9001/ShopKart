const app = require("./app")
const dotenv = require("dotenv");
const connectDatabse = require("./database/db")

const cloudinary = require("cloudinary")


process.on("uncaughtException", (err)=>{
     console.log(`Error ${err.message}`);
     console.log("shuting down the server due to uncaught exception")
     process.exit(1)
})


dotenv.config({ path: "./config/dotenv.config" });

// connection to database

connectDatabse()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  

const port = process.env.PORT || 8000;



const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//undhandled  promise rejection
   
process.on('unhandledRejection', (err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`sutting down the server due to Unhandled Promise Rejection`);
    
    server.close(()=>{
         process.exit(1)
    })
      
})
