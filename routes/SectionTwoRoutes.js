import express from "express";
import { addSectionTwo, deleteSectionTwo, getAllSectionTwo, updateSectionTwo } from "../controller/SectionTwoController.js";

const router = express.Router();


router.get("/public/get-all-section-two", getAllSectionTwo);

router.post("/admin/add-section-two", addSectionTwo);
router.put("/admin/update-section-two/:id", updateSectionTwo);
router.delete("/admin/delete/:id", deleteSectionTwo);


export default router;

