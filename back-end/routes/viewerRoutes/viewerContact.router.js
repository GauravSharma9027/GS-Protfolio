const express = require('express');
const { viewerSendMessage, getViewerSendMessage, deleteViewerIndividualMessage } = require('../../controllers/viewerControllers/viewerContactController');
const router = express.Router();

router.post('/send/viewer/message',(req,res)=>{
    viewerSendMessage(req,res);
});

router.get('/get/viewer/message',(req,res)=>{
    getViewerSendMessage(req,res);
});

// router.get('/get/viewer/message/:id',(req,res)=>{
//     getViewerSendMessageOneByOne(req,res);
// });

router.delete('/delete/viewer/message/:id',(req,res)=>{
    deleteViewerIndividualMessage(req,res);
});

module.exports = router;