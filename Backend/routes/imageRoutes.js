import express from "express";
import { DeleteImage, geneateImage, updateImage } from "../controller/imageController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/createImage", upload.single("image"), geneateImage);
router.delete("/deleteImage/:id", DeleteImage);
router.put("/updateImage/:id", upload.single("image"), updateImage);

export default router;
