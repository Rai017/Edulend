const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req,res)=>{
  const {name,email,password} = req.body;
  const exists = await User.findOne({email});
  if(exists) return res.status(400).json({error:'Email exists'});
  const passwordHash = await bcrypt.hash(password,10);
  const user = await User.create({name,email,passwordHash});
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
  res.json({token});
};

exports.login = async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({error:'Invalid'});
  const ok = await bcrypt.compare(password,user.passwordHash);
  if(!ok) return res.status(400).json({error:'Invalid'});
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
  res.json({token});
};
