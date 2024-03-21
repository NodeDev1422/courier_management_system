const config = require("../../config/index");
const multer = require("multer");
const mongoose = require("mongoose");
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const bucketName = "orderfiles";
const uri = config?.mongoDBURI;
const connectDB = mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })

const db = connectDB.then(()=> {console.log("DB GRID FS connected");mongoose.connection.db})

const storage = new GridFsStorage({
    db,
    file: (req,file)=>{
        return { filename: file.originalname,bucketName };
    }
});


const newBucket = ()=> new mongoose.mongo.GridFSBucket(mongoose.connection.db,{ bucketName});
module.exports = {db,storage};

