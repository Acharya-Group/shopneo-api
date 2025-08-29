import mongoose from "mongoose";

// Sub-schema for Products
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  whatsappUrl: String,
});

// Sub-schema for Blogs
const blogSchema = new mongoose.Schema({
  img: String,
  heading: { type: String, required: true },
  description: String,
});

// Sub-schema for Business Hours
const businessHoursSchema = new mongoose.Schema({
  monday: String,
  tuesday: String,
  wednesday: String,
  thursday: String,
  friday: String,
  saturday: String,
  sunday: String,
});

// Sub-schema for SEO
const seoSchema = new mongoose.Schema({
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  canonicalUrl: String,
});

// Main Customer Schema
const customerSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  businessName: String,
  banner: String,
  profile: String,
  location: String,
  email: String,
  contact: String,
  alternativeNumber: String,
  whatsapp: String,
  instagram: String,
  facebook: String,
  youtube: String,
  description: String,
  products: [productSchema],
  gallery: [String],
  blogs: [blogSchema],
  businessHours: businessHoursSchema,
  seo: seoSchema, 
}, { timestamps: true });

export default mongoose.model("Customer", customerSchema);
