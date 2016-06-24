$(document).on("ready", function() {
  var n = new Meteorite("Nogata");


  var trace = tracery.createGrammar(n.confusedGrammar());
  var story = trace.expand("#origin#").finalText;
  $("body").append(`<p>${story}</p>`);
});



