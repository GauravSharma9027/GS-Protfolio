const Admin = require("../../models/Admin/admin");
const bcrypt = require('bcrypt');
const { jwtGenerateToken } = require("../../utils/jwt.generatetoken.utils");
const { TokenExpiredError } = require("jsonwebtoken");
// const adminRegister = async (req,res)=>{
//     try {
//         const {adminName ,adminEmail ,adminNumber ,adminPassword } = req.body;
//         if(!adminName || !adminEmail || !adminNumber || !adminPassword || adminName == " " || adminEmail == " " || adminNumber == " " || adminPassword == " " ){
//             return res.status(400).json({
//                 message: "something is missing!",
//                 success: false
//             });
//         }

//         await Admin.create(req.body);
//         return res.status(200).json({
//             message:"User Register successfully",
//             success: true,
//         });
//     } catch (error) {
//         console.log("Error in Admin register function",error);
//     }
// }

const adminRegister = async (req, res) => {
    try {
        const bcryptPassword = await bcrypt.hashSync("gaurav123", 10);
        const adminDetails = {
            adminName: "Gaurav Shara",
            adminEmail: "gauravsharma02753@gmail.com",
            adminNumber: 902753568,
            adminPassword: bcryptPassword,
        }
        const adminResponse = await Admin.create(adminDetails);
        const payload = {
            id: adminResponse.id,
            email: adminResponse.adminEmail,
            password: adminResponse.adminPassword
        }
        jwtGenerateToken(payload)// adminDetails.adminEmail ye humne payload send kiya hai
    } catch (error) {
        console.log("Error in Admin register function", error);
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password || email == "" || password == "") {
            return res.status(400).json({
                message: "something is missing!",
                success: false
            });
        }
        const admin = await Admin.findOne({ adminEmail: email });
        if (!admin) {
            return res.status(401).json({
                message: "Email Not found!",
                success: false,
            })
        } else {
            const isPassword = await bcrypt.compare(password, admin.adminPassword);
            if (!isPassword) {
                return res.status(401).json({
                    message: "Password is Incorrect",
                    success: false,
                })
            } else {
                // // generate token
                const payload = {
                    id: admin.id,
                    email: admin.adminEmail
                }
                const token = jwtGenerateToken(payload, process.env.SECRET_KEY);
                return res.status(200).json({
                    message: "Login successfully",
                    success: true,
                    token,
                })
            }
        }
    } catch (error) {
        console.log("error in admin login function: ", error);
        return res.status(500).json({ error: "internal server error" })
    }
}

const adminLogout = async (req, res) =>{
    try {
        localStorage.removeItem('adminToken');
    } catch (error) {
        console.log(error,"in admin logout");
    }
}

module.exports = {
    adminRegister,
    adminLogin,
}