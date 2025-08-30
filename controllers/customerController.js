import Customer from "../models/Customer.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Create Customer
export const createCustomer = async (req, res) => {
  try {
    const { name, businessName, description, location } = req.body;

    const customer = new Customer({
      ...req.body,
      banner: req.files?.banner?.[0]?.path,
      profile: req.files?.profile?.[0]?.path,
      gallery: req.files?.gallery?.map((file) => file.path),
      products: req.files?.products
        ? req.files.products.map((file, idx) => ({
            name: req.body.productNames[idx],
            description: req.body.productDescriptions[idx],
            image: file.path,
            whatsappUrl: req.body.productWhatsappUrls[idx],
          }))
        : [],
    });

    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Read all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Read customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Not found" });

    // Update images on Cloudinary if new files are uploaded
    if (req.files?.banner) {
      if (customer.banner) await cloudinary.uploader.destroy(getPublicId(customer.banner));
      customer.banner = req.files.banner[0].path;
    }
    if (req.files?.profile) {
      if (customer.profile) await cloudinary.uploader.destroy(getPublicId(customer.profile));
      customer.profile = req.files.profile[0].path;
    }
    if (req.files?.gallery) {
      customer.gallery = req.files.gallery.map((file) => file.path);
    }
    if (req.files?.products) {
      customer.products = req.files.products.map((file, idx) => ({
        name: req.body.productNames[idx],
        description: req.body.productDescriptions[idx],
        image: file.path,
        whatsappUrl: req.body.productWhatsappUrls[idx],
      }));
    }

    // Update other fields
    Object.keys(req.body).forEach((key) => {
      if (!["banner", "profile", "gallery", "products"].includes(key)) {
        customer[key] = req.body[key];
      }
    });

    await customer.save();
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ slug: req.params.slug });
    if (!customer) return res.status(404).json({ error: "Not found" });

    // Delete images from Cloudinary
    if (customer.banner) await cloudinary.uploader.destroy(getPublicId(customer.banner));
    if (customer.profile) await cloudinary.uploader.destroy(getPublicId(customer.profile));
    if (customer.gallery?.length) {
      for (const url of customer.gallery) {
        await cloudinary.uploader.destroy(getPublicId(url));
      }
    }
    if (customer.products?.length) {
      for (const product of customer.products) {
        if (product.image) await cloudinary.uploader.destroy(getPublicId(product.image));
      }
    }

    await customer.remove();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


