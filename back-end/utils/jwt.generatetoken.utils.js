const jwt = require('jsonwebtoken');

const jwtGenerateToken = (userData)=>{
    return jwt.sign(userData,process.env.SECRET_KEY,{
        expiresIn: 60
    })
}

module.exports = {
    jwtGenerateToken,
}