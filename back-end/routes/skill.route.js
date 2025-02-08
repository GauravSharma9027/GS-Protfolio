const express = require("express");
const { uploadSingle } = require("../middleware/cloudinaryMiddleware");
const { addSkills, getSkills, editSkills, deleteSkill } = require("../controllers/skillControlller");
const router = express.Router();

router.post("/fill/user/skill", uploadSingle("skillLogo"), (req, res) => {
    addSkills(req, res);
});

router.get("/get/user/skill", (req, res) => {
    getSkills(req, res);
});

router.put("/edit/user/skill/:id", uploadSingle("skillLogo"), (req,res)=>{
    editSkills(req,res);
});

router.delete("/delete/user/skill/:id",(req,res)=>{
    deleteSkill(req,res);
});


module.exports = router