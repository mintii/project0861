var Game = function() {
  this.meteorites = [];
}

Game.prototype.addMeteorites = function() {
  this.meteorites.push(this.getAPIData(1,'L6'));
};

Game.prototype.findMeteorite = function(currentMeteorite) {
  this.meteorites.find(function(meteorite) {
    return meteorite.recclass == currentMeteorite.recclass &&  meteorite.year >= currentMeteorite.year && !meteorite.found;
  });
};


Game.prototype.getAPIData = function(number, recclass) {
  var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=' + number + '&$order=year&$where=(recclass=%27' + recclass + '%27)';
  var features = null;
  $.ajax({
    url: path,
    async: false,
    type: 'get',
    success: function(output) {
      features = output.features;
    }
  });

return new Meteorite(features);

}



