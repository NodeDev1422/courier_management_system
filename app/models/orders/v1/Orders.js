const mongoose = require("mongoose");
const users = require("../../customer/v1/Customers");
const content = require("../../master/v1/ContentMaster");
const statusMaster = require("../../master/v1/Status");

const locationSchema = new mongoose.Schema({
  address: { type: String },
  coordinates: { type: Object },
  state:{ type: String },
  city: { type: String },
  district: { type: String },
  pincode: { type: String }
});


const orderchema = new mongoose.Schema({
  customerId: { type: String, ref: "users" },
  orderId: { type: String },
  QRCode: { type: String },
  senderAddressId: { type: String, ref: "customers_address" },
  recipientAddressId: { type: String, ref: "customers_address" },
  source: locationSchema,
  destination: locationSchema,
  deliveryMode: { type: String },
  weight: { type: Number },
  weightUnits: { type: String },
  basePrice: { type: Number },
  SGSTPerc: { type: Number, default:9 },
  CGSTPerc: { type: Number,default:9 },
  GSTPerc: { type: Number,default:18 },
  applicationCharges: { type: Number },
  packageTypeCharges: { type: Number },
  totalAmount: { type: Number },
  height: { type: String },
  width: { type: String },
  length: { type: String },
  anyThingImp: { type: String },
  packageDetails: { type: String },
  contentType: { type: String },
  packageType: { type: String },
  orderStatus: {
    type: Number,
    enum: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    default: 1,
    ref: "status_masters"
  },
  currentDeliveryBoyId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  QRScanCode: { type: String },
  QRCode: { type: String },  
  createdAt: {
    type: Date,
    default: () => {
      return new Date().toISOString();
    },
  },
  updatedAt: {type: Date},
  createdBy: {type: String},
  updatedBy: {type: String},
});

const Orders = mongoose.model("orders", orderchema);

module.exports = Orders;
