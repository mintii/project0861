var Game = function() {
  this.meteorites = [];
}

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
return features;
}

Game.prototype.buildMeteorites = function(number, recclass) {
  var featureData = this.getAPIData(number, recclass);
  for(var i=0; i<featureData.length; i++) {
    this.meteorites.push(new Meteorite(featureData[i]['properties']));
  }
}



