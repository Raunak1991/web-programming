const fs = require('fs');
module.exports={


getFileAsString:function getFileAsString(path)
{
return new Promise((fulfill, reject) => {
                if(!path) reject("Please provide correct path!");
                fs.readFile(path,"utf-8",(error, data)=>{
                    if(error) reject(error);
                    fulfill(data);
                });
             })
            },


getFileAsJSON:function getFileAsJSON(path)
{    
 return new Promise((fulfill, reject) => {
                if(!path) reject("Please provide correct path");
                fs.readFile(path,"utf-8",(error, data)=>{
                    if(error) reject(error);
                    try{
                        var fileObject=JSON.parse(data);
                    } catch(error){
                        reject(error);
                    }
                    fulfill(fileObject);
                });
              });
},

saveStringToFile:function saveStringToFile(path,text)
{
  return new Promise((fulfill, reject) => {
       if(!path) reject("please provide correct file path ");
       if(!text) reject("please provide correct text ");
        fs.writeFile(path, text, (error, data)=>{
			if(error) reject(error);
            fulfill("text is saved to file");
        });
         });
},


saveJSONToFile:function saveJSONToFile(path,obj){     

 return new Promise((fulfill, reject) => {
        if(!path) reject("please provide correct file path ");
       if(!obj) reject("please provide correct object ");
       var stringText=JSON.stringify(obj)
       fs.writeFile(path,stringText,(error,data)=>{
           if(error) reject(error);
           fulfill("Object is saved to file");
});
});
}


}
