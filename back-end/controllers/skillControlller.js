const Skill = require('../models/Skill.model');
const { uploadToCloudinary } = require('../middleware/cloudinaryMiddleware');

const addSkills = async (req, res) => {
    try {
        if (req.file) {
            try {
                const result = await uploadToCloudinary(req.file);
                req.body.skillLogo = result.secure_url;
            } catch (error) {
                console.log("error in req.file of skill Controller: ", error);
            }
        }
        const { skillName, skillPercentage, skillDescription, skillLogo } = req.body;
        if (!skillName || !skillPercentage || !skillDescription || !skillLogo || skillName === " " || skillPercentage === " " || skillDescription === " " || skillLogo === " ") {
            return res.status(500).json({
                message: "Something is missing!",
                success: false
            });
        }
        await Skill.create(req.body);
        res.status(200).json({
            message: "Submit Successfully",
            success: true
        });
    } catch (error) {
        console.log("error in addSkills function of skill Controller: ", error);
    }
}

const getSkills = async (req, res) => {
    try {
        const skillData = await Skill.find({});
        return res.status(200).json({
            data: skillData,
            success: true
        })
    } catch (error) {
        console.log("error in get Skill function: ", error);
    }
}

const editSkills = async (req, res) => {
    try {
        const id = req.params.id;
        const skill = await Skill.findById({ _id: id });
        // Check if skill exists
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found",
            });
        }

        if (req.file) {
            try {
                const result = await uploadToCloudinary(req.file);
                req.body.skillLogo = result.secure_url;
            } catch (error) {
                console.log("error in req.file: ", error);
            }
        }
        // ############################
        let isAnyFieldUpdated = false;
        Object.keys(req.body).filter((key) => {
            if (req.body[key] !== undefined && req.body[key] !== null && req.body[key] !== " ") {
                skill[key] = req.body[key];
                isAnyFieldUpdated = true; // Mark that at least one field has been updated
            }
        });
        if (!isAnyFieldUpdated) {
            return res.status(400).json({
                success: false,
                message: "No valid input fields provided"
            })
        }

        await skill.save();
        res.status(201).json({
            message: "Skill is updated Successfully",
            success: true
        })
    } catch (error) {
        console.log("error in editSkills function", error);
    }
}

const deleteSkill = async (req, res) => {
    try {
        const id = req.params.id;
        await Skill.deleteOne({ _id: id });
        return res.status(200).json({
            message: "Delete Successfully",
            success: true
        })
    } catch (error) {
        console.log("error in  deleteSkill function: ", error);
    }
}
module.exports = {
    addSkills,
    getSkills,
    editSkills,
    deleteSkill,
}