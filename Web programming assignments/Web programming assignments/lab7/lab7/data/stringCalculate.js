let exportedMethods={

    operationString:function(string1,string2,number1,number2) {
         if(string1=='') throw "Please provide content to text area 1";
         if(string2=='') throw "Please provide content to text area 2";
         if(typeof number1 !="number") throw "Must provide a number 1";
         if (isNaN(number1)) throw "Must provide a number 1";
         if(typeof number2 !="number") throw "Must provide a number 2";
         if (isNaN(number2)) throw "Must provide a number 2";
         if(number1 < 1 || number1 >25 || number2 < 1 || number2 > 25) throw "Number should be  greater than or equal to 1 and less than or equal to 25 ";
   
    var result = [];
    var count=0;
    for (var i = 0; count <= number1; i += number2) {
        if(count==number1){
         result.push(string1.substr(i));
         count++;
         break;
        }
         else{
        result.push(string1.substr(i, number2));
        result.push(string2);
        count++;
    }
}    
    return result.join('');
    }

}
module.exports=exportedMethods;