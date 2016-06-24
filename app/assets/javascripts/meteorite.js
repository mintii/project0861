var Meteorite = function(args) {
  console.log(args);
  this.location = args[0]["geometry"];
  this.name = args[0]["properties"]['name'];
  this.year = args[0]["properties"]['year'];
  this.recclass = args[0]["properties"]['recclass'];
  this.nasaId = args[0]["properties"]['id'];
  this.found = false;
  console.log(this);
}

var getAPIData = function(number, recclass) {
  var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=' + number + '&$order=year';
  var response = $.ajax({type: 'GET', url: path}).done(function(response){
    var features = response.features;
    console.log(features);
    return new Meteorite(features);
  });
// console.log(response);
// var json = JSON.stringify(eval("("+ response + ")"));
//   console.log(JSON.parse(json));
}

//&$where=(recclass%20=%20%27${recclass}%27)
