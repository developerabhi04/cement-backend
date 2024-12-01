import express from "express";
import { adminLogin, adminLogout, getAdminData, getDashboardStats } from "../controller/Admin.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();


router.post("/verify", adminLogin);

router.get("/logout", adminLogout);

router.use(adminOnly);

router.get("/", getAdminData)

router.get("/stats", getDashboardStats);





export default router;