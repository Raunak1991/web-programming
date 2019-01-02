const   express = require("express"),
        bodyParser = require('body-parser'),
        recipeData = require('./mongodb_doc.js'),
       // router=expres.Router(),
        app = express();

app.use(bodyParser.json());
//configRoutes(app);

app.get("//recipes",function(req,res){
    recipeData.getAllRecepies().then()
});


 //1. GET	/recipes
 app.get("/recipes", function(req,res){
     recipeData.getAllRecepiesIdAndTitle().then(function(data){
         res.status(200).json(data);

     });
 });

 //2. GET	/recipes/:id
 app.get("/recipes/:id", function (req, res) {
     let recipeId = req.params.id;
     
     recipeData.getRecepieById((recipeId)).then(function (data) {
         res.status(200).json(data);
     }, function (errorMessage) {
         res.status(500).json({ error: errorMessage });
     });
 });


 //3. post /recipes
 app.post("/recipes",function(req,res){
     let recipeBody=req.body;      
     recipeData.createRecepies(recipeBody.title,recipeBody.steps,recipeBody.ingredients,recipeBody.comments).then(function(data){
     res.status(200).json(data);
     },function(errorMessage){
         res.status(500).json({error:errorMessage});
     });
 });

//4.  PUT /recipes/:id

// app.put("/recipes/:id",function(req,res){
//      let title=req.body.title;
//      let id=req.params.id;
//      recipeData.updateRecipe(id,title).then(function(data){
//      res.status(200).json(data);
//      },function(errorMessage){
//          res.status(500).json({error:errorMessage});
//      });
//  });
app.put("/recipes/:id",function(req,res){
     let recipeBody=req.body;
     let id=req.params.id;
     recipeData.updateRecipe(id,recipeBody).then(function(data){
     res.status(200).json(data);
     },function(errorMessage){
         res.status(500).json({error:errorMessage});
     });
 });


 /// 5. DELETE	/recipes/:id
app.delete("/recipes/:id",function(req,res){
    let recipeId=req.params.id;
    recipeData.deleteRecipe(recipeId).then(function(data){
    res.status(200).json({sucess:data});    
    },function(errorMessage){
        res.status(500).json({error:errorMessage});
    });
});

 


  //6.  GET	/comments/recipe/:recipeId
  app.get("/comments/recipe/:recipeId", function(req,res){
      let recipeId=req.params.recipeId;
      recipeData.getListOfAllCommentsByRecipe(recipeId).then(function(data){
          let commentList=data.comments;
          var newList={comments:[]};
        var addcomment=function(id,comment,poster){
         let newCommentFormat={_id: id, recipeId: data._id, recipeTitle: data.title, name:comment, poster:poster};

             newList.comments.push(newCommentFormat);

        }; 
             
         for(let temp=0;temp<commentList.length;temp++){
           addcomment(commentList[temp]._id,commentList[temp].comment,commentList[temp].poster);              
            }
       
          res.status(200).json(newList);       
      },function(errorMessage){
          res.status(500).json({error:errorMessage});
      });
  });

  //7. GET	/comments/:commentId

   app.get("/comments/:commentId", function(req,res){
      let commentId=req.params.commentId;
      recipeData.getCommentsById(commentId).then(function(data){
          let newComment={_id: data.comments[0]._id, recipeId: data._id, recipeTitle: data.title, name: data.comments[0].comment, poster: data.comments[0].poster};
          res.status(200).json(newComment);       
      },function(errorMessage){
          res.status(500).json({error:errorMessage});
      });
  });



//8.POST	/comments/:recipeId/

app.post("/comments/:recipeId/",function(req,res){
    let recipeId=req.params.recipeId;
    let comentBody=req.body;
   
    let poster=req.body.poster;
    let comment=req.body.comment;
  
    recipeData.addComment(recipeId,comentBody.poster,comentBody.comment).then(function(data){
        res.status(200).json(data);
    },function(errorMessage){
        res.status(500).json({error:errorMessage});
    });
});


//9.PUT	/comments/:recipeId/:commentId

app.put("/comments/:recipeId/:commentId",function(req,res){
    let commentbody=req.body;
    let recipeId=req.params.recipeId;
    let commentId=req.params.commentId;
    console.log(recipeId);
    console.log(commentId);
    
    // recipeData.updateComment(recipeId,commentId,commentbody.poster).then(function(data){
    //     res.status(200).json(data);
    // },function(errorMessage){
    //     res.status(500).json({error:errorMessage});
    // });

    recipeData.updateComment(recipeId,commentId,commentbody.poster,commentbody.comment).then(function(data){
        res.status(200).json(data);
    },function(errorMessage){
        res.status(500).json({error:errorMessage});
    });
});

//10.DELETE	/comments/:id

app.delete("/comments/:id",function(req, res){
    let commentId=req.params.id;
    recipeData.deleteComment(commentId).then(function(data){
        let success=false;
        if(data==1)
        success=true;
    res.status(200).json({sucess:success});    
    },function(errorMessage){
        res.status(500).json({error:errorMessage});
    });


})

app.listen(3000,()=>{
console.log("We've now got the server");
console.log("Im listening on port 3000")
});



