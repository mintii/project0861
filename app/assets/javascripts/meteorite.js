var Meteorite = function(args) {
  this.location = args['geometry'];
  this.name = args['properties']['name'];
  this.year = args['properties']['year'];
  this.recclass = args['properties']['recclass'];
  this.nasaId = args['properties']['id'];
  this.defeated = false;
}
// =========
Meteorite.prototype.tellStory = function() {
  var story = new Story(this);

  if (!this.defeated) {
    story.generateTree(story.confusedGrammar());
  } else {
    story.generateTree(story.coherentGrammar());
  }
  return story.renderStory();
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



// "Lucé"
