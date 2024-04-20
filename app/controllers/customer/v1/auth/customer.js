const jwt = require("jsonwebtoken");
const { responseObj,generateOTP,generateCustomerCode } = require("../../../../helpers/utils");
const userModel = require("../../../../models/customer/v1/Customers");

const userRegistration = async (req, res) => {
  try {
    const mobileNumber = req.body.mobileNumber;
    const checkMobileExists = await userModel.findOne({
      mobileNumber: mobileNumber,
    });
    let customerCode = generateCustomerCode();
    const genOtp = generateOTP();
    const otpFields = { otp: genOtp };
    if (checkMobileExists !== null) {
      // return res
      //   .status(403)
      //   .send({ msg: "Mobile number is already exists!", data: {} });

      await userModel.updateOne({ _id: checkMobileExists._id  }, { $push: { otp: otpFields } });

    }else{
      await userModel({ customerCode:customerCode,mobileNumber: mobileNumber, otp: otpFields }).save();
    }
    return responseObj(res,200,"Success!", { mobileNumber, ...otpFields });
  } catch (error) {
    console.log("Error in userRegistration function in user.js file", err);
    return responseObj(res,500,"Some thing went wrong!", {});
  }
};
const userLogin = async (req, res) => {
  try{
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
     return responseObj(res,400,"Invalid OTP!", {});
  }
  const data = verifyOtp?.[0];
  const getJWTToken = jwt.sign(data,"123456");
  return responseObj(res,200,"Otp Loggedin successfully!", { token: getJWTToken });
}catch(err){
  console.log("Error in userLogin function in user.js file", err);
  return responseObj(res,500,"Some thing went wrong!", {});
}
};


const customerProfile = async(req,res)=>{

  try{
 const {firstName,lastName,email} = req.body;
const getCustomerId = req.customerDetails?._id;

const updateCustomerDetails = await userModel.updateOne({ _id:getCustomerId }, {firstName,lastName,email});
return responseObj(res,200,"Updated successfully!", {});
  }catch(err){
    console.log("Error in customer profile function in user.js file", err);
    return responseObj(res,500,"Some thing went wrong!", {});
  }
}





module.exports = { userRegistration, userLogin, customerProfile };
