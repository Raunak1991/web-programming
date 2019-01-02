const express = require('express');
const router = express.Router();
const xss = require('xss');
var fs = require('fs');


router.get("/", function(request, response) {

     var result = [];
     //console.log(note)

    var newReadData = JSON.parse(fs.readFileSync('file.json', 'utf8'));

    for (var i in newReadData)
        result.push(newReadData[i]);


    response.render("home", {});
});

module.exports = router;