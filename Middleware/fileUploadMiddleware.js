const multer=require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
    const file_name=file.fieldname+Date.now()+"-"+file.originalname;
    req.fileName=file_name
      cb(null,file_name)
    }
  })
  const upload = multer({ storage: storage,limits:{fileSize:1000000*100} }).single("my_file")

  module.exports=upload