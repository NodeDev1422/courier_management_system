const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  otp: { type: Number },
});
const detailsSchema = new mongoose.Schema({
    proofType: { type: String,enum : ["aadhar","pan"] },
    proofNumber: { type: String },
    proof: { type: String },
  });
const deliveryBoysSchema = new mongoose.Schema({
  userName: { type: String },
  empCode: { type: String },
  mobileNumber: { type: Number, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  status: { type: Boolean },
  otp: [otpSchema],
  details: [detailsSchema],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: ()=> { return new Date().toISOString() } },
  updatedAt: {type: Date},
  createdBy: {type: String},
  updatedBy: {type: String},
});

const DeliveryBoys = mongoose.model("deliveryBoys", deliveryBoysSchema);

module.exports = DeliveryBoys;
