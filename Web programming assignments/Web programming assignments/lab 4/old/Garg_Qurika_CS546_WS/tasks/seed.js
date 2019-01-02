const dbConnection = require("../config/mongoConnection");
const data=require("../data/");
const classes=data.classes;
const education=data.education;
const hobbies=data.hobbies; 
//const users = data.users;

dbConnection().then(db => {
    return db.dropDatabase()
    .then(() => {
        return dbConnection;
    }).then((db) => {
     
          return hobbies
    
        .addHobby("listening Songs","Songs like comtemporary, hip-hop, bollywood, hollywood")
            .then(()=>{
              // console.log("first added")
           return hobbies.addHobby("reading Books","Books mainly non-fiction , autobiography, biography")
        })
        .then(()=>{
            //console.log("2nd added")
            return hobbies.addHobby("travelling","Mostly adventurous places")
            
        });
     }).then((db)=>{
            return classes        
             .addClass("CS-521","TCP/IP", "Prof. Moshiur Rahman","The objective of this course is to provide a unified view of data and computer communications, emphasizing on the application and design of TCP/IP networking")
            .then(()=>{
               // console.log("first class added")
           return classes.addClass("CS-546","Web Programming", "Prof. Philip Barresi ","This course will provide students with a first strong approach of internet programming. It will give the basic knowledge on how the Internet works and how to create advanced web sites by the use of script languages, after learning the basics of HTML")
        })
        .then(()=>{
        // console.log("2nd class added")
            return classes.addClass("MIS-630","Data & knowledge management", "Prof. Joseph Morabito,","This course will focus on the design and management of data in the organization. Data form the basis of modern business analytics and decision making in organizations.")
            
        })

 .then(()=>{
         //  console.log("3rd class added")
            return classes.addClass("CS-519","E-commerce", "Prof. Gene Super","This course is an introduction to the architecture, design, implementation, and management of E-Commerce websites.")
            
        })

.then(()=>{
      //  console.log("4th class added")
            return classes.addClass("CS-590","Algorithm", "Prof. Duggan","algorithms in details and Algorithm design and computational complexity")
            
        })
     }).then((db)=>{

    return education
    
        .addEducation("highschool","St. Georges College", "highschool")
            .then(()=>{
       //      console.log("first education added")
           return education.addEducation("undergrad","JSS Academy of Technical Education","Bachelor of Technology in Computer Science")
        })
       
     })
 
     .then(() => {
        console.log("Done seeding database");
        db.close();
    });


}, (error) => {
    console.error(error);
});


