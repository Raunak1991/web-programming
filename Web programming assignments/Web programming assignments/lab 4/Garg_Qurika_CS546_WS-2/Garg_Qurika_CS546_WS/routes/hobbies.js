const express = require('express');
const router = express.Router();
const data = require("../data");
const hobbiesData = data.hobbies;

router.get("/:hobby", (req, res) => {
    hobbiesData.getHobbyByName(req.params.hobby).then((data) => {
        res.status(200).json(data);
    }, (error) => {
        // Not found!
        res.sendStatus(404);
    });
});

router.get("/", (req, res) => {
    hobbiesData.getAllHobbies().then((data) => {
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