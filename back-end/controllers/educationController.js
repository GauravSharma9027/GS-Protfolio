const Education = require("../models/Education.model");

const addEducation = async (req, res) => {
    try {
        const { startToPassYear, QualificationName, QualificationShortDescription } = req.body;
        if (!startToPassYear && !QualificationName && !QualificationShortDescription) {
            return res.status(301).json({
                success: false,
                message: "Something is missing! "
            });
        }
        await Education.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Data is Successfully save"
        })
    } catch (error) {
        console.log("error in addEducation function: ", error);
    }
}

const getEducation = async (req, res) => {
    try {
        const educations = await Education.find();
        return res.status(200).json({
            success:true,
            data: educations,
        })
    } catch (error) {
        console.log("error in getEducation function", error);
    }
}
module.exports = {
    addEducation,
    getEducation,
}
