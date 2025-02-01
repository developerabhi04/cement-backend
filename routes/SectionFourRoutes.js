import express from "express";
import { addSectionFour, deleteSectionFour, getAllSectionFour, updateSectionFour } from "../controller/SectionFourController.js";

const router = express.Router();


router.get("/public/get-all-section-four", getAllSectionFour);

router.post("/admin/add-section-four", addSectionFour);
router.put("/admin/update-section-four/:id", updateSectionFour);
router.delete("/admin/delete/:id", deleteSectionFour);


export default router;
