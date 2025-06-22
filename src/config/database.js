const mongoose = require('mongoose');

const connectDB = async()=>{
 await mongoose.connect(
    "mongodb+srv://hritikgaur44:w2vDWppetSbPaRKI@cluster0.sytfeiy.mongodb.net/"
)
};
module.exports = connectDB;
