const mongoose=require("mongoose")
require("dotenv").config()
const dbConnect=async()=>{
    try{
           await mongoose.connect(process.env.URL)
           console.log("Connected to database")
    }catch(err){
       console.log("database connecting error",err)
    }
}
module.exports=dbConnect;

