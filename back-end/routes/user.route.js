const express = require('express');
const { fillUserInformation, getUserInformation, editUserInformation } = require('../controllers/userController');
const { uploadSingle, uploadFields } = require('../middleware/cloudinaryMiddleware');
const router = express.Router();

router.post('/fill/user/info', uploadFields(['profilePhoto', 'resumePhoto']), (req, res) => {
    fillUserInformation(req, res);
});

router.get('/get/user/info', (req, res) => {
    getUserInformation(req, res);
});

router.post('/edit/user/info',uploadFields(['profilePhoto', 'resumePhoto']) , (req, res) => {
    editUserInformation(req, res);
})

module.exports = router;