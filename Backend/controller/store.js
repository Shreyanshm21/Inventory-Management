const Store = require("../models/store");

// Add Store
const addStore = async (req, res) => {
  try {
    const newStore = new Store({
      userID: req.body.userId,
      name: req.body.name,
      category: req.body.category,
      address: req.body.address,
      city: req.body.city,
    });
    const result = await newStore.save();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error saving store:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get All Stores
const getAllStores = async (req, res) => {
  const findAllStores = await Store.find({"userID": req.params.userID}).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllStores);
};

module.exports = { addStore, getAllStores };
