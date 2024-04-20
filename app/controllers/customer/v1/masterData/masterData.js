const ContentMaster = require("../../../../models/master/v1/ContentMaster");
const PriceListMaster = require("../../../../models/master/v1/PriceListMaster");
const getContentData = async (req, res) => {
  try {
    const pipe = [{
      "$match": { "showInSmartApp": true  },
    },
    {
      "$project":{
        "_id":0,
        "showInSmartApp":0,
        "ORGANISATION_ID":0,
        "showInCustomerPortal":0,
        "categoryId":0,
        "categoryName":0,
        
      }
    } 
  ];
    let getData = await ContentMaster.aggregate(pipe).allowDiskUse(true);
    if (!getData.length) {
      return res.status(404).send({ msg: "No Data Found!", data: {} });
    }

    getData = getData.map((d)=>{
     return {
      "commodityId": d.COMMODITY_ID,
      "commodityCode": d.COMMODITY_CODE,
      "commodityName": d.COMMODITY_NAME,
     };
    })

    return res.status(200).send({ msg: "Success!", data: getData });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};


const getServiceTypes = async (req, res) => {
  try {
    const pipe = [
      {
        "$group":{
          "_id": "$ServiceTypeId",
          "ServiceTypeId":{
            "$last": "$ServiceTypeId"
          },
          "serviceType":{
            "$last": "$serviceType"
          }
        },
        
      },
    {
      "$project":{
        "_id":0,
        "distanceType":0,
        "contentId": 0,
        "volumeWeight": 0,
        "weightUnit": 0,
        "fromUnit": 0,
        "toUnit": 0,
        "fromDistance": 0,
        "toDistance": 0,
        "basePrice": 0
        
      }
    } 
  ];
    let getData = await PriceListMaster.aggregate(pipe).allowDiskUse(true);
    if (!getData.length) {
      return res.status(404).send({ msg: "No Data Found!", data: {} });
    }

    getData = getData.map((d)=>{
     return {
      "serviceType": d.serviceType,
      "ServiceTypeId": d.ServiceTypeId,
     };
    })

    return res.status(200).send({ msg: "Success!", data: getData });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = { getContentData,getServiceTypes };
