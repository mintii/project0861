$(document).on("ready", function() {
  var n = new Meteorite("Nogata");
  n.generateTree(n.confusedGrammar());

  $("body").append(`<p>${n.storyTree.finalText}</p>`);
});



