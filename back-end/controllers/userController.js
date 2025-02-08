const { uploadToCloudinary } = require("../middleware/cloudinaryMiddleware");
const User = require("../models/user.model");
// const path = require('path');


const fillUserInformation = async (req, res) => {
    try {
        const userCount = await User.countDocuments({});
        if (userCount >= 1) {
            if (req.files) {
                try {
                    if(req.files.profilePhoto){
                        let result = await uploadToCloudinary(req.files.profilePhoto[0]); // Use buffer
                        req.body.profilePhoto = result.secure_url;
                    }
                    if(req.files.resumePhoto){
                        let result = await uploadToCloudinary(req.files.resumePhoto[0]); // Use buffer
                        req.body.resumePhoto = result.secure_url;
                    }
                } catch (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return res.status(500).json({ success: false, message: "File upload failed" });
                }
            }

            //  require only for validation
            const {
                username,
                email,
                number,
            } = req.body;
            // Validate input (add more checks as needed)
            if (!username || !email || !number || username == " " || email == " " || number == " ") {
                return res.status(400).json({
                    success: false,
                    message: "Something is Missing !",
                });
            }

            // Create user in the database
            await User.create(req.body);
            return res.status(201).json({
                message: "User information has been successfully saved.",
                success: true,
            });
        }
        return res.status(429).json({
            message: "Too many request, Now you can Edit Only",
            success: false,
            userCount,
        })
    } catch (error) {
        // Log the error
        console.error("Error in fillUserInformation:", error);
        // Error response
        res.status(500).json({
            success: false,
            message: "An error occurred while saving user information.",
        });
    }
};

// const fillUserInformation = async (req, res) => {
//     try {
//         const userCount = await User.countDocuments({});
//         if (userCount >= 0) {
//             // Check for uploaded files and handle Cloudinary upload
//             if (req.files) {
//                 console.log("Files received for upload:", req.files);
//                 if (req.files.profilePhoto) {
//                     console.log("Uploading Profile Photo...");
//                     try {
//                         let result = await uploadToCloudinary(req.files.profilePhoto[0]);
//                         console.log("Profile photo upload result:", result);
//                         req.body.profilePhoto = result.secure_url;
//                     } catch (error) {
//                         console.error("Error uploading profile photo:", error);
//                         return res.status(500).json({ success: false, message: "Profile photo upload failed" });
//                     }
//                 }

//                 if (req.files.resumePhoto) {
//                     console.log("Uploading Resume Photo...");
//                     try {
//                         let result = await uploadToCloudinary(req.files.resumePhoto[0]);
//                         console.log("Resume photo upload result:", result);
//                         req.body.resumePhoto = result.secure_url;
//                     } catch (error) {
//                         console.error("Error uploading resume photo:", error);
//                         return res.status(500).json({ success: false, message: "Resume photo upload failed" });
//                     }
//                 }
//             } else {
//                 console.log("No files uploaded");
//             }

//             // Validate fields
//             const { username, email, number } = req.body;
//             if (!username || !email || !number || username.trim() === "" || email.trim() === "" || number.trim() === "") {
//                 console.log("Missing required fields");
//                 return res.status(400).json({
//                     success: false,
//                     message: "Some required fields are missing!"
//                 });
//             }

//             // Create user and save to the database
//             console.log("Creating user in database with data:", req.body);
//             await User.create(req.body);

//             return res.status(201).json({
//                 message: "User information successfully saved.",
//                 success: true,
//             });
//         } else {
//             console.log("User count exceeded, editing only.");
//             return res.status(429).json({
//                 message: "Too many requests. You can only edit.",
//                 success: false,
//                 userCount,
//             });
//         }
//     } catch (error) {
//         console.error("Error in processing user information:", error);
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while saving user information.",
//         });
//     }
// };


const editUserInformation = async (req, res) => {
    try {
        const [userData] = await User.find();
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // const filnalUserData = userData[0]
        if (req.files) {
            if(req.files.profilePhoto){
                try {
                    let result = await uploadToCloudinary(req.files.profilePhoto[0]); // Use buffer
                    req.body.profilePhoto = result.secure_url;
                } catch (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return res.status(500).json({ success: false, message: "File upload failed" });
                }
            }
            if(req.files.resumePhoto){
                try {
                    let result = await uploadToCloudinary(req.files.resumePhoto[0]); // Use buffer
                    req.body.resumePhoto = result.secure_url;
                } catch (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return res.status(500).json({ success: false, message: "File upload failed" });
                }
            }
        }

        // ##### Dynamically update only provided fields
        let isAnyFieldUpdated = false;
        Object.keys(req.body).filter((key) => {
            if (req.body[key] !== undefined && req.body[key] !== null && req.body[key] !== " ") {
                userData[key] = req.body[key];
                isAnyFieldUpdated = true; // Mark that at least one field has been updated
            }
        });

        if (!isAnyFieldUpdated) {
            return res.status(400).json({
                success: false,
                message: "No valid input fields provided"
            })
        }

        //## OR 
        // const allowedFields = [
        //     username,
        //     profession,
        //     profilePhoto,
        //     welcomeMsg,
        //     email,
        //     number,
        //     linkedin,
        //     whatAppNumber,
        //     hackerRank,
        //     leetCode,
        //     userDescription
        // ];

        // allowedFields.forEach((field) => {
        //     if (req.body[field] !== undefined && req.body[field] !== null && req.body[field] !== "") {
        //         userData[field] = req.body[field]; // Update only non-empty fields
        //     }
        // });

        await userData.save();
        return res.status(201).json({
            success: true,
            message: "Data is updated Successfully",
        })
    } catch (error) {
        console.log("error in editUserInformation function", error);
    }
}

const getUserInformation = async (req, res) => {
    try {
        const [userInformation] = await User.find({});
        return res.status(200).json({
            success: true,
            data: userInformation
        })
    } catch (error) {
        console.log(" Error in getUserInformation function ", error);
    }
}
module.exports = {
    fillUserInformation,
    getUserInformation,
    editUserInformation,
};
