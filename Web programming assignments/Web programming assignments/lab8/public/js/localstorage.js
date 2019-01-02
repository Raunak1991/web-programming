// Remember, we're in a browser: prevent global variables from happening
// I am passing the jQuery variable into the IIFE so that
// I don't have to rely on global variable name changes in the future
(function ($, localStorage) {
       
    var localStorageTableBody = $("#localstorage-data tbody");
    var clearStorage = $("#clear-storage");

    var keyNameInput = $("#localstorage-key");
    var keyValueInput = $("#localstorage-value");
    var kvpForm = $("#localstorage-form");
    var formAlert = $("#form-alert");
    let clickSubmit=0;
    var hh="Hash";
    


    function resetTable() {
        localStorageTableBody.empty();

        // We use the localStorage.key(number) property to get the key name at index number
        for (var i = 0; i < localStorage.length; i++) {
            var currentKey = localStorage.key(i);
            var curentValue = localStorage[currentKey];

            //var asJSON = JSON.parse(curentValue);
            //var typeAfterParsing = typeof asJSON;

            var newHtmlString = "<tr><td>" + currentKey + "</td><td>" + curentValue + "</td></tr>"
            localStorageTableBody.append(newHtmlString);
        }
    }

    window.onload = function () {

        //localStorage.clear();
        var countIterations = 0;
        var intervalId = window.setInterval(function () {
        var iteration = ++countIterations;
        localStorage["Interval"]=iteration; 
       resetTable();
    }, 1500);

   $(window).on('hashchange', function () {
            localStorage[hh] = location.hash.replace("#", "");
            resetTable();
        });


    }
    
    

    clearStorage.click(function () {
        localStorage.clear();
        resetTable();
    });

    kvpForm.submit(function (event) {
        clickSubmit++;
        event.preventDefault();

        // reset the form
        formAlert.addClass('hidden');
        formAlert.text('');

        var keyStr = "Last Inputed Value";
        var valStr = keyValueInput.val();

        

        if (!keyValueInput) {
            formAlert.text('You must provide a key name');
            formAlert.removeClass('hidden');
            return;
        }

        // check if it's in the format of an object
        var jsonString = valStr;

        try {
            // this will throw when given a non JSON string
            JSON.parse(valStr);
            

            // if this succeeded, the user passed us something we could parse, and we don't have to encode it further
        } catch (e) {
            // this did not succeed, which means that the user passed us some sort of string
            jsonString = JSON.stringify(valStr);
        }

        localStorage[keyStr] = jsonString;
        localStorage["Form Submitted"]=clickSubmit;

        

        // keyNameInput.val('');
         keyValueInput.val('');

        location.hash = "#some-time";

       //resetTable();
    });

    // Now we setup our table
    resetTable();
    
      
})(jQuery, window.localStorage);
// jQuery is exported as $ and jQuery
// the location API is accessed via the window.location variable
