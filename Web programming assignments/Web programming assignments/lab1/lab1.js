function sumOfSquares(num1, num2, num3)
{
    if(num1 ===undefined || typeof num1!=="number" ){
        throw "num1 is not a number";
    }
    if(num2 ===undefined || typeof num2!=="number" ){
        throw "num2 is not a number";
    }
    if(num3 ===undefined || typeof num3!=="number" ){
        throw "num3 is not a number";
    }
    let Sum=0,square1,square2,square3;
    square1=num1*num1;
    square2=num2*num2;
    square3=num3*num3;
    Sum= square1+square2+square3;
    return Sum;    
}

console.log(sumOfSquares(5,3,10))
console.log("------------------------")

 function sayHelloTo(firstName, lastName, title)
 {
     let patString=/[a-zA-Z]/;
     if(!patString.test(firstName)){
        throw "firstName is not a string";
    }
     if(!patString.test(lastName)  ){
        throw "lastName is not a string";
    }
     if(!patString.test(title)  ){
        throw "firstName is not a string";
    }
     switch(arguments.length)
     {
         case 0: const err = new Error('throws');
                 console.log(err.message);
                 break;         
         case 1: console.log(`Hello, ${firstName}`);
                 break;
         case 2: console.log(`Hello, ${firstName} ${lastName}. I hope you are having a good day!`);
                 break;
         case 3:  console.log(`Hello, ${title} ${firstName} ${lastName}!Have a good evening`);
                 break; 
         default: console.log("Invalid input");              
     }
 }

sayHelloTo();
sayHelloTo("pHIL");
sayHelloTo("pHIL", "bARESSI");
sayHelloTo("pHIL", "bARESSI","mR");
console.log("------------------------")

function cupsOfCoffee(howManyCups)
{
    if(howManyCups ===undefined || typeof howManyCups!=="number" ){
        throw "howManyCups is not a number";
    }
    if(howManyCups<0){
        throw "Value of howManyCups is negative"
    }

    if(howManyCups===0){
        throw "Value of howManyCups is zero"
    }    
    let count
    let a="";
    for(count=howManyCups;count>=1;count--)
    {
        
        if(count==1){
           a=a+`\n${count} cups of coffee on the desk! ${count} cups of coffee!\nPick it up, drink the cup, no more coffee left on the desk!`;
           
        }
       else{     
           a=a+`${count} cups of coffee on the desk! ${count} cups of coffee!\nPick one up, drink the cup, ${count-1} cups of coffee on the desk!\n\n`;
        }
    }

    return a;

}

console.log(cupsOfCoffee(5));
console.log("---------------------")

function occurrencesOfSubstring(fullString, substring){
      let patString=/[a-zA-Z]/;
     if(fullString ===undefined || !patString.test(fullString)  ){
        throw "fullString is not a string";
    }
     if(substring ===undefined || !patString.test(substring)  ){
        throw "substring is not a string";
    }
    let temp1,temp2,count=0,tempCount=0;
    for(temp1=0;temp1<fullString.length; temp1++){
        tempCount=0;
        for(temp2=0;temp2<substring.length; temp2++){
            if(substring[temp2]== fullString[temp1+temp2]){
               tempCount++;         
              }     
     }
        if(tempCount==substring.length){
        count++;               
        }
    }
    
    return count;
   }

console.log(occurrencesOfSubstring("hello world", "o"));
console.log(occurrencesOfSubstring("Helllllllo, class!","ll"));
console.log("-----------------------------")

function randomizeSentences(paragraph)
{
  let answer="";
  let patString=/[a-zA-Z]/;
     if(paragraph ===undefined || !patString.test(paragraph)  ){
        throw "paragraph is not a string";
    }
    let mainArr=paragraph.split(" ");
    let forVar,randomVar,temp;
    for(forVar=mainArr.length - 1;forVar > 0;forVar--){
        randomVar=Math.floor(Math.random()*(forVar+1));
        temp=mainArr[forVar];
        mainArr[forVar]=mainArr[randomVar];
        mainArr[randomVar]=temp;            
    }  
    answer=mainArr.join(" ");
    return answer;
}

console.log(randomizeSentences("Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations."));
console.log("---------------------------------")