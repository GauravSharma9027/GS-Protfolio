const { uploadToCloudinary } = require("../middleware/cloudinaryMiddleware");
const Project = require("../models/Project.model");
const { find } = require("../models/user.model");

const addProject = async (req, res) => {
    try {
        if(req.files){
            try {
                if(req.files.projectImage){
                    let result = await uploadToCloudinary(req.files.projectImage[0]);
                    req.body.projectImage = result.secure_url;
                }
                if(req.files.heroImage){
                    let result = await uploadToCloudinary(req.files.heroImage[0]);
                    req.body.heroImage = result.secure_url;
                }
            } catch (error) {
                console.log("cloudinary error in project Controller function: ",error);
            }
        }
        const { heroImage, projectImage, projectTitle, protectShortDescription } = req.body;
        if (!heroImage && !projectImage && !projectTitle && !protectShortDescription) {
            return res.status(301).json({
                success: false,
                message: "Something is missing!"
            });
        }
        await Project.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Data successfully save",
        });
    } catch (error) {
        console.log("error in addProject function in projectController: ", error);
    }
}

const getProject = async (req,res) =>{
    try {
        const projects = await Project.find();
    return res.status(200).json({
        success:true,
        data: projects,
    })
    } catch (error) {
        console.log("error in getProject function from project controller: ",error);
    }
}

module.exports = {
    addProject,
    getProject,
}

