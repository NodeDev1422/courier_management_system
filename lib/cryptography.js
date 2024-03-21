const crypto = require("crypto");
const { Sequelize } = require('sequelize');
const algorithm = "aes-256-cbc";
const initVector = "ryojvlzmdalyglrj";
const Securitykey = "hcxilkqbbhczfeultgbskdmaunivmfuo";
const databaseSecurityKey = "hcxilkqbbhczfeultgbskdmaunivmSyntizen";

module.exports =  {
  decrypt: (str) => {
    let buf = Buffer.from(str, 'base64');
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(buf, "binary", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
  },
  encrypt: (str) => {
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(str, "utf-8", "base64");
    encryptedData += cipher.final("base64");
    return encryptedData;
  },
   dbEncrypt: async (data) => {

    return Sequelize.fn('PGP_SYM_ENCRYPT', data, databaseSecurityKey, 'compress-algo=1, cipher-algo=aes256');
  },
  dbDecrypt:  (column) => {
    return Sequelize.fn('PGP_SYM_DECRYPT', Sequelize.cast(Sequelize.col(column), 'bytea'), databaseSecurityKey, 'compress-algo=1, cipher-algo=aes256');
  },
  dbDecryptData:  (column) => {
    return Sequelize.fn('PGP_SYM_DECRYPT', column, databaseSecurityKey, 'compress-algo=1, cipher-algo=aes256');
  },

  encryptBase64: (str) => {

    let base64data = Buffer.from(str).toString('hex');
    return base64data;

  },
  decryptBase64: (str) => {
    let base64data = Buffer.from(str, 'hex').toString('ascii');
    return base64data;
  },
}

