const router = require('express').Router();
const {userRegistration,userLogin,customerProfile} = require('../../../../controllers/customer/v1/auth/customer');
const authMiddleWare = require("../../../../middleware/customer/v1/AuthMiddleware");



router.post('/login',userRegistration);
router.post('/verifyOtp',userLogin);
router.put('/updateProfile',authMiddleWare.auth,customerProfile);
// router.post('/login', UserController.login);
// router.post('/verifyOtp', UserController.verifyOtp);

// router.get('/profile',auth.required,UserController.profile);


module.exports = router;
