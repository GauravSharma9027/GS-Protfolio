const express = require('express');
const { addProject, getProject } = require('../controllers/projectController');
const { uploadFields } = require('../middleware/cloudinaryMiddleware');
const router = express.Router();

router.post('/fill/user/project',uploadFields(['projectImage','heroImage']),(req,res)=>{
    addProject(req,res);
});

router.get('/get/user/project',(req,res)=>{
    getProject(req,res);
});


module.exports = router