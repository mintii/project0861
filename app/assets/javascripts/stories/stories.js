var Story = function(meteorite) {
  this.meteorite = meteorite;
}

Story.prototype.generateTree = function(grammar) {
  var trace = tracery.createGrammar(grammar);
  this.storyTree = trace.expand("#origin#");
};



Story.prototype.renderStory = function() {
  // add case logic
  return this.storyTree.finalText;
}

Story.prototype.confusedGrammar = function() {return {
    "hello": ["Hello!", "Whaddup whaddup!", "Salve!", "Konnichiwa!", "<stares at you>", "Bonjourno."],
    "greeting": [`#hello# My name is ${this.meteorite.name}.`],
    "introduction": ["I have fallen from the sky.", "I've never been so still.", "WHAT ARE YOU?"],
    "confusedStatement": ["Help me!", "I've lost my fam.", "Where am I?", "Huhwhahuh?!"],
    "origin": ["#greeting#  #introduction#  #confusedStatement#"]
  };
}

Story.prototype.coherentGrammar = function() { return {
  "thanks": ["THANKS", "Wowzers, you're great!", "Domo Arigato.", "Thank you, but our princess is in another castle."],
  "timeframe": ["year", "day", "century", "light-year", "parsec"],
  "spaceThing": ["the Hubble Telescope", "Andromeda", "the Kuiper Belt", "Reno, NV"],
  "expandedOrigin": ["It feels like just yester#timeframe# that I was flying past #spaceThing#.", "It wasn't an accident... it was SABOTAGE!", `There are other ${this.meteorite.recclass} meteorites just like me who survived... I am sure of it.`],
  "relative": ["my cousin", "my brother", "my sister", "my neighbor", "my dear friend"],
  "hint": [`along ${this.meteorite.nextMeteorite.getLat()} latitude`, `along ${this.meteorite.nextMeteorite.getLong()} longitude`, `in ${this.meteorite.nextMeteorite.getYear()} AD`],
  "tropical": ["OMG A LION, GET IN THE CAR", "¿Qué Paso?", "I was approaching Earth, aimed straight for the middle, and... BULLSEYE!"],
  "ice:(": ["Which one has penguins and which one has polar bears?  I always forget.", "Are you Santa?", "Brrrrrr!"],
  "temperate": ["What a rainy day.", "Yay seasons!", "DID BIGFOOT JUST WALK BY!"],
  "clue": ["Please find #relative#!  Look #hint#."],
  "origin": [`#thanks# #expandedOrigin# #${this.whereaboutsLat(this.meteorite.getLat())}# #clue#`]
  }
}

Story.prototype.whereaboutsLat = function(latitude) {
  if (latitude > 60 || latitude < -60) {
    return "ice:("
  }
  else if (latitude <= 20 && latitude >= -20) {
    return "tropical"
  } else {
    return "temperate"
  }

}


// var warStory = {
//   "timeunit": ["year", "day", "century", "light-year", "parsec"],
//   "timeframe": ["50000 #timeunit#s", "a #timeunit#", "42 #timeunit#s"],
//   "activity": ["taking a high-orbit stroll around Sirius"],
//   "initialSetting": ["About #timeframe# ago my family was #activity# when #pointOfConflict#." ],
//   "pointOfConflict": ["The <em>steel</em> swarm tore most of us into spacedust.", "One of the <em>steel</em> beings "],
//   "origin": []
//   }





