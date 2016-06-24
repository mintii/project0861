var Meteorite = function(name) {
  this.name = name;
};

Meteorite.prototype.generateTree = function(grammar) {
    var trace = tracery.createGrammar(grammar);
    this.storyTree = trace.expand("#origin#");

};

Meteorite.prototype.confusedGrammar = function() {return {
    "hello": ["Hello!", "Whaddup whaddup!", "Salve!", "Konnichiwa!", "<stares at you>", "Bonjourno."],
    "greeting": [`#hello# My name is ${this.name}.`],
    "introduction": ["I have fallen from the sky.", "I've never been so still.", "WHAT ARE YOU?"],
    "confusedStatement": ["Help me!", "I've lost my fam.", "Where am I?", "Huhwhahuh?!"],
    "origin": ["#greeting#  #introduction#  #confusedStatement#"]
  };
}



