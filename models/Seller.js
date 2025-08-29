import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: String,
  slug:String,
  logo: String,
  tagline: String,
  description: String,
  rating: Number,
  totalReviews: Number,
  totalProducts: Number,
  followers: Number,
  responseTime: String,
  returnRate: String,
  verified: Boolean,
  shopneoLink: String,
  category: [String],
});

export default mongoose.model("Seller", sellerSchema);
