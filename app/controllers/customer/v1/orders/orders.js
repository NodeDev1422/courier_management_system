const mongoose = require("mongoose");
const multer = require("multer");
const OrdersModel = require("../../../../models/orders/v1/Orders");
const OrdersStatusHistoryModel = require("../../../../models/orders/v1/OrderStatusHistory");
const qr = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const {
  generateOrderId,
  createOrderHistory,
  responseObj,
} = require("../../../../helpers/utils");

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Rename file to avoid name conflicts
//   },
// });
// // Initialize multer with storage configuration
// const upload = multer({ storage: storage });
/**
 *
 * @param {*} req
 * @param {*} res
 * @description Create order by Customer
 * @returns
 */
const createOrderByCustomer = async (req, res) => {
  try {
    if (!req.customerDetails || !req.customerDetails?._id) {
      return res.status(403).send({ msg: "Invalid User.", data: {} });
    }

    // let fileInput = null;
    // fileInput = await new Promise((resolve, reject) => {
    //   upload.array("file", 10)(req, res, (err) => {
    //     if (err) {
    //       console.log(err);
    //       reject(err);
    //     }
    //     return resolve(req.files);
    //   });
    // });

    const customerId = req.customerDetails?._id;

    //date|time|last 4 digits of customer id
    // Get the current date and time
    const now = new Date();

    // Get the hours, minutes, and seconds from the current date
    const seconds = now.getSeconds();
    const timeStamp = now.getTime();
    const time = timeStamp + seconds.toString();
    const orderQACode = time + customerId.slice(-5);
    const orderId = generateOrderId(customerId.slice(-5));
    const convertBase64 = Buffer.from(orderId).toString("base64");
    const QRUrl = await qr.toDataURL(orderId);

    const QRCode = await createCenterQAText(QRUrl);

    const {
      source,
      destination,
      senderAddressId = null,
      recipientAddressId = null,
      contentType,
      weight,
      weightUnits,
      packageType,
      height,
      width,
      length,
      anyThingImp,
      packageDetails,
      deliveryMode,
    } = req.body;

    let createOrder = await OrdersModel({
      orderId: orderId,
      customerId,
      senderAddressId,
      recipientAddressId,
      source,
      destination,
      contentType,
      weight,
      weightUnits,
      QRCode: QRCode,
      packageType,
      height,
      width,
      length,
      anyThingImp,
      packageDetails,
      deliveryMode,
      orderStatus: 1, //Booked
    }).save();

    await createOrderHistory(createOrder?._id, null, 1); // booked

    return responseObj(res, 200, "Order placed successfully!", {});
  } catch (err) {
    console.log("Error in Order creation function in orders.js file", err);
    return responseObj(res, 500, "Some thing went wrong!", {});
  }
};

async function createCenterQAText(QRUrl) {
  const companyName = "JS"; // The name of your company

  // Load QR code image
  const qrImage = await loadImage(QRUrl);

  // Create canvas
  const canvas = createCanvas(qrImage.width, qrImage.height);
  const ctx = canvas.getContext("2d");

  // Draw QR code image
  ctx.drawImage(qrImage, 0, 0);

  // Add company name in the middle
  ctx.font = "bold 20px Arial";
  ctx.fillStyle = "#C14506"; // Color of the text
  ctx.textAlign = "center";
  ctx.fillText(companyName, canvas.width / 2, canvas.height / 2);

  // Convert canvas to data URL
  const finalQRDataURL = canvas.toDataURL();
  return finalQRDataURL;
}

