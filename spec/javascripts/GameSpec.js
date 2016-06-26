describe("a Game", function() {
  var game, meteorite

  beforeEach(function() {
    game = new Game();
    meteorite = new Meteorite({properties: {name: "Nogata", year: "861-01-01T00:00:00.000", recclass: "L6", id: "22614"}, geometry: [12.73333, 50.18333]
    });
  });

  describe("initiazation", function(){
    it("initializes with Nogata", function() {
       expect(game.meteorites[0].name).toEqual("Nogata");
    });

    it("initializes with one meteorite", function() {
       expect(game.meteorites.length).toEqual(1);
    });
  });

  describe("extendeds revealed meteorites properly", function(){
    beforeEach(function() {
      game.extendMeteoritesAPI(meteorite);
    });

    it("adds the next set of meteorites", function() {
      expect(game.meteorites.length).toEqual(37);
    });

    it("stops adding meteorites when class is matched", function() {
      expect(game.meteorites[36].recclass).toEqual("L6");
    });

    it("doesn't duplicate if next meteorite in family is already revealed", function() {
      game.extendMeteoritesAPI(meteorite);
      expect(game.meteorites.length).toEqual(37);
    });

    it("will extend multiple times if new meteorite is called", function() {
      game.extendMeteoritesAPI(game.meteorites[36]);
      expect(game.meteorites.length).toBeGreaterThan(37);
    });


  });

  describe("sets a meteorites nextMeteorite", function(){
    it("sets a meteorites next meteorite", function() {
      game.setNextMeteorite(meteorite);
      expect(meteorite.nextMeteorite.name).toEqual("Lucé");
    });
  });



});
