import express from "express";
import { addSectionOne, deleteSectionOne, getAllSectionOne, updateSectionOne } from "../controller/SectionOneController.js";

const router = express.Router();



router.get("/public/get-all-section-one", getAllSectionOne);
router.post("/admin/add-section-one", addSectionOne);
router.put("/admin/update-section-one/:id", updateSectionOne);
router.delete("/admin/delete/:id", deleteSectionOne);


export default router;
