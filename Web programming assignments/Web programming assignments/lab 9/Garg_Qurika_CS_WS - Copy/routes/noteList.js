const express = require('express');
const router = express.Router();
const xss = require('xss');
var fs = require('fs');
var content;

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


router.get("/", function (request, response) {

   
    getFileAsJSON('file.json').then((data)=>{  
    data.sort(comp);
    response.render("noteList", { data: data });
});
});

router.get("/:note", (req, res) => {
        let title=req.params.note;
        getFileAsJSON('file.json').then((data)=>{  
        data.sort(comp);          
        let individualDta=data.filter(x => x.title === title).shift();
        if(individualDta ===undefined){
            res.status(404).render('error', {title: "Sorry, page not found"});
        }
        res.render('individualNote',({individualDta:individualDta})).catch(()=>{
           res.status(404).render('error', {title: "Sorry, page not found"});
        });
    });
 
});

module.exports = router;
