const mongoose = require("mongoose");
const orderStatusHistory = new mongoose.Schema({
  deliveryBoyId: { type: String },
  createdDate: {  type: Date,
    default: () => {
      return new Date().toISOString();
    } },
  orderStatus: {
    type: Number,
    enum: [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    default: 1,
    ref: "status_masters"
  }
});
const orderStatusHistorySchema = new mongoose.Schema({
    orderId: { type: String, ref: 'orders' },
    statusHistory:[orderStatusHistory],
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


  const OrderStatusHistory = mongoose.model("order_status_history",orderStatusHistorySchema);
  module.exports = OrderStatusHistory;