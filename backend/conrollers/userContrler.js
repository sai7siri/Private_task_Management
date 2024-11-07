const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// controllers

const addUser = async (req, res) => {
  try {
    const body = req.body;

    body.profile = req.file ? req.file.path : "";

    const validUser = await userModel.findOne({ email: body.email });
    if (validUser) {
      return res.status(400).json({
        success: false,
        message: "user already existed",
      });
    }

    const hashed = bcrypt.hashSync(body.password, 10);

    const newUser = new userModel({
      name: body.name,
      email: body.email,
      password: hashed,
      profile: body.profile,
    });

    await newUser.save();

    newUser.password = undefined;

    res.status(200).json({
      success: true,
      message: "registered successful",
      data: newUser,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validUser = await userModel.findOne({ email });

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const check = bcrypt.compareSync(password, validUser.password);

    if (!check) {
      return res.status(400).json({
        success: false,
        message: "password incorrect !",
      });
    }

    const token = await jwt.sign({ id: validUser._id }, process.env.JWT_KEY, {
      expiresIn: "24hr",
    });

    validUser.password = undefined;

    res.status(200).json({
      success: true,
      message: "login successful",
      data: validUser,
      token : token
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "internal error",a
    });
  }
};

const logOut = async (req, res) => {
  try {
   
    res.status(200).json({ success: true, message: "logout successful" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

// user tasks routes ...

const getUser = async(req, res)=>{
  try{

   const userId = req.validUser.id

   const data =  await userModel.findById(userId)

   res.status(200).json({
    success: true,
    message: "details",
    data : data
  });

  }catch(err){

    res.status(500).json({
      success: false,
      message: "internal smashed",
    });
  }
}

module.exports = { addUser, loginUser, logOut , getUser};
