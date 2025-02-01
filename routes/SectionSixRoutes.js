import express from "express";
import { addSectionSix, deleteSectionSix, getAllSectionSix, updateSectionSix } from "../controller/SectionSixController.js";

const router = express.Router();



router.get("/public/get-all-section-six", getAllSectionSix);

router.post("/admin/add-section-six", addSectionSix);
router.put("/admin/update-section-six/:id", updateSectionSix);
router.delete("/admin/delete/:id", deleteSectionSix);


export default router;
