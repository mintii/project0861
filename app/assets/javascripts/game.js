var Game = function() {
  this.meteorite = [];
}

Game.prototype.findMeteorite = function(currentMeteorite) {
  this.meteorites.find(function(meteorite) {
    return meteorite.recclass == currentMeteorite.recclass &&  meteorite.year >= currentMeteorite.year && !meteorite.found;
  });
};
