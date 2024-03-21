const router = require('express').Router();
const {getContentData, getServiceTypes} = require('../../../../controllers/customer/v1/masterData/masterData');
const authMiddleWare = require("../../../../middleware/customer/v1/AuthMiddleware");


router.get('/content',authMiddleWare.auth,getContentData);
router.get('/serviceTypes',authMiddleWare.auth,getServiceTypes);

// router.post('/login', UserController.login);
// router.post('/verifyOtp', UserController.verifyOtp);

// router.get('/profile',auth.required,UserController.profile);


module.exports = router;
