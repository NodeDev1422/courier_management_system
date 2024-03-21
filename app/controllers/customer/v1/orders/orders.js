const mongoose = require("mongoose");
const multer = require("multer");
const OrdersModel = require("../../../../models/customer/v1/Orders");
const qr = require("qrcode");
const { createCanvas, loadImage } = require("canvas");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file to avoid name conflicts
  },
});
// Initialize multer with storage configuration
const upload = multer({ storage: storage });

const createOrder = async (req, res) => {
  if (!req.customerDetails || !req.customerDetails?._id) {
    return res.status(403).send({ msg: "Invalid User.", data: {} });
  }

  let fileInput = null;
  fileInput = await new Promise((resolve, reject) => {
    upload.array("file", 10)(req, res, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      return resolve(req.files);
    });
  });

  const customerId = req.customerDetails?._id;

  //date|time|last 4 digits of customer id
  // Get the current date and time
  const now = new Date();

  // Get the hours, minutes, and seconds from the current date
  const seconds = now.getSeconds();
  const timeStamp = now.getTime();
  const time = timeStamp + seconds.toString();
  const orderQACode = time + customerId.slice(-5);
  const QRUrl = await qr.toDataURL(orderQACode);

  const QRCode = await createCenterQAText(QRUrl);

  const { source, destination, contentType, weight } = req.body;
  await OrdersModel({
    customerId,
    source: JSON.parse(source),
    destination: JSON.parse(destination),
    contentType,
    weight,
    QRScanCode: orderQACode,
    QRCode: QRCode,
    orderStatus: "Order Initiated"
  }).save();

  return res.status(200).send({ msg: "Success!", data: { QRCode } });
};

async function createCenterQAText(QRUrl) {
  const companyName = "CMS"; // The name of your company

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

const ordersList = async(req, res) => {
  const pipe = [
    {
      "$project": {
        _id: 0,
      },
    },
  ];

  let data = await OrdersModel.aggregate(pipe).allowDiskUse(false);
  if (!data.length) {
    return res.status(403).send({ msg: "No Data found.", data: {} });
  }

  return res.status(200).send({ msg: "Success.", data: data });
};

module.exports = { createOrder,ordersList };
