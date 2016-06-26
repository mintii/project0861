$(document).on("ready", function() {
  var game = new Game();
  var nogata = game.meteorites[0];
  console.log(game.meteorites);
  // console.log(nogata.tellStory());
  nogata.defeated = true;
  game.extendMeteoritesAPI(nogata);
  // console.log(nogata.tellStory());
  var meteorites = JSON.stringify(game.meteorites);
  console.log(meteorites);
});
