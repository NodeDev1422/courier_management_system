const router = require('express').Router();
const {createOrderByCustomer, ordersList, ordersDetails} = require('../../../../controllers/customer/v1/orders/orders');
const authMiddleWare = require("../../../../middleware/customer/v1/AuthMiddleware");

router.post('/bookOrder',authMiddleWare.auth,createOrderByCustomer);
router.post('/list',authMiddleWare.auth,ordersList);
router.post('/detail',authMiddleWare.auth,ordersDetails);

// router.post('/login', UserController.login);
// router.post('/verifyOtp', UserController.verifyOtp);

// router.get('/profile',auth.required,UserController.profile);


module.exports = router;
