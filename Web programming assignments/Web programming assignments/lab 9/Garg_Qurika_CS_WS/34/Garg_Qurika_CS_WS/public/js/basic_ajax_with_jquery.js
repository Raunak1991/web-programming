
(function ($) {
    // Let's start writing AJAX calls!

    var newContent = $("#new-content");
    var myNewTaskForm = $("#new-item-form"),
        newNameInput = $("#new-task-name"),
        newDescriptionDate = $("#new-task-date"),
        newDecriptionArea = $("#new-task-description"),
        newDescriptionBody = $("#new-task-note");
    //alert("variable check js ajax file");

    var individualForm = $("#individualForm");
    var individualNoteDataId = $("noteData");
    
    var noteTitleAttr =$("#note_Title").attr("value");
    var noteSummaryAttr =$("#noteSummary").attr("value");
    var notecurrDateAttr =$("#currDate").attr("value");
    var noteBodyAttr =$("#noteBody").attr("value");

    var newName = newNameInput.val();
        var newDescriptionDateVal = newDescriptionDate.val();
        var newDescription = newDecriptionArea.val();
        var newDescriptionBodyVal = newDescriptionBody.val();
        var errorVal = $("#error");
        var currDate=newDescriptionDateVal;



myNewTaskForm.submit(function (event) {
        event.preventDefault();
        var newName = newNameInput.val();
        var newDescriptionDateVal = newDescriptionDate.val();
        var newDescription = newDecriptionArea.val();
        var newDescriptionBodyVal = newDescriptionBody.val();
        var errorVal = $("#error");

      //  alert(newName + " " + newDescriptionDateVal + " " + newDescription + " " + newDescriptionBodyVal);
    //    alert("temp variables created");
if(!newName) errorVal.html("Please provide note title");
if(!newDescription) errorVal.html("Please provide summary");
if(!newDescriptionDateVal) errorVal.html("Please provide note due date");
if(!newDescriptionBodyVal) errorVal.html("Please provide note body");
        if (newName && newDescription && newDescriptionBodyVal && newDescriptionDateVal) {
           // alert("check func inside");
           var requestConfig= {
                type: "POST",
                url: "/new/note", 
                contentType: 'application/json',
                data: JSON.stringify({
                    title: newName,
                    summary: newDescription,
                    date: newDescriptionDateVal,
                    body: newDescriptionBodyVal
                })
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                //console.log(responseMessage);
                 newContent.html("Note added and taking to that page");
                // window.location.href({individualDta})
                let url='http://localhost:3800/'+responseMessage.message;
              //  alert(url);
                // alert("Data Saved: " + responseMessage.message);
            window.location.replace(url);
            // alert("redirected");
            }).catch(function (error){
                              
                 errorVal.html("Page cannot be displayed due to error");
            });

        }

        
    });


    $('#link_id').click(function (event) {
       // alert("link next node clicked");
         notecurrDateAttr =$("#currDate").attr("value");
       // alert(newName);
     //alert("reading json");
    //    debugger;
         var requestConfig= {
                type: "POST",
                url: "/next/nextnote", 
                contentType: 'application/json',
                data: JSON.stringify({
                   date: notecurrDateAttr
                }),

                success:function(response){
                    debugger
                    if(response.success==false){
                        alert("No more records found");
                    }
                    else{
                   $("#note_Title").text(response.title);
                   $("#note_Title").attr('value', response.title);
                     $("#noteSummary").text(response.summary);
                     $("#noteSummary").val(response.summary);
                       $("#currDate").text(response.date);
                      $("#currDate").attr('value', response.date);
                         $("#noteBody").text(response.body);
                         $("#noteBody").val(response.body);
                    }
                },

                error: function(error){
                    debugger
                    alert("Reached end of file /n Please click on first page link or create new note");
                }

            };
             $.ajax(requestConfig);
     });   
      

    


})(window.jQuery);