const jwt = require('jsonwebtoken')
const User = require('../models/user');
const userAuth = async (req,res,next) => {
    //Read the token from req cookies
    try
    {  const cookies = req.cookies;
    //validate the token
    const {token} = cookies;
   if(!token){
    throw new Error("Token is not valid")
   }
    const decodedObj = await jwt.verify(token,"SECRETKEY@123");

    const {_id} = decodedObj;
    const user = await User.findById(_id);
//find the user
    if(!user){
        throw new Error("user not found")
    }
    req.user = user;
    next();
}
catch(err){
   res.status(400).send("Error:"+err.message)
}
    
}

module.exports={
    userAuth
}