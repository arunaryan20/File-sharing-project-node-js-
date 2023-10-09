const express=require("express");
const dataController=require("../Controller/fileController")
const file_router=express.Router();
const upload=require("../Middleware/fileUploadMiddleware")
file_router.post("/file/",upload,dataController.fileController);
 file_router.get("/files/:uuid",dataController.downloadController);
file_router.get("/files/download/:uuid",dataController.downloadFileController);

file_router.get("/file/node-mailer",dataController.nodeMailController);
module.exports=file_router