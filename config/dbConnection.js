const dbConfig = require("./index");
const Mongoose = require('mongoose');

const uri = dbConfig?.mongoDBURI;
module.exports = async function connectDB(){
	try{
		console.info("DB connnected successfully");
	let conn = await Mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
	return conn;

	}catch(err){
		console.warn("Error in connecting DB", err);
	}
}