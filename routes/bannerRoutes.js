import express from "express";
import { addBanner, getAllBanner, updateBanner, deleteBanner } from "../controller/bannerController.js";
import { adminOnly } from "../middleware/auth.js";



const router = express.Router();



router.get("/public/getbanner", getAllBanner);


router.post("/admin/addbanner", adminOnly, addBanner);
router.put("/admin/edit/:id", adminOnly, updateBanner);
router.delete("/admin/delete/:id", adminOnly, deleteBanner);


export default router;
