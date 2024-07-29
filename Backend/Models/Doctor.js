const mongoose = require("mongoose");
const validator = require("validator"); 
const doctorSchema = new mongoose.Schema(
  {
    doctorFirstName: {
      type: String,
    },

    doctorLastName: {
      type: String,
    },

    email: {
      type: String,
      validate: [validator.isEmail, "Provide A Valid Email!"],
    },

    password: {
      type: String,
    },

    identityNumber: {
      type: String,
    },

    specialty: {
      type: String,
    },

    mobile: {
      type: Number,
    },
    address: {
      type: String,
    },
    doctorImg: {
      type: String,
    },
  },
  { timestamps: true }
);
const doctorModel = mongoose.model("Doctor", doctorSchema);
module.exports = doctorModel;
