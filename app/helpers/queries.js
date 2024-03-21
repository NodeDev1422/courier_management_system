//const UploadMaster = require('../models/UploadMaster');
const UserSession = require('../models/UserSession');
const jwt = require('jsonwebtoken');
//const secret = require('../../config').secret;
//const BulkFileBatchLogs = require('../models/BulkFileBatchLogs');
//const BulkSearchBatchLogs = require('../models/BulkSearchBatchLogs');
//const Document = require('../models/Document');
//const PickListMaster = require('../models/PickListMaster');

module.exports = {
  
    sessionLoginTime: async (insertObject) => {
        return UserSession.create(insertObject);
    },
    // sessionLogoutTime: async (req) => {
    //     try {
    //         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
    //             req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    //             let token = req.headers.authorization.split(' ')[1];
    //             var decoded = jwt.verify(token, secret, { ignoreExpiration: true });
    //             var expiredDate = new Date(decoded.exp * 1000);
    //             //checking condition if user logouts without expiration of token we're logging current time else token time 
    //             if (new Date() < expiredDate) {
    //                 expiredDate = new Date().toISOString();
    //             }
    //             let get_lastSession = await UserSession.findOne({
    //                 where: { user_id: decoded.id },
    //                 order: [['id', 'DESC']],
    //             });
    //             await UserSession.update({
    //                 end_time: expiredDate
    //             }, {
    //                 where: { id: get_lastSession.id },
    //                 returning: false
    //             })
    //             return true;
    //         }
    //         return false;
    //     }
    //     catch (e) {
    //         console.log('Issue', e);
    //         return false
    //     }
    // },

};
