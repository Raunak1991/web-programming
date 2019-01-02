const express = require('express');
const router = express.Router();
const xss = require('xss');
var fs = require('fs');

function comp(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}


router.post("/nextnote", function(request, response) {
    //console.log("nextnote");
    //console.log(request.body);
    console.log(request.body.date);
     var result = [];
     var newReadData = JSON.parse(fs.readFileSync('file.json', 'utf8'));
    newReadData.sort(comp);
    // console.log(newReadData);
let currdata,nextData;

    for (let i=0;i<newReadData.length;i++){
  //console.log(newReadData[i] +"at"+i);
 if(newReadData[i].date===request.body.date){
      // console.log(newReadData[i].title)
            // result.push(newReadData[i]);
            // console.log(result[i])
            currdata=newReadData[i];
            nextData=newReadData[i+1];
            break;


    }
    }
        
        // console.log(currdata)
        // console.log(nextData)
        // console.log(nextData.title)
if(nextData===undefined){
     response.json({success:false});
}
else{
    response.json({success:true, "title":xss(nextData.title), "summary":xss(nextData.summary),"date":xss(nextData.date),"body":xss(nextData.body)});
}

});

module.exports = router;