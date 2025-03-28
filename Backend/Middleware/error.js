import handleError from "../Utils/handleError.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || "Internal Server Error!"
console.log(err)
  if(err.name=='ValidationError'){
    const message = err._message
    err = new handleError(message,404)
  }
  
  if(err.name=='CastError'){
    const message = `Invalid Resource ${err.path}`
    err = new handleError(message,404)
  }

  res.status(err.statusCode).json({success:false,message:err.message})
}