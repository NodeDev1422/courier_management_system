const router = require('express').Router();
const {createOrder, ordersList} = require('../../../../controllers/customer/v1/orders/orders');
const authMiddleWare = require("../../../../middleware/customer/v1/AuthMiddleware");

router.post('/bookOrder',authMiddleWare.auth,createOrder);
router.get('/list',authMiddleWare.auth,ordersList);

// router.post('/login', UserController.login);
// router.post('/verifyOtp', UserController.verifyOtp);

// router.get('/profile',auth.required,UserController.profile);


module.exports = router;
