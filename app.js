import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './config/db.js';
import { errorMiddleware } from './middleware/error.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import cloudinary from "cloudinary";


// routes
import userRoutes from './routes/User.js';
import adminRoutes from './routes/Admin.js';
import logo from './routes/LogoRoutes.js';
import banner from './routes/bannerRoutes.js';
import contact from './routes/ContactRoutes.js';
import sectionOne from './routes/SectionOneRoutes.js';
import sectionTwo from './routes/SectionTwoRoutes.js';
import sectionThree from './routes/SectionThreeRoutes.js';
import sectionFour from './routes/SectionFourRoutes.js';
import sectionFive from './routes/SectionFiveRoutes.js';
import sectionSix from './routes/SectionSixRoutes.js';



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

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api/v1/logo", logo);
app.use("/api/v1/banner", banner);
app.use("/api/v1/contact", contact);
app.use("/api/v1/section-one", sectionOne);
app.use("/api/v1/section-two", sectionTwo);
app.use("/api/v1/section-three", sectionThree);
app.use("/api/v1/section-four", sectionFour);
app.use("/api/v1/section-five", sectionFive);
app.use("/api/v1/section-six", sectionSix);






// errormiddleware
app.use(errorMiddleware)


app.listen(PORT, (req, res) => {
    console.log(`Server is running on port: ${PORT}`);
});


export { adminSecretKey };