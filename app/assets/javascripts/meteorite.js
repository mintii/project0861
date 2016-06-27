var Meteorite = function(args) {
  this.location = args['geometry'];
  this.name = args['properties']['name'];
  this.year = args['properties']['year'];
  this.recclass = args['properties']['recclass'];
  this.nasaId = args['properties']['id'];
  this.defeated = false;
  this.story = new Story(this);
  this.generateStory();
}

Meteorite.prototype.generateStory = function() {
  if (!this.defeated) {
    this.story.generateTree(this.story.confusedGrammar());
  } else {
    this.story.generateTree(this.story.coherentGrammar());
  }
}

Meteorite.prototype.tellStory = function() {
  return this.story.renderStory();
}

Meteorite.prototype.getYear = function() {
  return this.year.slice(0, 4)
}

Meteorite.prototype.getLat = function() {
  return this.location["coordinates"][1];
}

Meteorite.prototype.getLong = function() {
  return this.location["coordinates"][0];
}
