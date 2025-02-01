import express from "express";
import { addSectionThree, deleteSectionThree, getAllSectionThree, updateSectionThree } from "../controller/SectionThreeController.js";

const router = express.Router();


router.get("/public/get-all-section-three", getAllSectionThree);

router.post("/admin/add-section-three", addSectionThree);
router.put("/admin/update-section-three/:id", updateSectionThree);
router.delete("/admin/delete/:id", deleteSectionThree);


export default router;
