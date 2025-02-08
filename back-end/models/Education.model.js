const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    startToPassYear:{
        type: String,
        required: true
    },
    QualificationName:{
        type: String,
        required: true
    },
    QualificationShortDescription:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('educationModel',educationSchema);