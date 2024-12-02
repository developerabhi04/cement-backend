import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './config/db.js';
import { errorMiddleware } from './middleware/error.js';
import cookieParser from 'cookie-parser';
import cors from "cors";


// routes
import userRoutes from './routes/User.js';
import adminRoutes from './routes/Admin.js';



dotenv.config({
    path: "./config/.env",
})

const app = express();
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;
const FURL = process.env.FRONTEND_URL;
const adminSecretKey = process.env.ADMIN_SECRET_KEY;

// database
connectDb(uri);


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: FURL,
    methods: ["POST, GET, PUT, DELETE"],
    credentials: true,
}))


app.get("/", (req, res) => {
    res.send("Hello World!");
});



// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);






// errormiddleware
app.use(errorMiddleware)


app.listen(PORT, (req, res) => {
    console.log(`Server is running on port: ${PORT}`);
});


export { adminSecretKey };