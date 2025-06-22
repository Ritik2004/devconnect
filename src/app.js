const express = require('express');
const connectDB =  require("./config/database")
const app = express(); 
const User = require('./models/user');
app.use(express.json());
app.post('/signup',async (req,res) => {
//creating a new instance of user model and saving it to the database
  const user = new User(req.body);
  try{
 await user.save()
 res.send('User registered successfully')
  }
  catch(err){
     console.error(err.message)
    res.status(500).send('Server Error')   //if there is an error saving the user, send a 500 status code and a message to the client.
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




