describe("a Meteorite", function() {
  var meteorite

  beforeEach(function() {
    meteorite = new Meteorite({properties: {name: "Rivolta de Bassi", year: "1491-01-01T00:00:00.000", recclass: "Stone-uncl", id: "22614"}, geometry: [12.73333, 50.18333]
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
     expect(meteorite.location).toEqual("Rivolta de Bassi");
  });

  it("has a nasa ID", function() {
     expect(meteorite.nasaId).toEqual("22614");
  });



});
