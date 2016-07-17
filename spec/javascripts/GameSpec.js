describe("a Game", function() {

  var mapDiv;
  var game, meteorite

  beforeEach(function(done) {
    setTimeout(function() {
      mapDiv = $("<div id='cartodb-map'></div>");
      mapDiv.appendTo('body');
      game = new Game(1);
      done();
    }, 0);
  });

  afterEach(function() {
    mapDiv.remove();
  })

  describe("initiazation", function(){
    it("initializes with Nogata", function(done) {
      setTimeout(function() {
        expect(game.meteorites[0].name).toEqual("Nogata");
        done();
      }, 300);
    });

    it("initializes with one meteorite", function(done) {
      setTimeout(function() {
       expect(game.meteorites.length).toEqual(1);
       done();
      }, 300);
    });
  });


  describe("extendeds revealed meteorites properly", function(){
    // beforeEach(function(done) {
    //   setTimeout(function() {
    //     game.extendMeteoritesAPI(meteorite);
    //     done();
    //   }, 100);
    // });

    it("adds the next set of meteorites", function() {
      // setTimeout(function() {
        // game.extendMeteoritesAPI(meteorite);
        expect(game.meteorites.length).toEqual(37);
      //   done();
      // }, 1000);
    });

  //   it("stops adding meteorites when class is matched", function() {
  //     expect(game.meteorites[36].recclass).toEqual("L6");
  //   });

  //   it("doesn't duplicate if next meteorite in family is already revealed", function() {
  //     game.extendMeteoritesAPI(meteorite);
  //     expect(game.meteorites.length).toEqual(37);
  //   });

  //   it("will extend multiple times if new meteorite is called", function() {
  //     game.extendMeteoritesAPI(game.meteorites[36]);
  //     expect(game.meteorites.length).toBeGreaterThan(37);
  //   });
  });

  // describe("sets a meteorites nextMeteorite", function(){
  //   it("sets a meteorites next meteorite", function() {
  //     game.setNextMeteorite(meteorite);
  //     expect(meteorite.nextMeteorite.name).toEqual("Lucé");
  //   });
  // });

  // describe("has families", function(){
  //   beforeEach(function() {
  //     game.lfamily.push("L");
  //     game.hfamily.push("H");
  //     game.ifamily.push("I");
  //     game.ufamily.push("U");
  //   });
  //   it("returns a family array", function() {
  //     expect(game.findFamily(meteorite)[0]).toEqual("L");
  //   });

  //   it("adds a meteorite to a family array", function() {
  //     game.addToFamily(meteorite);
  //     expect(game.lfamily.length).toEqual(2);
  //   });

  //   it("will not add a meteorite to a family if it is already there", function() {
  //     game.addToFamily(meteorite);
  //     game.addToFamily(meteorite);
  //     expect(game.lfamily.length).toEqual(2);
  //   });

  //   it("checks if a family has been reunited", function() {
  //     game.lfamily.push("L");
  //     game.lfamily.push("L");
  //     game.lfamily.push("L");
  //     game.lfamily.push("L");
  //     game.addToFamily(meteorite);
  //     expect(game.checkFamilyVictory(meteorite)).toEqual(true);
  //     expect(game.lfamily.length).toEqual(0);
  //   });
  // });



});
