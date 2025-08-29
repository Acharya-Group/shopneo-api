import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerBySlug,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCustomer);
router.get("/", getCustomers);
router.get("/:slug", getCustomerBySlug);
router.put("/:slug", protect, updateCustomer);
router.delete("/:slug", protect, deleteCustomer);

export default router;
