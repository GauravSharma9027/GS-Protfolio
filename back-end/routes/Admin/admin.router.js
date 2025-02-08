const express = require('express');
const { adminLogin } = require('../../controllers/Admin/adminController');
const { jwtGenerateToken } = require('../../utils/jwt.generatetoken.utils');
const { jwtAuthMiddleware } = require('../../middleware/jwt.auth.middleware');
const router = express.Router();

router.post('/admin/login',(req,res)=>{
    adminLogin(req,res);
})

module.exports = router;