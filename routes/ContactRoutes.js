import express from "express";
import { addContactInformation, deleteInformation, getAllInformation, updateInformation } from "../controller/ContactController.js";

const router = express.Router();


router.get("/public/get-all-information", getAllInformation);

router.post("/admin/add-contact-information", addContactInformation);
router.put("/admin/update-information/:id", updateInformation);
router.delete("/admin/delete/:id", deleteInformation);


export default router;
