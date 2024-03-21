const mongoose = require("mongoose");
const users = require("./Customers");
const content = require('./ContentMaster');
const orderchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', },
  source: { type: Object },
  destination: { type: Object},
  weight: { type: String },
  contentType: { type: String},
  orderStatus: { type: String },
  QRScanCode: { type: String }, 
  QRCode: { type: String }, 
  createdDate: { type: Date },
  updatedDate: { type: Date },
});

const Orders = mongoose.model("orders", orderchema);

module.exports = Orders;
