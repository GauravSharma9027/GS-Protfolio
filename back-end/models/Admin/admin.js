const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');// package hai email validation ka

const adminSchema = new Schema({
    adminName: {
        type: String,
        required: true,
        trim:true
    },
    adminEmail: {
        type: String,
        required: true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Not Valid Email")
            }
        }
    },
    adminNumber:{
        type: Number,
        required: true,
        trim:true
    },
    adminPassword:{
        type: String,
        required: true,
        trim:true,
        minlength: 4,
    }
});



module.exports = mongoose.model('adminModel',adminSchema);
