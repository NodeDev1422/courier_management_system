var router = require('express').Router();

router.use('/api/v1/customer', require('./customer/v1/api'));

module.exports = router;
