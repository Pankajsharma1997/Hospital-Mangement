const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },
  },
  { timestamps: true },
  { capped: { size: 5242880, max: 2, autoIndexId: true } }
);
const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;
