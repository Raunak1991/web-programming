const express = require('express');
const router = express.Router();
const xss = require('xss');
var fs = require('fs');

function getFileAsJSON(path)
{    
 return new Promise((fulfill, reject) => {
                if(!path) reject("Please provide correct path");
                fs.readFile(path,"utf-8",(error, data)=>{
                    if(error) reject(error);
                    try{
                        var fileObject=JSON.parse(data);
                    } catch(error){
                        reject(error);
                    }
                    fulfill(fileObject);
                });
              });
}

function comp(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}


router.get("/", function(request, response) {
    response.render("newNoteForm", {});

});

router.post("/note", function(request, response) {
    // console.log("post new note function");
    var data = (request.body);
    
    //console.log(data)
    
    var result = [];

    var newReadData = JSON.parse(fs.readFileSync('file.json', 'utf8'));

    for (var i in newReadData)
        result.push(newReadData[i]);
    result.push(data);
   // console.log(result)
    fs.writeFileSync("file.json", JSON.stringify(result), "UTF-8", { 'flags': 'a+' });
    
    //console.log("saved data to file json");
     
    // response.json({ success: true, message: xss(request.body.title)});
     response.json({ success: true, message: xss(request.body.title)});
    // console.log(request.body.title)
   //  response.render("individualNote", {individualDta:individualDta});
    
    

});


module.exports = router;