const router = require('express').Router();
//const Role = require('../../models/Role');
router.use('/auth', require('./auth'));
router.use('/order', require('./orders'));
router.use('/master', require('./masterData'));
router.use('/', require('./customer'));
// router.use('/branches', require('./branches'));
// router.use('/ckycUsers', require('./ckycUsers'));
// router.use('/documents', require('./documents'));
// router.use('/districts', require('./districtMaster'));
// router.use('/static', require('./common'));
// router.use('/upload_master', require('./uploadMaster'));
// router.use('/customers', require('./customers'));
// router.use('/clients', require('./clients'));

// router.use('/roles', async (req, res, next) => {
//   let rows = await Role.findAll();
//   let roles = rows.map(row => {
//     return {
//       id: row.id,
//       roleName: row.role_name
//     }
//   })
//   return res.json({ roles: roles });
// });

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;