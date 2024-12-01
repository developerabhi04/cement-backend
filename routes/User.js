import express from "express";
import { deleteUser, formData, registerForm } from "../controller/User.js";
import { adminOnly } from "../middleware/auth.js";


const router = express.Router()

router.post("/submit", registerForm)

// router.use(adminOnly);

router.get("/form", formData);

router.delete("/admin/user/:id", deleteUser)



export default router;