const userModel = require("../models/user.model");
const { hashedPassword, comparePassword } = require("../utils/auth.util");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try{

    const {email, password, phone, address, name} = req.body;

    if(!name || !email || !password || !phone || !address) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }
    const existUser = await userModel.findOne({email});
    console.log(req.body);
    if(existUser) {
      res.status(200).json({ success:false, msg:"User already exist" });
    }
    const hashPassword = await hashedPassword(password);
    const user = await new userModel({name, email, phone, address, password:hashPassword}).save();

    console.log(user);

    res.status(200).json({ success:true, user });

  } catch(err) {
    console.log("(register)/ auth.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    });
  }
}

exports.login = async (req, res) => {
  try{

    const {email, password} = req.body;
    if(!email || !password) {
      res.status(400).json({
        success:false,
        message: "Invalid Input"
      });
    }
    const user = await userModel.findOne({email});
    if(!user) {
      res.status(200).json({ success:false, msg:"User not exist" });
    }
    const compare = await comparePassword(password,user.password);
    if(!compare) {
      res.status(200).json({ success:false, msg:"Invalid password" });
    }
    const token = await jwt.sign({_id: user.id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn:'7d'});

    res.status(200).json({ success:true, user: {
      name : user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      _id: user.id,
      role: user.role
    },
    token
   });
    
  } catch(err) {
    console.log("(login)/ auth.controller.js =>", err);
    return res.status(500).json({
      success:false,
      message: err.message || err 
    })
  }
}