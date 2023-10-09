const mongoose=require("mongoose")

const fileSchema=new mongoose.Schema({
          fileName:{type:String,required:true,message:"all the fields are required"},
          path:{type:String,required:true},
          size:{type:String,required:true},
          uuid:{type:String,required:true},
          sender:{type:String,required:false,default:""},
          receiver:{type:String,required:false,default:""},

},
{
    timestamps:true
})

module.exports=mongoose.model("File",fileSchema)