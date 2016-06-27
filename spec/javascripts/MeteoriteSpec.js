describe("a Meteorite", function() {
  var meteorite;

  beforeEach(function() {
    meteorite = new Meteorite({properties: {name: "Rivolta de Bassi", year: "1491-01-01T00:00:00.000", recclass: "Stone-uncl", id: "22614"}, geometry: [12.73333, 50.18333];
    });
  });


  it("has a name", function() {
     expect(meteorite.name).toEqual("Rivolta de Bassi");
  });

  it("has a year", function() {
     expect(meteorite.year).toEqual("1491-01-01T00:00:00.000");
  });

  it("has a recclass", function() {
     expect(meteorite.recclass).toEqual("Stone-uncl");
  });

  it("has a location", function() {
     expect(meteorite.location).toEqual([12.73333, 50.18333]);
  });

  it("has a nasa ID", function() {
     expect(meteorite.nasaId).toEqual("22614");
  });

  describe("Meteorite tells story.", function() {
    it("will tell a confused story before defeat", function() {
      expect(meteorite.tellStory()).toMatch(/My name is/);
    });

    it("will tell a coherent story after defeat", function() {
      meteorite.defeated = true;
      meteorite.generateStory();
      expect(meteorite.tellStory()).toMatch(/Please find/);
    });
  });
});
