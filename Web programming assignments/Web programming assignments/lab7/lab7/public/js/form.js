(function () {
    let calculatorMethods = 
    function(string1,string2,number1,number2) {
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
};
       
    

   var staticForm = document.getElementById("clientform");

    if (staticForm) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        var firstText=document.getElementById("text1");
        var secondText=document.getElementById("text2");
        var firstNumberElement = document.getElementById("number1");
        var secondNumberElement = document.getElementById("number2");
        

        var errorContainer = document.getElementById("error-container");
        var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        var resultContainer = document.getElementById("result-container");
        var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];

        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener("submit", function (event) {
              event.preventDefault();

            try {
                // hide containers by default
                errorContainer.classList.add("hidden");
                resultContainer.classList.add("hidden");

                // Values come from inputs as strings, no matter what :(
                var firstTextValue=firstText.value;
                var secondTextValue=secondText.value;
                var firstNumberValue = firstNumberElement.value;
                var secondNumberValue = secondNumberElement.value;
               

                var parsedFirstNumberValue = parseInt(firstNumberValue);
                var parsedSecondNumberValue = parseInt(secondNumberValue);
             //   console.log(firstTextValue,secondTextValue,parsedFirstNumberValue,parsedSecondNumberValue)
                

                var result = calculatorMethods(firstTextValue, secondTextValue,parsedFirstNumberValue,parsedSecondNumberValue);
                //console.log(result);
                resultTextElement.textContent = "The result is " + result;
                resultContainer.classList.remove("hidden");
            } catch (e) {
                var message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();