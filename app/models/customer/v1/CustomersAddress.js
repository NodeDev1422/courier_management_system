const mongoose = require("mongoose");

const address = new mongoose.Schema({
    "address": {type: String},
    "coordinates": {type: Object},
    "state": {type: String},
    "city": {type: String},
    "district": {type: String},
    "pincode": {type: String},
});


const customerAddressSchema = new mongoose.Schema({
  customerId: { type: String, ref: "customers" },
  title: { type: String },
  location: address,
  createdAt: { type: Date, default: ()=> { return new Date().toISOString() } },
  updatedAt: {type: Date},
  createdBy: {type: String},
  updatedBy: {type: String},
});

const CustomersAddress = mongoose.model("customers_address", customerAddressSchema);

module.exports = CustomersAddress;
