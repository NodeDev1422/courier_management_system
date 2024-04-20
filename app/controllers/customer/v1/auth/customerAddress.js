const { responseObj } = require("../../../../helpers/utils");
const CustomersAddress = require("./../../../../models/customer/v1/CustomersAddress");
const AddCustomerAddress = async(req,res)=>{

    try{
   const {address,title,coordinates,state,city,district,pincode} = req.body;
  const customerId = req.customerDetails?._id;
  if(!customerId)
  {
    return responseObj(res,403,"Forbidden!", {});
  }
  const addLocation = {address,coordinates,state,city,district,pincode};
   await CustomersAddress({customerId,title,location:addLocation}).save();

  return responseObj(res,200,"Address Added successfully!", {});
    }catch(err){
      console.log("Error in AddCustomerAddress function in customerAddress.js file", err);
      return responseObj(res,500,"Some thing went wrong!", {});
    }
  }


  const getCustomerSavedAddress = async (req, res) => {
    try{
        const customerId = req.customerDetails?._id;
        if(!customerId)
        {
          return responseObj(res,403,"Forbidden!", {});
        }
    const getAddress = await CustomersAddress.find({ customerId:customerId }, { addressId: '$_id', _id: 0, location: 1,createdAt:1,title:1 }).lean();
    if(!getAddress.length)
    {
       return responseObj(res,400,"No Addresses found!", {});
    }
   //let data = getAddress;
    return responseObj(res,200,"Address fetched successfully!", getAddress);
  }catch(err){
    console.log("Error in getCustomerSavedAddress function in customerAddress.js file", err);
    return responseObj(res,500,"Some thing went wrong!", {});
  }
  };

  module.exports = {AddCustomerAddress,getCustomerSavedAddress};