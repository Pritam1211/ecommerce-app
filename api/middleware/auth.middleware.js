const jwt = require("jsonwebtoken");

exports.jwtMiddleware = async (req,res,next) => {
  try{
    decode = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch(err) {
    console.log(err);
    res.status(200).json({success: false, msg: "Permission denied"})
  }
}

exports.adminMiddleware = async (req,res,next) => {
  try{
    decode = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
    req.user = decode;
    if(decode.role != 1) {
      res.status(200).json({success: false, msg: "Admin required"})
    } else{
      next();
    }
  } catch(err) {
    console.log(err);
    res.status(200).json({success: false, msg: "Admin denied"})
  }
}