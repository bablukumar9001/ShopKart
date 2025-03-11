const express = require("express")
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser")
const cors = require('cors');
const bodyparser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");
dotenv.config({ path: "./config/dotenv.config" });



app.use(express.json());
app.use(cookieParser())


// Define allowed origins dynamically

const allowedOrigins = [
  "http://localhost:5176" ||"http://localhost:5173", // Frontend (Development)
  process.env.FRONTEND_URL, // Frontend (Deployed)
];



// console.log("Allowed Origins:", allowedOrigins);

// CORS Options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  credentials: true, // Allow cookies
};


// Middleware
app.use(cors(corsOptions));
app.use(bodyparser.urlencoded({extended:true}))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
)

// route imports

const productRoute = require("./Routes/product")
const userRoute = require("./Routes/userRoute")
const orderRoute = require("./Routes/orderRoute")
const payment = require("./Routes/paymentRoute");

//test route 

app.get("/",(req,res)=>{
  res.status(200).send("Hello, welcome to the Shopkart API's")
})


app.use("/api/v1",productRoute)

app.use("/api/v1",userRoute)
app.use("/api/v1",orderRoute)
app.use("/api/v1",payment)

// middleware for Errors



app.use(errorMiddleware)


module.exports = app