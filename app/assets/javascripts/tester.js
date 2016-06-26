$(document).on("ready", function() {
  var game = new Game();
  var nogata = game.meteorites[0];
  var meteorite2 = game.meteorites[1];

  game.extendMeteoritesAPI(nogata);
  var luce = game.meteorites[36];
  console.log(game.meteorites);
    console.log(luce);
  game.extendMeteoritesAPI(luce);
  console.log(game.meteorites);
  // var luce = game.findMeteorite(nogata); //should probably have a better name

  // game.setNextMeteorite(nogata);

  // console.log(game.meteorites);

  // var n = new Meteorite("Nogata");
  // n.generateTree(n.confusedGrammar());

  // $("body").append(`<p>${n.renderStory()}</p>`);
  // $("body").append(`<p>${getAPIData(1, "L6")}</p>`);
  // $("body").on("click", function() {
  //   console.log(game.meteorites[0]);
  // });

});
