const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type: String,
        // required: true,
    },
    profession:{
        type: String,
    },
    profilePhoto:{
        type: String,
        default: '',
    },
    resumePhoto:{
        type: String,
        default: '',
    },
    welcomeMsg:{
        type: String,
        default: 'Hi welcome to visit my portfolio'
    },
    email:{
        type: String,
        // required: true,
        trim: true,
        lowercase: true,
    },
    number:{
        type: Number,
        // required: true,
        trim: true,
    },
    whatAppNumber:{
        type: Number,
        trim: true,
    },
    linkedin:{
        type: String,
        trim: true,
    },
    hackerRank:{
        type: String,
        trim: true
    },
    leetCode:{
        type: String,
        trim: true
    },
    github:{
        type: String,
        trim: true
    },
    GFG:{
        type: String,
        trim: true
    },
    userDescription:{
        type: String,
    },
});

module.exports = mongoose.model("userModel",userSchema);
