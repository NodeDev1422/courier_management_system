const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  otp: { type: Number },
});
const customerSchema = new mongoose.Schema({
  userName: { type: String },
  customerCode: { type: String },
  mobileNumber: { type: Number, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  status: { type: Boolean },
  otp: [otpSchema],
  createdDate: { type: Date },
  updatedDate: { type: Date },
});

const Customers = mongoose.model("customers", customerSchema);

module.exports = Customers;
