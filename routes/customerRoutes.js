import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", protect, updateCustomer);
router.delete("/:id", protect, deleteCustomer);

export default router;
