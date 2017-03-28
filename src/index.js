var express=require("express");
var app = express();
var fetch=require("node-fetch");
var cheerio=require("cheerio");

function protext(text) {
  var $ =cheerio.load(text);
  var listitems= Array.from($("#tiles").children("li"));
  return listitems.map(function(li){
    return {
      title : $(li).find(".title").text()
    };
  });

}

app.get("/hello", function(req, res){
  var dopopoco=fetch("http://www.dopopoco.ro/meniu-individual-timisoara");
  var textResponse = dopopoco.then(function(response){
    return response.text()
  });
  textResponse.then(function(text){
    res.send(protext(text));
});
});

app.listen(3000, function(){
  console.log("mesasage");
});
