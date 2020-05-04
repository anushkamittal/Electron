let request = require('request');

setInterval(() => {
    request('https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand',function(err,res,body){
        let jsonBody = JSON.parse(body);
        let i=Math.ceil(Math.random()*10);
        let randomQuote = jsonBody[i]["content"]["rendered"];
        document.getElementById("quote").innerHTML = randomQuote;
    });
}, 2000);