  const mongoose = require("mongoose");

  const StoreSchema = new mongoose.Schema(
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false,
      },
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  const Store = mongoose.model("store", StoreSchema);
  module.exports = Store;
