import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: String,
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
  products: [
    {
      name: String,
      description: String,
      image: String,
      whatsappUrl: String,
    },
  ],
  gallery: [String],
  blogs: [
    {
      img: String,
      heading: String,
      description: String,
    },
  ],
  businessHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },
});

export default mongoose.model("Customer", customerSchema);
