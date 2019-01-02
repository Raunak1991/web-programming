var MongoClient=require('mongodb').MongoClient,
    settings = require('./config.js'),
    Guid = require('Guid'),
    uuid=require('node-uuid');

    

var fullMongoUrl=settings.mongoConfig.serverUrl + settings.mongoConfig.database;

function runSetup(){
    return MongoClient.connect(fullMongoUrl)
        .then(function(db) {
            return db.collection("recepiesCollection").drop().then(function(){
                 return db;
            },function(){
        return db;
            });

        }).then(function(db){
            return db.createCollection("recepiesCollection");
       }).then(function(recepieCollection){
           //var docId=0;
           var makeDoc=function(title){
               return{
                 _id: uuid.v4(),
                //  _id: ++docId,
                   title:title,
                   ingredients:[],       
                   steps:[],
                   comments:[]
                }
                
               };

               var addIngredient=function(recepie, name,amount){
                   var newIngredient={
                       name:name,
                       amount:amount
                   }
                   recepie.ingredients.push(newIngredient);
               }

               var addComment= function(recepie, poster, comment){
                   var docId2=0;
                   var newRecepie= {
                       _id: uuid.v4(),
                     //  _id: ++docId2,
                       poster:poster,
                       comment:comment
                   };

                   recepie.comments.push(newRecepie);
               };


               var listofRecepies=[];
                var eggRecepie= makeDoc("Fried Eggs");
                addIngredient(eggRecepie, "Egg","2 eggs");
                addIngredient(eggRecepie,"Olive Oil","2 tbsp");
                //eggRecepie.push("Egg","2 eggs")
                eggRecepie.steps.push("First, heat a non-stick pan on medium-high until hot","Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.","Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!","Gently pour the egg from the bowl onto the oil","Wait for egg white to turn bubbly and completely opaque (approx 2 min)","Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)","Remove from oil and plate","Repeat for second egg");

              //  eggRecepie.comments.push( "Gordan Ramsay","These eggs are delicious!" )
              addComment(eggRecepie,"Gordan Ramsay","These eggs are delicious!" );
                
                listofRecepies.push(eggRecepie);
                var eggRecepie2= makeDoc("Maggie With eggs");
                addIngredient(eggRecepie2, "Maggie","2 eggs");
                addIngredient(eggRecepie2,"Olive Oil","2 tbsp");
                //eggRecepie.push("Egg","2 eggs")
                eggRecepie2.steps.push("First, heat a non-stick pan on medium-high until hot","Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.","Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!","Gently pour the egg from the bowl onto the oil","Wait for egg white to turn bubbly and completely opaque (approx 2 min)","Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)","Remove from oil and plate","Repeat for second egg");

              //  eggRecepie.comments.push( "Gordan Ramsay","These eggs are delicious!" )
              addComment(eggRecepie2,"raunak Garg","This egg Maggie is delicious!" );
                
                listofRecepies.push(eggRecepie2);

                return recepieCollection.insertMany(listofRecepies).then(function(){
                    return recepieCollection.find().toArray();
                });

        
           });
       }

    //export this function

    var exports=module.exports=runSetup;