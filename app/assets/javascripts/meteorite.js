var Meteorite = function(args) {
  this.location = args[0]["geometry"];
  this.name = args[0]["properties"]['name'];
  this.year = args[0]["properties"]['year'];
  this.recclass = args[0]["properties"]['recclass'];
  this.nasaId = args[0]["properties"]['id'];
  this.found = false;
}


