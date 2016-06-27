var Game = function() {
  this.meteorites = [];
  this.map = new Gamemap(this);
  var game = this;
  var initialMeteorites = this.initializeMeteoritesAPI();

  initialMeteorites.done(function(nasaData) {
    game.map.renderMap(game.map.map);
  });

  this.lfamily = [];
  this.hfamily = [];
  this.ifamily = [];
  this.ufamily = [];
}

Game.prototype.findFamily = function(meteorite) {
  // console.log(meteorite.recclass[0]);
  var recclass = meteorite.recclass[0];
  if (recclass == "L") {
    return this.lfamily;
  } else if (recclass == "I") {
    return this.ifamily;
  } else if (recclass == "H") {
    return this.hfamily;
  } else {
    return this.ufamily;
  }
}

Game.prototype.checkFamilyInclude = function(meteorite) {
  var family = this.findFamily(meteorite);
  return family.includes(meteorite.nasaId);
  // false for not included. true for it is included
}

Game.prototype.resetFamily = function(meteorite) {
  var recclass = meteorite.recclass[0];
  if (recclass == "L") {
    this.lfamily = [];
  } else if (recclass == "I") {
    this.ifamily = [];
  } else if (recclass == "H") {
    this.hfamily = [];
  } else {
    this.ufamily = [];
  };
  // Alert player they have helped a family return to space. Encourage them to find more meteorites.
}

Game.prototype.checkFamilyVictory = function(meteorite) {
  var family = this.findFamily(meteorite);
  if(family.length >= 5) {
    this.resetFamily(meteorite);
    return true;
  } else {
    return false;
  }
}

Game.prototype.addToFamily = function(meteorite) {
  var family = this.findFamily(meteorite);
  if(this.checkFamilyInclude(meteorite) === false) {
    family.push(meteorite.nasaId);
  }
}

Game.prototype.findMeteorite = function(currentMeteorite) {
  return this.meteorites.find(function(meteorite) {
    return meteorite.recclass == meteorite.year >= currentMeteorite.year && currentMeteorite.recclass && !Game.meteorites.includes(meteorite);
  });
};

Game.prototype.initializeMeteoritesAPI = function() {
  var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=1&$order=year';
  // var features = null;
  var game = this;

  var request = $.get(path);
  request.done(function(nasaData) {
    game.meteorites.push(new Meteorite(nasaData.features[0]));
    console.log("pushed some meteorites")
  })

  return request;
}

Game.prototype.getNextMeteoriteAPI = function(currentMeteorite) {
  var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=1&$order=year&$where=(recclass=%27' + currentMeteorite.recclass + '%27%20AND%20year%20>%27'+ currentMeteorite.year + '%27)';
  var game = this;
  var request = $.get(path);
  request.done(function(nasaData) {
    game.meteorites.push(new Meteorite(nasaData.features[0]));
  })
  return request;
}

Game.prototype.extendMeteoritesAPI = function(currentMeteorite) {
  var game = this;
  var firstRequest = game.getNextMeteoriteAPI(currentMeteorite).done(function (nasaData) {
    currentMeteorite.nextMeteorite = new Meteorite(nasaData["features"][nasaData["features"].length-1]);
  });

  var secondRequest = firstRequest.then(function() {
    var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$order=year&$where=(year%20between%20%27'+ currentMeteorite.year + '%27%20and%20%27' + currentMeteorite.nextMeteorite.year + '%27)';
    return $.get(path);
  })

  return secondRequest;
}

// Game.prototype.setNextMeteorite = function(currentMeteorite) {
//   currentMeteorite.nextMeteorite = this.getNextMeteoriteAPI(currentMeteorite);
// }

var includeCheck = function(meteorite, meteorites) {
  returnValue = false;

  for (var j=0; j<meteorites.length; j++) {
    if (meteorites[j].nasaId === meteorite.nasaId) {
      returnValue = true;
    }
  }
  return returnValue;
}



Game.prototype.defeat = function(meteorite) {
  if (!meteorite.defeated) {
    meteorite.defeated = true;
    var game = this;
    var extendMeteorites = this.extendMeteoritesAPI(meteorite);
    extendMeteorites.done(function(nasaData) {
      for(var i=0; i<nasaData['features'].length; i++) {
        var meteorite = new Meteorite(nasaData['features'][i]);
        if (!includeCheck(meteorite, game.meteorites)) {
          game.meteorites.push(meteorite);
        }
      meteorite.generateStory();
      }
    });

  }
}
