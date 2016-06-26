var Game = function() {
  this.meteorites = [];
  this.initializeMeteoritesAPI();
  this.lfamily = [];
  this.hfamily = [];
  this.ifamily = [];
  this.ufamily = [];
}

Game.prototype.findFamily = function(meteorite) {
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
  for(var i = 0; i < family.length; i++) {
    if(family[i] == meteorite.nasaId) {
      return true;
    } else {
      return false;
    }
  }
}

Game.prototype.resetFamily = function() {
  var family = this.findFamily(meteorite);
  family.empty();
  // Alert player they have helped a family return to space. Encourage them to find more meteorites.
}

Game.prototype.checkFamilyVictory = function(meteorite) {
  var family = this.findFamily(meteorite);
  if(family.length >= 5) {
    this.resetFamily();
    return true;
  } else {
    return false;
  }
}

Game.prototype.addToFamily = function(meteorite) {
  var family = this.findFamily(meteorite);
  if(!this.checkFamilyInclude(meteorite) && !this.checkFamilyVictory(meteorite) ) {
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
  this.setNextMeteorite(currentMeteorite);
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
