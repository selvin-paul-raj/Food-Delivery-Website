import multer from "multer";
//function  for storing  file name
const storage=multer.diskStorage({
   
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})  

const upload=multer({storage})

export default upload