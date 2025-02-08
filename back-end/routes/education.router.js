const express = require('express');
const { addEducation, getEducation } = require('../controllers/educationController');
const router = express.Router();

router.post('/fill/user/education',(req,res)=>{
    addEducation(req,res);
});

router.get('/get/user/education',(req,res)=>{
    getEducation(req,res);
});

module.exports = router;