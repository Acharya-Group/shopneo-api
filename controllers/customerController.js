import Customer from "../models/Customer.js";

// ✅ Create
export const createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Read all
export const getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

// ✅ Read by slug
export const getCustomerBySlug = async (req, res) => {
  const customer = await Customer.findOne({ slug: req.params.slug });
  if (!customer) return res.status(404).json({ error: "Not found" });
  res.json(customer);
};

// ✅ Update
export const updateCustomer = async (req, res) => {
  const customer = await Customer.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    { new: true }
  );
  res.json(customer);
};

// ✅ Delete
export const deleteCustomer = async (req, res) => {
  await Customer.findOneAndDelete({ slug: req.params.slug });
  res.json({ message: "Deleted successfully" });
};
