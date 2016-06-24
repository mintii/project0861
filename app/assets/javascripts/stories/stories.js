// Meteorite.prototype.generateStory = function() {

// }

$(document).ready(function() {
  test();
});

var test = function() {
  var meteoriteGrammar = {
    "name": ["Nogata", "Rocky", "Lavos"],
    "mood": ["glad", "rad", "sad", "mad", "obsequious"],
    "material": ["iron", "nickel", "aluminum"],
    "setPronouns": ["[possessive:his][objective:him]", "[possessive:her][objective:her]", "[possessive:its][objective:it]"],
    "story": ["#meteorite# feels #mood#.  It must be all that #material#!  #quest#"],
    "quest": ["Find #objective# some #goal# to hear #possessive# story."],
    "origin": ["#[meteorite:#name#][goal:#material#][#setPronouns#]story#"]
  }
  var trace = tracery.createGrammar(meteoriteGrammar);
  // var story = trace.flatten("#origin#");
  var storyTree = trace.expand("#origin#");
  var story = storyTree.finalText;
  console.log(story);
  console.log(storyTree);
  var goal = storyTree.children[0].children[0].actions[1].push.rules[0];
  // console.log(storyTree.children[0].children[0].actions.find("name"));
  var name = storyTree.children[0].children[0].actions[0].push.rules[0];
  // var story = storyTree.flatten();
  $("body").append(`<p>${story}</p>`);
  $("body").append(`<p>New quest: find ${goal} for ${name}</p>`);
  return story;
}
