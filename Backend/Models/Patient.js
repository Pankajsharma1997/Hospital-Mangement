const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },
    gender: {
        type: String,
    }
  },
  { timestamps: true }
);
const patientModel = mongoose.model("Patient", patientSchema);
module.exports = patientModel;
