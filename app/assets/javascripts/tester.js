$(document).on("ready", function() {
  var game = new Game();
  game.buildMeteorites("10",'L6');

  console.log(game.meteorites)



  // var n = new Meteorite("Nogata");
  // n.generateTree(n.confusedGrammar());

  // $("body").append(`<p>${n.renderStory()}</p>`);
  // $("body").append(`<p>${getAPIData(1, "L6")}</p>`);
  // $("body").on("click", function() {
  //   console.log(game.meteorites[0]);
  // });

});
