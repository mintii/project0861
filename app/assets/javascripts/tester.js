$(document).on("ready", function() {
  var game = new Game();
  // game.buildMeteorites(0861, 'L6');
  game.getAPIDataForFirst();
  // console.log(game.meteorites);
  // game.getAPIDataForNext(game.meteorites[0]);
  // console.log(game.getAPIDataForNext(game.meteorites[0]));
  game.getAPIDataForRange(game.meteorites[0]);

  console.log(game.meteorites);

  // var n = new Meteorite("Nogata");
  // n.generateTree(n.confusedGrammar());

  // $("body").append(`<p>${n.renderStory()}</p>`);
  // $("body").append(`<p>${getAPIData(1, "L6")}</p>`);
  // $("body").on("click", function() {
  //   console.log(game.meteorites[0]);
  // });

});
