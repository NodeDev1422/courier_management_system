const router = require('express').Router();
const authMiddleWare = require("../../../../middleware/customer/v1/AuthMiddleware");
const { AddCustomerAddress,getCustomerSavedAddress } = require("../../../../controllers/customer/v1/auth/customerAddress");
router.post('/addAddress',authMiddleWare.auth,AddCustomerAddress);
router.get('/getSavedAddress',authMiddleWare.auth,getCustomerSavedAddress);

module.exports = router;