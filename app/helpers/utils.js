const { v1: uuidv1 } = require("uuid");
const OrdersStatusHistoryModel = require("../models/orders/v1/OrderStatusHistory");

function responseObj(res, status, msg = "Some thing went wrong!", body = {}) {
  return res.status(status).send({ msg: msg, data: body });
}
function nullCheckError(inputs, res) {
  for (let input of inputs) {
    if (input === null || input === undefined || input === "") {
      res.status(422).send({ msg: "Invalid Input!" });
      return res;
    }
  }

  return false;
}

function generateOTP() {
  return Math.floor(Math.random() * 899999 + 100000);
}

function generateCustomerCode() {
  // Get current timestamp (in milliseconds)
  const timestamp = Date.now().toString();

  // Generate a random 4-digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000).toString();

  // Combine timestamp and random number, and take a substring of 8 characters
  const code = "JSCST" + timestamp + randomNum;

  // If the generated code is longer than 8 digits, truncate it
  return code; //.substring(0, 8);
}

function generateOrderId(custid) {
  // Generate a UUID
  const uuid = Math.floor(1000 + Math.random() * 9000);

  // Get the current timestamp
  const timestamp = new Date();
  const seconds = timestamp.getSeconds();
  const date = timestamp.getDate();
  const month = timestamp.getMonth();
  const minutes = timestamp.getMinutes();
  const outletCode = "";

  // Concatenate UUID and timestamp to create the order ID
  const orderId = `JS${custid}${date}${month}${minutes}${seconds}${uuid}`;

  return orderId;
}

async function createOrderHistory(orderId, deliveryPersonId=null, status) {
  try {
    await OrdersStatusHistoryModel({
      orderId: orderId,
      statusHistory: {
        $push: {
          deliveryBoyId: deliveryPersonId,
          orderStatus: status, 
        },
      },
    }).save();
    return true;
  } catch (err) {
    return false;
  }
}


module.exports = {
  responseObj,
  nullCheckError,
  generateOTP,
  generateCustomerCode,
  generateOrderId,
  createOrderHistory
};
