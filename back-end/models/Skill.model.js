const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const skillSchema = new Schema({
    skillName:{
        type: String,
        required: true,
    },
    skillLogo:{
        type: String,
        required: true,
    },
    skillPercentage:{
        type: Number,
        required: true,
    },
    skillDescription:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('SkillModel',skillSchema);