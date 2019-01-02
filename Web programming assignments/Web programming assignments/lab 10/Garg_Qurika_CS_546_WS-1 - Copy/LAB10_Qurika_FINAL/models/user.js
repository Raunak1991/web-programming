const uuid = require("node-uuid");
var bcrypt = require("bcryptjs");

var User=[
    {
    id:uuid.v4(),
    username:"masterdetective123",
    firstName:"Sherlock",
    lastname:"Holmes",
    profession:"Detective",
    bio:"Sherlock Holmes  (\/ˈʃɜːrlɒk ˈhoʊmz\/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a \"consulting detective\" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
    password:bcrypt.hashSync("elementarymydearwatson"),    
   // sessionId:null
    },
    {
    id:uuid.v4(),
    username:"lemon",
    firstName:"Elizabeth",
    lastname:"Lemon",
    profession:"Writer",
    bio:"Elizabeth Miervaldis \"Liz\" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
    password:bcrypt.hashSync("damnyoujackdonaghy"), 
    // sessionId:null
    },
    {
    id:uuid.v4(),
    username:"theboywholived",
    firstName:"Harry",
    lastname:"Potter",
    profession:"Student",
    bio:"Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
    password:bcrypt.hashSync("quidditch"),
    // sessionId:null
    }
]


module.exports={
   getUserById:function(id){
        if(id===undefined) return Promise.reject(null);
        var userData=User.filter(x=>x.id===id).shift();
        if(!userData) return Promise.reject(null)
        return Promise.resolve(userData);
    },

    getUserByUsername:function(name){
         if(name===undefined) return Promise.reject(null);
        var userData=User.filter(x=>x.username===name).shift();
        if(!userData) return Promise.reject(null)
        return Promise.resolve(userData);

    },
comparePassword: function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, res) {
    	if(err) {console.log(err);
            throw err};
    	callback(null, res);
	});
},
getAllUsers:function(){
    return Promise.resolve(User.slice(0)); }
}


