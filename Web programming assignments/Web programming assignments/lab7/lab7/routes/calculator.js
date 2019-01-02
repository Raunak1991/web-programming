const express = require('express');
const router = express.Router();
const data=require("../data");
const stringCalculate=data.stringCalculate;

// You will make three routes:
// GET /clientform
// GET /serverform
// POST /serverform
// Both GET routes will provide a valid HTML document; each will have the form detailed above
// GET /clientform will compute and render the results on the client
// GET /serverform will POST the form to POST /serverform
// Each will perform error checking, show errors, and show results

router.get("/clientform",(req,res)=>{
    res.render('clientform',{});

});

router.get("/serverform",(req,res)=>{
res.render('serverform',{});
});

router.post("/serverform",(req,res)=>{
    let firstText=req.body.text1;
    let secondText=req.body.text2;
    let firstNumber=parseInt(req.body.number1);
    let secondNumber=parseInt(req.body.number2);
    let result=[];

   // console.log(`firstNumber ${firstNumber},secondNumber:${secondNumber},firstText:${firstText},secondText:${secondText}`)
try{
    result=stringCalculate.operationString(firstText,secondText,firstNumber,secondNumber);
    // console.log("\n")
    // console.log("RESULT"+result);
}

catch(e)
{
    res.render('serverform',{firstNumber:firstNumber,secondNumber:secondNumber,firstText:firstText,secondText:secondText,error:e});
    return;
}

res.render('serverform',{firstNumber:firstNumber,secondNumber:secondNumber,firstText:firstText,secondText:secondText,result:result});


});

module.exports = router;