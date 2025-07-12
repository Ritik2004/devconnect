const express = require('express');
const connectDB =  require("./config/database")
const app = express(); 
const bcrypt = require("bcrypt")
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const { validateSignUpData } = require("./utils/validation")
const cookieParser = require("cookie-parser" );
const {userAuth} = require("./middlewares/auth")
app.use(cookieParser())
app.use(express.json());
app.post('/signup',async (req,res) => { 
//creating a new instance of user model and saving it to the database
//encrypt the data 
  try{
    //validation of data
    
    validateSignUpData(req);

    const{firstName,lastName,emailId,password} = req.body;

    const passwordHash = await bcrypt.hash(password,10);


const user = new User({
  firstName,lastName,emailId,password:passwordHash
});
 await user.save()
 res.send('User registered successfully')
  }
  catch(err){
     console.error(err.message)
    res.status(500).send('Server Error')   //if there is an error saving the user, send a 500 status code and a message to the client.
  }
})
app.post('/login', async (req,res)=>{
   try{
       const{emailId, password} = req.body;
       const user = await User.findOne({emailId:emailId});
       if(!user){
        throw new Error("Invalid credentials")
       }
       const isPasswordvalid = await bcrypt.compare(password,user.password);
       if(isPasswordvalid){
         //create a jwt token 
          const token = await jwt.sign({_id:user._id},"SECRETKEY@123")
          console.log(token)
         //add the token to cookie and send response back to user
         res.cookie("token",token);
         res.send("Login done");
       }else{
            throw new Error("Invalid credentials")
       }
   }
   catch(err){
       res.status(400).send("Error :"+err.message);
   }
})
app.get("/feed", async (req,res)=>{
    const email = req.body.emailId
    try{
   const data =  await User.find({emailId:email});
   res.send(data)
    }
    catch(err){
      console.error(err.message)
      res.status(500).send('erver Error')
    }
})
//userAuth is a middleware so when we call /profile it will first go to 
//userAuth validate and if is successfull we will start with(req,res) part
app.get("/profile",userAuth,async(req,res)=>{
  try
  { 
    //user is coming from middleware
  const user = req.user;
  if(!user){
    throw new Error("User does not exist")
  }
  res.send(user)
}
catch(err){
   res.status(400).send("Error:"+err.message)
}
})
app.get("/byId",async (req,res)=>{
    const id = req.body._id
    try{ 
      const user = await User.findById(id);
      if(!user) return res.status(404).send('User not found')  //if the user does not exist, send a 404 status code and a message to the client.  //Note: this is a basic check and may not cover all edge cases. In a real-world application, you would want to implement more robust error handling.  //This is a basic check and may not cover all edge cases. In a real-world application, you
      res.send(user)
    }
    catch(err){
         console.error(err.message)
         res.status(500).send('Server Error')
    } 
})

app.patch("/update/:userId", async (req,res)=>{
     const userId = req.params?.userId;
     const body = req.body;
    try{
      const ALLOWED_UPDATE = ['photourl', 'about', 'gender','age','skills'];
      const isUpdateAllowed = Object.keys(body).every((key)=>ALLOWED_UPDATE.includes(key));
      if(!isUpdateAllowed){
        throw new Error('Invalid update, only allowed fields are: photourl, about, gender, age, skills')
      }
      const user = await User.findByIdAndUpdate(userId,body,{
        new: true,
        runValidators: true,
      })
      if(!user) return res.status(404).send('User not found')  //if the user does not exist, send a 404 status code and a message to the
      console.log(user)
      res.send('User updated successfully')
   }
   catch(err){
     console.error(err.message)
     res.status(500).send('Update Failed'+err.message)
   }
})

connectDB().then(()=>
    {
        console.log('MongoDB Connected...')
    app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
}); 
    }
)
.catch(err=>console.error("Database connected failed: ",err));




