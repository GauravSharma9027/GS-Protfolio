const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    heroImage:{
        type: String,
        // required:true
    },
    projectImage:{
        type: String,
        required:true
    },
    projectTitle:{
        type: String,
        required:true
    },
    projectShortDescription:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('projectModel',projectSchema);