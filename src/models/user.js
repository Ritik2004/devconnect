const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    lastName:{
        type: String

    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address."+value);
    
        }
    }
},
    password:{
        type: String,
        required: true
    },
    age:{
        type: Number,
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
               throw new Error("Gender data not valid.");
            }
        }
    },
    photoUrl:{
        type: String,
        default:'https://via.placeholder.com/150'
    },
    about:{
        type: String,
        default:'This is a default about me text'
    },
    skills:{
        type: [String],
        maxlength: 5
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;