const express = require('express');

//we are creating instance of sever
const app = express(); 


app.use("/test",(req,res)=>{
 res.send("Hello from sever 12345")
})

// now this server needs to listen on a port
app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
});