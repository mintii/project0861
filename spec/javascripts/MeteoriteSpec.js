describe("a Meteorite", function() {
  var meteorite

  beforeEach(function() {
    meteorite = new Meteorite({properties: {name: "Rivolta de Bassi", year: "1491-01-01T00:00:00.000", recclass: "Stone-uncl", id: "22614"}, geometry: [12.73333, 50.18333]
    });
  });



  it("has a name", function() {
     expect(meteorite.name).toEqual("Rivolta de Bassi");
  });



});
