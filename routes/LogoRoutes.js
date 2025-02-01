import express from "express";
import { addLogo, deleteLogo, getAllLogos, updateLogo } from "../controller/LogoController.js";


const router = express.Router();


router.get("/public/getlogo", getAllLogos);

router.post("/admin/addlogo", addLogo);

router.put("/admin/edit/:id", updateLogo);
router.delete("/admin/delete/:id", deleteLogo);


export default router;
