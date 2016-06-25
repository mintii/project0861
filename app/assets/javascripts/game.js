var Game = function() {
  this.meteorites = [];
}

Game.prototype.findMeteorite = function(currentMeteorite) {
  this.meteorites.find(function(meteorite) {
    return meteorite.recclass == meteorite.year >= currentMeteorite.year && currentMeteorite.recclass && !Game.meteorites.includes(meteorite);
  });
};

Game.prototype.getAPIDataForFirst = function() {
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

//find next meteorite based on year > current && recclass ===
Game.prototype.getNextMeteorite = function(currentMeteorite) {
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

Game.prototype.getAPIDataForRange = function(currentMeteorite) {
  var nextMeteorite = this.getNextMeteorite(currentMeteorite);
  console.log(nextMeteorite.year);
  console.log(currentMeteorite.year);
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
  console.log(features);
  return features;
}


// find all meteorites between those two and add to revealed

// Game.prototype.getAPIData = function(number, recclass) {
//   var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=' + number + '&$order=year&$where=(recclass=%27' + recclass + '%27)';
//   var features = null;
//   $.ajax({
//     url: path,
//     async: false,
//     type: 'get',
//     success: function(output) {
//       features = output.features;
//     }
//   });
//   return features;
// }

Game.prototype.buildMeteorites = function(number, recclass) {
  var featureData = this.getAPIData(number, recclass);
  for(var i=0; i<featureData.length; i++) {
    this.meteorites.push(new Meteorite(featureData[i]));
  }
}

Game.prototype.defeat = function(meteorite) {
  //set meteorite.defeated to true
  //update meteorite.story
  //update this.revealedMeteorites based on findNextMeteorite(meteorite)
}

