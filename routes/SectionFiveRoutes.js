import express from "express";
import { addSectionFive, deleteSectionFive, getAllSectionFive, updateSectionFive } from "../controller/SectionFiveController.js";

const router = express.Router();


router.get("/public/get-all-section-five", getAllSectionFive);

router.post("/admin/add-section-five", addSectionFive);
router.put("/admin/update-section-five/:id", updateSectionFive);
router.delete("/admin/delete/:id", deleteSectionFive);


export default router;
