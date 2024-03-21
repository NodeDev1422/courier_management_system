module.exports = {
  secret: process.env.NODE_ENV === 'production' ? 'secret' : 'secret',
  tokenExpiryTime: process.env.tokenExpiryTime || 60, //in minutes
  jwtTokenExpiryTime: process.env.jwtTokenExpiryTime || "60m", //in minutes,
  mongoDBURI: "mongodb+srv://kickmunna:kickmunna_123456@cluster0.vtbp6dz.mongodb.net/cms_logistics"  //"mongodb://127.0.0.1:27017/cms_logistics"
};
