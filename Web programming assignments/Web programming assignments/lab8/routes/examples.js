const express = require('express');
const router = express.Router();

router.get("/window", (req, res) => {
    // same HTML for manual dom and jquery dom
    res.render("examples/window", {
        partial: "window-scripts"
    });
});



router.get("/localstorage", (req, res) => {
    // same HTML for manual dom and jquery dom
    res.render("examples/localstorage", {
        partial: "localstorage-scripts"
    });
});


module.exports = router;