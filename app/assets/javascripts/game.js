var Game = function() {
  this.meteorites = [];
  this.initializeMeteoritesAPI();
}

Game.prototype.findMeteorite = function(currentMeteorite) {
  return this.meteorites.find(function(meteorite) {
    return meteorite.recclass == meteorite.year >= currentMeteorite.year && currentMeteorite.recclass && !Game.meteorites.includes(meteorite);
  });
};

Game.prototype.initializeMeteoritesAPI = function() {
  var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=1&$order=year';
  var features = null;
  $.ajax({
    url: path,
    async: false,
    type: 'get',
    success: function(output) {
      features = output.features;
    }
  });
  this.meteorites.push(new Meteorite(features[0]));
}

Game.prototype.getNextMeteoriteAPI = function(currentMeteorite) {
  var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=1&$order=year&$where=(recclass=%27' + currentMeteorite.recclass + '%27%20AND%20year%20>%27'+ currentMeteorite.year + '%27)';
  var features = null;
  $.ajax({
    url: path,
    async: false,
    type: 'get',
    success: function(output) {
      features = output.features;
    }
  });

  return new Meteorite(features[0]);
}

Game.prototype.extendMeteoritesAPI = function(currentMeteorite) {
  var nextMeteorite = this.getNextMeteoriteAPI(currentMeteorite);
  var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$order=year&$where=(year%20between%20%27'+ currentMeteorite.year + '%27%20and%20%27' + nextMeteorite.year + '%27)';
  var features = null;
  $.ajax({
    url: path,
    async: false,
    type: 'get',
    success: function(output) {
      features = output.features;
    }
  });

  for(var i=0; i<features.length; i++) {
    var meteorite = new Meteorite(features[i]);

    if (!includeCheck(meteorite, this.meteorites)) {
      this.meteorites.push(meteorite);
    }
  }
}

var includeCheck = function(meteorite, meteorites) {
  returnValue = false;

  for (var j=0; j<meteorites.length; j++) {
    if (meteorites[j].nasaId === meteorite.nasaId) {
      console.log("match found");
      returnValue = true;
    }
  }
  return returnValue;
}


Game.prototype.setNextMeteorite = function(currentMeteorite) {
  currentMeteorite.nextMeteorite = this.getNextMeteoriteAPI(currentMeteorite);
}

Game.prototype.defeat = function(meteorite) {
  //set meteorite.defeated to true
  //update meteorite.story
  //update this.revealedMeteorites based on findNextMeteorite(meteorite)
}
