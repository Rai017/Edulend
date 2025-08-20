const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req,res,next)=>{
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({error:'Unauthorized'});
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if(!user) return res.status(401).json({error:'Unauthorized'});
    req.user = user;
    next();
  } catch(e){
    res.status(401).json({error:'Invalid token'});
  }
};
