var Game = function() {
  this.meteorites = [];
  this.map = new Gamemap(this);
  var game = this;
  var initialMeteorites = this.initializeMeteoritesAPI();

  initialMeteorites.done(function(nasaData) {
    game.map.renderMap();
  });

  this.lfamily = [];
  this.hfamily = [];
  this.ifamily = [];
  this.ufamily = [];
  this.saveFamilies();
}

Game.prototype.saveFamilies = function() {
  rocktypes = ["L", "H", "I", "U"];
  for (var i=0; i<rocktypes.length; i++) {
    $.ajax({method: "post", url: "/families", data: {rock_type: rocktypes[i]}});
  }
}

Game.prototype.findFamily = function(meteorite) {
  var recclass = meteorite.recclass[0];
  if (recclass == "L") {
    meteorite.family = this.lfamily;
    return this.lfamily;
  } else if (recclass == "I") {
    meteorite.family = this.ifamily;
    return this.ifamily;
  } else if (recclass == "H") {
    meteorite.family = this.hfamily;
    return this.hfamily;
  } else {
    meteorite.family = this.ufamily;
    return this.ufamily;
  }
}

Game.prototype.checkFamilyInclude = function(meteorite) {
  var family = this.findFamily(meteorite);
  return includeCheck(meteorite, family);
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
  this.saveFamilies();
}

Game.prototype.checkFamilyVictory = function(meteorite) {
  if(meteorite.family.length >= 5) {
    this.resetFamily(meteorite);
    return true;
  } else {
    return false;
  }
}

Game.prototype.addToFamily = function(meteorite) {
  var family = this.findFamily(meteorite);
  if(this.checkFamilyInclude(meteorite) === false) {
    family.push(meteorite);
  }
}

Game.prototype.findMeteorite = function(currentMeteorite) {
  return this.meteorites.find(function(meteorite) {
    return meteorite.recclass == meteorite.year >= currentMeteorite.year && currentMeteorite.recclass && !Game.meteorites.includes(meteorite);
  });
};

Game.prototype.initializeMeteoritesAPI = function() {
  var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=1&$order=year';
  var game = this;

  var request = $.get(path);
  request.done(function(nasaData) {
    game.meteorites.push(new Meteorite(nasaData.features[0]));
  })

  return request;
}

Game.prototype.getNextMeteoriteAPI = function(currentMeteorite) {
  var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=1&$order=year&$where=(recclass=%27' + currentMeteorite.recclass + '%27%20AND%20year%20>%27'+ currentMeteorite.year + '%27)';
  var game = this;
  var request = $.get(path);

  return request;
}

Game.prototype.extendMeteoritesAPI = function(currentMeteorite) {
  var game = this;
  var firstRequest = game.getNextMeteoriteAPI(currentMeteorite).done(function (nasaData) {
    currentMeteorite.nextMeteorite = new Meteorite(nasaData["features"][nasaData["features"].length-1]);
  });

  var secondRequest = firstRequest.then(function() {
    if (!includeCheck(currentMeteorite.nextMeteorite, game.meteorites)) {
      var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$order=year&$where=(year%20between%20%27'+ currentMeteorite.year + '%27%20and%20%27' + currentMeteorite.nextMeteorite.year + '%27)';
      return $.get(path);
    } else {
      var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=' + game.meteorites.length + '&$order=year' ;
      return $.get(path);
    }
  })

  return secondRequest;
}

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
  meteorite.defeated = true;
  this.addToFamily(meteorite);
  var game = this;
  var extendMeteorites = this.extendMeteoritesAPI(meteorite);
  return extendMeteorites.done(function(nasaData) {
    for(var i=0; i<nasaData['features'].length; i++) {
      var newMeteorite = new Meteorite(nasaData['features'][i]);
      if (!includeCheck(newMeteorite, game.meteorites)) {
        game.meteorites.push(newMeteorite);
      }
    }
    //ADD THIS METEORITE TO THE DB
    var request = $.post("/meteorites", function(meteorite){  });

    meteorite.generateStory();
    game.checkFamilyVictory(meteorite);
  });
}
