var Meteorite = function(args) {
  this.location = args[0]["geometry"];
  this.name = args[0]["properties"]['name'];
  this.year = args[0]["properties"]['year'];
  this.recclass = args[0]["properties"]['recclass'];
  this.nasaId = args[0]["properties"]['id'];
  this.found = false;
}

//number must be 1 for now because the return assumes a single meteorite
// var getAPIData = function(number, recclass) {
//   var path = 'https://data.nasa.gov/resource/y77d-th95.geojson?$limit=' + number + '&$order=year&$where=(recclass=%27L6%27)';
//   var response = $.ajax({type: 'GET', url: path}).done(function(response){
//     var features = response.features;
//     return "asdfasdf";
//     // return new Meteorite(features);
//   });


// }
