const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {

    // check request headers has authorization or not means token hai.
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({ error : "invalid token"})
    // user se to request ke sat token aa raha hai use verify kr rhe hai
    const token = req.header.authorization.split(' ')[1]; //request header ke ander authorization se aayegi(header ke authorization me hi token hoga or header se hi aaYEGA)
    if (!token) {
        return res.status(401).json({
            error: "unauthorized",
            success: false,
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY) // decoded me payload return diya hai verify functoin ne
        req.userPayload = decoded;
        next();

    } catch (error) {
        return res.status(403).json({
            error: "Invalid or expired token",
            success: false,
        })
    }
}

module.exports = {
    jwtAuthMiddleware,
}