const ordersList = async (req, res) => {
  try {
    const { offset = 0, limit = 5, filter = {} } = req.body;
    const countOrders = await OrdersModel.countDocuments({});
    const customerId = req.customerDetails?._id;
    let match = {};
    if (customerId) {
      match.customerId = customerId;
    }

    /**
     * Filter by status
     *
     */
    if (filter?.status) {
      match.orderStatus = filter?.status;
    }
    const pipe = [
      {
        $match: match,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: offset,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "status_masters",
          // Assuming the name of your status collection is "status"
          localField: "orderStatus",
          // Assuming the field that links to the status collection is "statusId"
          foreignField: "statusId",
          as: "status",
        },
      },
      {
        $unwind: "$status",
      },
      {
        $project: {
          _id: 0,
          displayOrderId: "$orderId",
          orderId: "$_id",
          customerId: 1,
          source: 1,
          destination: 1,
          deliveryMode: 1,
          createdAt: 1,
          status: "$status.statusDisplayName",
        },
      },
    ];

    let data = await OrdersModel.aggregate(pipe).allowDiskUse(false);
    if (!data.length) {
      return responseObj(res, 403, "No Data found.", {});
    }

    res.header["totalCount"] = countOrders;
    res.header["currentPage"] = offset;
    res.header["limit"] = limit;

    return responseObj(res, 200, "Success", data);
  } catch (err) {
    console.log("Error in fetching Order function in orders.js file", err);
    return responseObj(res, 500, "Some thing went wrong!", {});
  }
};

const ordersDetails = async (req, res) => {
  try {
    const { filter = {} } = req.body;
    const customerId = req.customerDetails?._id;

    let match = {};

    if (customerId) {
      match.customerId = customerId;
    }

    let addFields = {};
    /**
     * Filter by status
     *
     */
    if (filter?.status) {
      match.orderStatus = filter?.status;
    }
    if (filter?.orderId) {
      match._id = new mongoose.Types.ObjectId(filter?.orderId);
    }
    if (filter?.QRCode) {
      match.orderId = (filter?.QRCode);
    }
    const pipe = [
      //  addFields,
      {
        $match: match,
      },
      {
        $lookup: {
          from: "status_masters",
          // Assuming the name of your status collection is "status"
          localField: "orderStatus",
          // Assuming the field that links to the status collection is "statusId"
          foreignField: "statusId",
          as: "status",
        },
      },
      {
        $unwind: "$status",
      },
      /*  {
        $addFields: {
          senderAddressObjectId: {
            $toObjectId: "$senderAddressId",
          },
          receiverAddressObjectId: {
            $toObjectId: "$recipientAddressId",
          },
        },
      },
      {
        $lookup: {
          from: "customers_addresses",
          let: {
            senderId: "$senderAddressObjectId",
            receiverId: "$receiverAddressObjectId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    {
                      $eq: ["$_id", "$$senderId"],
                    },
                    {
                      $eq: ["$_id", "$$receiverId"],
                    },
                  ],
                },
              },
            },
          ],
          as: "addresses",
        },
      },*/
      {
        $project: {
          _id: 0,
          displayOrderId: "$orderId",
          orderId: "$_id",
          customerId: 1,
          source: 1,
          destination: 1,
          deliveryMode: 1,
          createdAt: 1,
          status: "$status.statusDisplayName",
          //  source: { "$arrayElemAt": ["$addresses", 0] },
          // destination: { "$arrayElemAt": ["$addresses", 1] },
          QRCode: 1,
          source: 1,
          destination: 1,
          deliveryMode: 1,
          weight: 1,
          weightUnits: 1,
          SGSTPerc: 1,
          CGSTPerc: 1,
          GSTPerc: 1,
          height: 1,
          width: 1,
          length: 1,
          anyThingImp: 1,
          packageDetails: 1,
          contentType: 1,
          packageType: 1,
        },
      },
    ];

    let data = await OrdersModel.aggregate(pipe).allowDiskUse(false);
    if (!data.length) {
      return responseObj(res, 403, "No Data found.", {});
    }

    return responseObj(res, 200, "Success", data);
  } catch (err) {
    console.log("Error in fetching Order function in orders.js file", err);
    return responseObj(res, 500, "Some thing went wrong!", {});
  }
};

module.exports = { createOrderByCustomer, ordersList, ordersDetails };
