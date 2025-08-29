import Seller from "../models/Seller.js";

// ✅ Create a new seller
export const createSeller = async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).json(seller);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get all sellers
export const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get seller by ID
export const getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ error: "Seller not found" });
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update seller
export const updateSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!seller) return res.status(404).json({ error: "Seller not found" });
    res.json(seller);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete seller
export const deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) return res.status(404).json({ error: "Seller not found" });
    res.json({ message: "Seller deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
