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
  "africa": ["OMG A LION, GET IN THE CAR", "Pyramids!", "I was approaching Earth, aimed straight for the middle, and... BULLSEYE!"],
  "arctic": ["My compass is broken.", "Are you Santa?", "Where is everybody?"],
  "antarctica": ["Brrrrrr!", "Which one has penguins and which one has polar bears?  I always forget."],
  "north-america": ["What a rainy day.", "Yay seasons!", "DID BIGFOOT JUST WALK BY!"],
  "south-america": ["¿Qué Paso?", "I've a distant cousin who is a soccer ball!", "I could go for some Yerba Mate."],
  "europe": ["I can't keep track of all these kings and queens.", "Pasta!", "These buildings look older than me!"],
  "australia": ["G'day Mate.", "Blimey!", "What's the deal with the platypus, I mean, really?"],
  "asia": ["I can see that wall from home!", "Oh no, Mongol hordes!", "Fireworks!"],
  "clue": ["Please find #relative#!  Look #hint#."],
  "origin": [`#thanks# #expandedOrigin# #${this.whereabouts(this.meteorite)}# #clue#`]
  }
}

Story.prototype.whereabouts = function(meteorite) {
  var latitude = meteorite.getLat();
  var longitude = meteorite.getLong();

  if (latitude > 60) {
    return "arctic";
  } else if (latitude < -60) {
    return "antarctica";
  } else if (longitude < -30 && latitude > 0) {
    return "north-america";
  } else if (longitude < -30 && latitude < 0) {
    return "south-america";
  } else if (latitude < 32 && longitude < 45) {
    return "africa";
  } else if (latitude > 32 && longitude < 30) {
    return "europe";
  } else if (latitude > 90 && longitude < 10) {
    return "australia";
  } else {
    return "asia";
  }
}

// Story.prototype.whereaboutsClimate = function(meteorite) {
//   if (latitude > 60 || latitude < -60) {
//     return "ice:("
//   }
//   else if (latitude <= 20 && latitude >= -20) {
//     return "tropical"
//   } else {
//     return "temperate"
//   }
// }


// var warStory = {
//   "timeunit": ["year", "day", "century", "light-year", "parsec"],
//   "timeframe": ["50000 #timeunit#s", "a #timeunit#", "42 #timeunit#s"],
//   "activity": ["taking a high-orbit stroll around Sirius"],
//   "initialSetting": ["About #timeframe# ago my family was #activity# when #pointOfConflict#." ],
//   "pointOfConflict": ["The <em>steel</em> swarm tore most of us into spacedust.", "One of the <em>steel</em> beings "],
//   "origin": []
//   }





