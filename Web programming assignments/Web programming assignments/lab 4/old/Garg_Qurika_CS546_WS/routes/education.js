const express = require('express');
const router = express.Router();
const data = require("../data");
const educationData= data.education;

router.get("/:name", (req, res) => {
    educationData.getEducationByName(req.params.name).then((data) => {
        var a=req.params.name;
        if(a=="highschool"){
            res.status(200).json('school:'+data.school)}
        else{
            if(a=="undergrad"){
            res.status(200).json('school:'+data.school+' '+'degree:'+data.degree);
            }
            

        }
    }, (error) => {
        // Not found!
        res.sendStatus(404);
    });
});

router.get("/", (req, res) => {
    educationData.getAllEducation().then((data) => {
        res.json(data);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
    // Not implemented
    res.sendStatus(501);
})

module.exports = router;