const textMetric=require("./textMetric")
const fileData = require('./fileData.js')


//1.
   fileData.getFileAsString('the-c-team.json')
   .then((data)=>{
     console.log(data)})    
.then(undefined, console.error)



//2

setTimeout(function(){
fileData.getFileAsJSON('the-c-team.json')
.then((data)=>{
     console.log(data)})    
.then(undefined, console.error)
},2000); 

//3.
setTimeout(function(){
fileData.saveStringToFile("newFile1.txt","welcome to Cs-546. raunak Garg")
.then((data)=>{
     console.log(data)})    
.then(undefined, console.error)
},3000);


setTimeout(function(){
 var obj={ name: 'Philip Barese',  codename: 'The Spy',  role: 'inconspicuously making your coffee while overhearing all your secret plans.' }
 fileData.saveJSONToFile("newFile2.json",obj)
 .then((data)=>{
     console.log(data)})    
.then(undefined, console.error)
},4000);


//text metric applied to string given in question

setTimeout(function(){
  let text="Hello, my friends! This is a great day to say hello.";
 textMetric.createMetrics(text)
 .then(function(data)
 {
      console.log("Data calculated after text metric")
       console.log(data)
     })
    .then(undefined, console.error)
    
 
},5000);


//textmetric applied to chapter 1

setTimeout(function(){
 var chapter1=fileData.getFileAsString('chapter1.txt');
chapter1.then((data)=>{
    textMetric.createMetrics(data)
 .then((data2)=>{
     console.log("chapter 1");
    console.log(data2);
 }) 
 .then(undefined, console.error)
});
},6000);


//textmetric applied to chapter 2
setTimeout(function(){
 var chapter2=fileData.getFileAsString('chapter2.txt');
chapter2.then((data)=>{
    textMetric.createMetrics(data)
 .then((data2)=>{
     console.log("chapter 2");
    console.log(data2);
 }) 
 .then(undefined, console.error)
});
},7000);

//textmetric applied to chapter 3
setTimeout(function(){
 var chapter3=fileData.getFileAsString('chapter3.txt');
chapter3.then((data)=>{
    textMetric.createMetrics(data)
 .then((data2)=>{
    console.log("chapter 3");
    console.log(data2);
 }) 
 .then(undefined, console.error)
});
},8000);
