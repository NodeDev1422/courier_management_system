const jwt = require("jsonwebtoken");
const { generateOTP } = require("../../../../helpers/utils");
const userModel = require("../../../../models/customer/v1/Customers");

const userRegistration = async (req, res) => {
  try {
    const mobileNumber = req.body.mobileNumber;
    const checkMobileExists = await userModel.countDocuments({
      mobileNumber: mobileNumber,
    });
    console.log(checkMobileExists);
    if (checkMobileExists > 0) {
      return res
        .status(403)
        .send({ msg: "Mobile number is already exists!", data: {} });
    }
    const genOtp = generateOTP();

    const otpFields = { otp: genOtp };
    await userModel({ mobileNumber: mobileNumber, otp: otpFields }).save();
    return res
      .status(200)
      .send({ msg: "Success!", data: { mobileNumber, ...otpFields } });
  } catch (error) {
    console.error(error);
  }
};
const userLogin = async (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  const otp = req.body.otp;

  const pipe = [
    {
      $match: {
        mobileNumber: mobileNumber,
      },
    },
    {
      $project: {
        mobileNumber: 1,
        otp: {
          $in: [otp, "$otp.otp"],
        },
      },
    },
  ];


  const verifyOtp = await userModel.aggregate(pipe).allowDiskUse(true);
  if(!verifyOtp.length)
  {
     return res.send({ "msg": "Invalid OTP", data:{} });
  }
  const data = verifyOtp?.[0];
  const getJWTToken = jwt.sign(data,"123456");
  return res.send({ msg: "Otp Loggedin successfully!" , "data": { token: getJWTToken }});
};

module.exports = { userRegistration, userLogin };
