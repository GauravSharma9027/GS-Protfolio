const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewerContactSchema = new Schema({
    viewerName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        required: true,
    },
    viewerSubject:{
        type: String,
        required: true,
    },
    viewerMessage:{
        type: String,
        required: true,
    }
},
{
    timestamps: true  // Adds createdAt and updatedAt timestamps automatically
});

module.exports = mongoose.model('viewerContactModel',viewerContactSchema);