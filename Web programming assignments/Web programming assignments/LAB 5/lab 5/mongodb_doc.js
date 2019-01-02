var MongoClient = require('mongodb').MongoClient,
    runStartUp = require("./startup_doc.js"),
    uuid=require('node-uuid'),
    settings = require("./config.js");

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
{ }
var exports = module.exports = {};

runStartUp().then(function (allRecepies) {
    console.log("After data has been inserted. Wehave follwing recepies:");
    console.log(allRecepies);
});

MongoClient.connect(fullMongoUrl).then(function (db) {
    var recepieCollection = db.collection("recepiesCollection");

    //get all recepies
    exports.getAllRecepies = function () {
        return recepieCollection.find().toArray();
    };


    //1. GET	/recipes
    exports.getAllRecepiesIdAndTitle = function () {
        return recepieCollection.find({}, { title: 1 }).toArray();
    };


    //get recepie by id
    //2. GET	/recipes/:id
    exports.getRecepieById = function (id) {
        if (id == undefined)
            return Promise.reject("Please provide id to get recepie");

        return recepieCollection.find({ _id: id }).limit(1).toArray().then(function (recepieList) {
            if (recepieList.length == 0) throw "Recpie with following id could not be found " + id;
            return recepieList[0];
        });
    };



    //3. post /recipes
    exports.createRecepies = function (title, steps,ingredients,comments) {
        if (!title||typeof title !=="string") return Promise.reject("Please provide recipe title");

        if (!Array.isArray(steps)) return Promise.reject("please provide valid steps")

        let newRecipe={
            _id:uuid.v4(),
            title:title,
            steps:steps,
           ingredients:ingredients,
            comments:comments

        };

         return recepieCollection.insertOne(newRecipe).then(function (data) {
            return data.insertedId;
        }).then(function (newId) {
            return exports.getRecepieById(newId);

        });



    };


    //4.  PUT /recipes/:id
    exports.updateRecipe = function (id, recipeData) {
        if (!id) return Promise.reject("Please provide recipe id");

        let updatedRecipe={};
        if(recipeData.title){
            updatedRecipe.title=recipeData.title;
        }
        if(recipeData.ingredients){
            updatedRecipe.ingredients=recipeData.ingredients;
        }
        if(recipeData.steps){
            updatedRecipe.steps=recipeData.steps;
        }
        if(recipeData.comments){
            updatedRecipe.comments=recipeData.comments;
        }

 let updateCommand = {
                $set: updatedRecipe
            };


       return recepieCollection.updateOne({ _id: id },updateCommand).then(function () {
          return  exports.getRecepieById(id);

        });

    };


    /// 5. DELETE	/recipes/:id
    exports.deleteRecipe = function (id) {
        if (!id) return Promis.reject("Please provide id to delete recipe");

        return recepieCollection.removeOne({ _id: id }).then(function (deleteInfo) {
            if (deleteInfo.deletedCount == 0)
                throw "could not find the document with given id" + id;

            return true;
        });

    };

   



    //6.  GET	/comments/recipe/:recipeId
    //returns list of all comments in specified Recpie  
    exports.getListOfAllCommentsByRecipe = function (id) {
        if (id == undefined)
            return Promise.reject("Please provide id to get recepie");

        return recepieCollection.find({ _id: id }, {comments:1,title:1}).limit(1).toArray().then(function (recepieList) {
            if (recepieList.length == 0) throw "comment with following id could not be found " + id;
            return recepieList[0];
        });
    };




    //7. GET	/comments/:commentId
    //returns list of all comments withCommentId
    exports.getCommentsById = function (comentId) {
        // return recepieCollection.find({ 'comments._id': comentId }, { comments: 1,title:1 }).limit(1).toArray().then(function (recepieList) {
        //     if (recepieList.length == 0) throw "Comment with following id could not be found " + comentId;
        //     return recepieList[0];
        // });


        return recepieCollection.find({"comments._id": comentId },{'comments.$':1,title:1}).toArray().then(function (data) {
            if (data.length == 0) throw "Comment with following id could not be found " + comentId;
            return data[0];
        });
    };


    //8.POST	/comments/:recipeId/
    exports.addComment = function (recepieId, poster, comment) {
        if (!recepieId) return Promise.reject("Please provide recipe id for comment to be added");

        if (poster == null || comment == null) return Promise.reject("Please valid comment or poster");

        //var docId2 = 0;
        var commentIdDemo=uuid.v4();
        return recepieCollection.updateOne({ '_id': recepieId }, { $push: { 'comments': { '_id': commentIdDemo, 'poster': poster, 'comment': comment } } }).then(function (data) {
            //return exports.getRecepieById(recepieId);

            //console.log(data)

           return exports.getCommentsById(commentIdDemo);

           
        });
    };
  
            
            
    //9.PUT	/comments/:recipeId/:commentId
    exports.updateComment = function (recipeId, commentId, poster,comment) {
        if (!recipeId) return Promise.reject("Please provide recipe id for comment to be added");
      
        if (commentId == null) return Promise.reject("Please valid commentID");

        if(!comment){
            
        return recepieCollection.update({ '_id':recipeId,'comments._id': commentId }, { $set: { 'comments.$.poster': poster } }).then(function () {
                return exports.getCommentsById(commentId);
        });
        }

        else  if(!poster){
            
        return recepieCollection.update({ '_id':recipeId,'comments._id': commentId }, { $set: { 'comments.$.comment': comment } }).then(function () {
                return exports.getCommentsById(commentId);
        });
        }
        else{
            return recepieCollection.update({ '_id':recipeId,'comments._id': commentId }, { $set: { 'comments.$.comment': comment ,'comments.$.poster': poster} }).then(function () {
                return exports.getCommentsById(commentId);
        });
        }
        

    };

    //  exports.updateComment = function (recipeId, commentId,commentData) {

    //         let updatedCommentData={};

    //     //  exports.getCommentsById(commentId).then(function(data){
    //     //      updatedCommentData=data;
    //     //  });
         
    //      if(commentData.poster){
    //          updatedCommentData.poster=commentData.poster;
    //      }

    //      if(commentData.comment){
    //          updatedCommentData.comment=commentData.comment;
    //      }
    //     if (!recipeId) return Promise.reject("Please provide recipe id for comment to be added");
      
    //     if (commentId == null) return Promise.reject("Please valid commentID");
            
    //         // let updateCommand={
    //         //     $set:updatedCommentData
    //         // };
    //         console.log(updatedCommentData);

    //     return recepieCollection.update({ '_id':recipeId,'comments._id': commentId }, {$set:{"comments.$":{updatedCommentData}}}).then(function () {
    //             return exports.getCommentsById(commentId);
    //     });
    // };





  
    //10.DELETE	/comments/:id
    //delete specified comment
    exports.deleteComment = function (commentId) {
        if (!commentId) return Promise.reject("Please provide valid comment uid to delete comment");


 exports.getCommentsById(commentId).then(function(data){
 if (!Array.isArray(data)) return Promise.reject("please provide comments")

});
                  
       return recepieCollection.update({},{$pull:{"comments":{"_id":commentId}}},{multi:true}).then(function (deleteInfo) {
                          
          
         if (deleteInfo.result.nModified ===0){
                   
            throw "Comment could not be delted with specified id" + commentId;
            
         }
               else
                return 1;

            
        });
    };
});



