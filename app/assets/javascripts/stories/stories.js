var Meteorite = function(name) {
  this.name = name;
};

Meteorite.prototype.generateStory = function(grammar) {
    var trace = tracery.createGrammar(grammar);
    return trace.expand("#origin#").finalText;

};

Meteorite.prototype.confusedGrammar = function() {return {
    "hello": ["Hello!", "Whatup whatup!", "Salve!", "Konnichiwa!", "<stares at you>"],
    "greeting": [`#hello# My name is ${this.name}.`],
    "introduction": ["I have fallen from the sky.", "I've never been so still.", "WHAT ARE YOU?"],
    "confusedStatement": ["Help me!", "I've lost my fam.", "Where am I?", "Huhwhahuh?!"],
    "origin": ["#greeting#  #introduction#  #confusedStatement#"]
  };
}

