exports.createMetrics=function(text){ 
        return new Promise(function(fulfill, reject)
        { 
            if (!text)
            {
			reject("Enter The Valid Text");
		
		    }

             let patString=/[a-zA-Z]/;
     if(!patString.test(text)){
        reject( "text is not a string");
    }


    let dupText=text.replace(/[`~!@#$%^&*()_|+\-=?:'",;.<>\{\}\[\]\\\/]/g,'');

    var dupText2=text.replace(/[^\w\s]|_/g,"").replace(";","").replace(/\s+/g,"|").split("|")
      dupText2 = dupText2.filter(String);
         let totalLetters=dupText.match(/[A-Za-z]/g).length;
         let totlaWOrds=dupText.split(/\s+/).length;
         let freq=dupText.split(' ')
         let longWords=0,avgWordLength;
         for(i=0;i<dupText2.length;i++)
        {            
            if(dupText2[i].length>=6)
            longWords=longWords+1;
        }
        avgWordLength=totalLetters/totlaWOrds;
        avgWordLength=Math.round(avgWordLength * 100) / 100
    
   
   let numberOfSentence= text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
       var pattern = /\w+/g,
       
        dupText1=dupText.toLowerCase();
        matchedWords = dupText1.match( pattern );
        var freqMap = {};
        matchedWords.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
        });
        var  unique = Object.keys(freqMap).length;
        var textComplex=totlaWOrds/numberOfSentence.length + (longWords * 100)/totlaWOrds;
        textComplex=Math.round(textComplex * 100) / 100
        fulfill({totalLetters:totalLetters, totalWords:totlaWOrds, 
      uniqueWords:unique, longWords:longWords ,
      averageWordLength:avgWordLength,textComplexity:textComplex,wordOccurrences:freqMap
    });
    });
}





