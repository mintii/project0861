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
  "spaceThing": ["the hubble telescope", "andromeda", "the kuiper belt", "Reno, NV"],
  "expandedOrigin": ["It feels like just yester#timeframe# that I was flying past #spaceThing#.", "It wasn't an accident... it was SABOTAGE", `There are other ${this.recclass} meteorites just like me who survived... I am sure of it.`],
  "relative": ["cousin", "brother", "sister"],
  "clue": ["Please find my #relative#!  Look #hint#."],
  "origin": []
  }

// var warStory = {
//   "timeunit": ["year", "day", "century", "light-year", "parsec"],
//   "timeframe": ["50000 #timeunit#s", "a #timeunit#", "42 #timeunit#s"],
//   "activity": ["taking a high-orbit stroll around Sirius"],
//   "initialSetting": ["About #timeframe# ago my family was #activity# when #pointOfConflict#." ],
//   "pointOfConflict": ["The <em>steel</em> swarm tore most of us into spacedust.", "One of the <em>steel</em> beings "],
//   "origin": []
//   }


}



