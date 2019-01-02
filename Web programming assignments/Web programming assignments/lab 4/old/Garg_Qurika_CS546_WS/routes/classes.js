const express = require('express');
const router = express.Router();
const data = require("../data");
const classesData = data.classes;

router.get("/details", (req, res) => {
    var code=req.query.code;
    classesData.getClassCode(code).then((data) => {
        res.status(200).json(data);
    }, (error) => {
        // Not found!
       
        res.sendStatus(404);
    });
});

router.get("/", (req, res) => {
    classesData.getAllClass().then((data) => {
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