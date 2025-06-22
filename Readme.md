# 1- Order of routes matter.
app.use("/",(req,res,next)=>{
    console.log("Request 1")
  res.send("Welcome to our API")
 
})
app.use("/user",(req,res,next)=>{
    console.log("Request 2")
   res.send("User API")
 
})
In postman if we call /user the first route will be called as '/' can take any end point.

# 2- app.use will match all the Http method API calls with that we can call all Patch, Put,Delete, Update

# 3- app.use("/user",(req,res)=>{

})
If we dont send respond back this request will go on.

# 4- we can have multiple route handler like 
app.use("/user",(req,res)=>{
    console.log("Request 1")
 res.send("Hello from sever 12")
},
(req,res)=>{
    console.log("Request 2")
 res.send("Hello from sever 2")
},
 )
 But here it will return Hello from sever 12

# 5- If we want to go to second route handler we need to use next() as third argument
app.use("/user",(req,res,next)=>{
    console.log("Request 1")
 next()
 
},
(req,res,next)=>{
    console.log("Request 2")
 res.send("Hello from sever 2")
},
 )

# 6- We can add multiple route handler in a array.
app.use("/route", rh1, [rh2,rh3,rh4],rh5) 

# 7- Express takes and matches routes one after the other and goes through middleware till it send the response back. It is a function 
with (req,res,next) parameters . 
Example 
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // pass to the next middleware or route
};

# Database
# 8- Mongoose is a librabry to work with mongodb
# 9- Schema -  Mongoose schemas help us enforce structure and validation in MongoDB, even though MongoDB is schema-less."mongoose.Schema() to define the structure of documents in the collection."
# "For example, nameis a required string,emailis also required and must be unique,isActive has a default value true."  
# After creating schema -> we create a model

# express.json() is a built-in middleware function in Express that parses incoming requests with JSON payloads and makes the data available in req.body.