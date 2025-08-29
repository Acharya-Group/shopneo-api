import express from "express";
import {
  createSeller,
  getSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
} from "../controllers/sellerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getSellers);
router.get("/:id", getSellerById);

// Protected routes (admin/user must be logged in)
router.post("/", protect, createSeller);
router.put("/:id", protect, updateSeller);
router.delete("/:id", protect, deleteSeller);

export default router;
