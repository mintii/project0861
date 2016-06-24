var Meteorite = function(args) {
  this.location = args['geometry']['coordinates'];
  this.name = args['properties']['name'];
  this.year = args['properties']['year'];
  this.recclass = args['properties']['recclass'];
  this.nasaId = args['properties']['id'];
  this.found = false;
}

