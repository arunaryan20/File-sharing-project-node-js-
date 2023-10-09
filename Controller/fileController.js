const fileModel=require("../Models/fileModel")
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
require("dotenv").config()
const fileController=async(req,res)=>{
               try{
                  //    console.log(req.file.filename+"===="+req.fileName+"===="+req.file.size+"===="+req.file.path)
                  const data=new fileModel({
                        fileName:req.file.filename,
                        path:req.file.path,
                        size:req.file.size,
                        uuid:uuidv4()
                  })                   
                   const result=await data.save();
                   const download_url=`${process.env.APP_BASE_URL}/api/files/${result.uuid}`
                  //  console.log("download url---->",download_url)
                   res.status(201).json({success:true,message:"file uploaded successfully",data:result,url:download_url})
              
                  }catch(err){
                res.status(400).json({success:false,message:"file controller error",error:err})
               }
}

const downloadController=async(req,res)=>{
             try{
                  const data=await fileModel.findOne({uuid:req.params.uuid})   
                  if(!data){
                        res.status(404).json({success:false,message:"data not found"})
                  }else{
                        const downl=`${process.env.APP_BASE_URL}/api/files/download/${data.uuid}`
                        // console.log("download link---->",downl)
                        res.status(200).json({success:true,message:"your file",data:data,downloadLink:downl})
                  }
             }catch(err){
                  res.status(400).json({success:false,message:"download controller error",error:err})
             }
}

const downloadFileController=async(req,res)=>{
      try{
            const file=await fileModel.findOne({uuid:req.params.uuid})

            if(!file){
                  res.status(404).json({success:false,message:"link has been expired"})
            }else{
                  filePath=`${__dirname}/../${file.path}`
                  res.download(filePath)
            } 
      }catch(err){
            res.status(400).json({success:false,message:"download file controller error",error:err})
      }
}

const nodeMailController=(req,res)=>{
      try{   

            // Create a transporter using SMTP
            const transporter = nodemailer.createTransport({
              service: 'Gmail', // You can use other SMTP services like Outlook, Yahoo, etc.
              auth: {
                user: process.env.EMAIL, // Your email address
                pass: process.env.PASSWORD // Your email password or app-specific password
              }
            });
            const {receiver,subject,message}=req.body
              if(!receiver || !subject || !message){
                  res.status(400).json({success:false,message:"all the fields are required"})
              }
            // Define email data
            const mailOptions = {
              from: process.env.EMAIL, // Sender's email address
              to: receiver, // Recipient's email address
              subject: subject, // Subject line
              text: message // Plain text body
            };
            
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
            //     console.error('Error:', error);
                res.status(200).json({success:true,message:"Error in email sending",error:error})
              } else {
            //     console.log('Email sent:', info.response);
                res.status(200).json({success:true,message:"email sent successfully"})
              }
            });
            



      }catch(err){
            res.status(400).json({success:false,message:"node mail  controller error",error:err})   
      }
}



module.exports={fileController,downloadController,downloadFileController,nodeMailController}