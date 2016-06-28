var Gamemap =  function(game) {
  this.map = new L.Map('cartodb-map', {
    center: [0,0],
    zoom: 2
  });

  this.game = game;

  L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
    attribution: ''
  }).addTo(this.map);

  //show mouse coordiantes onscreen
  L.control.coordinates({
    position:"bottomleft", //optional default "bootomright"
    decimals:2, //optional default 4
    decimalSeperator:".", //optional default "."
    labelTemplateLat:"Latitude: {y}", //optional default "Lat: {y}"
    labelTemplateLng:"Longitude: {x}", //optional default "Lng: {x}"
    enableUserInput:true, //optional default true
    useDMS:false, //optional default false
    useLatLngOrder: true, //ordering of labels, default false-> lng-lat
    markerType: L.marker, //optional default L.marker
    markerProps: {}, //optional default {},
  }).addTo(this.map);
};

Gamemap.prototype.renderMap = function() {
  var layerUrl = 'https://tlantz.cartodb.com/api/v2/viz/9bd62f5e-3a38-11e6-ac85-0e98b61680bf/viz.json';
  var subLayerOptions = {
    sql: this.newQuery()
  }
  var gamemap = this;
  var map = this.map;

  cartodb.createLayer(map, layerUrl)
    .addTo(map)

    .on('done', function(layer) {
      var sublayer = layer.getSubLayer(0);
      sublayer.set(subLayerOptions);
      sublayer.infowindow.set({
        template: $('#infowindow_template').html(),
        sanitizeTemplate: false
      });

    sublayer.on('featureClick', function(e, latlng, pos, data) {
      var id_query = "SELECT nasaid FROM rows WHERE (cartodb_id = " + data["cartodb_id"] + ")";
      var nasaidGetUrl = 'https://tlantz.cartodb.com/api/v2/sql?q=' + id_query;

      var request = $.getJSON(nasaidGetUrl);
      request.done(function(data) {
        var nasaId = data["rows"][0]["nasaid"];
        var currentMeteorite = findCurrentMeteorite(nasaId, gamemap.game.meteorites);
        renderInfo(currentMeteorite);
        $('#win-button').on('click', function() {
          if (!currentMeteorite.defeated) {
            var secondRequest = gamemap.game.defeat(currentMeteorite);
            secondRequest.done(function() {
              renderInfo(currentMeteorite);
              sublayer.setSQL(gamemap.newQuery());
            });
          }
        });
      });
    });

    }).on('error', function() {
      console.log("some error occurred");
  });

}

var findCurrentMeteorite = function(nasaId, meteorites) {
  for (var i = 0; i < meteorites.length; i++) {
    if (meteorites[i].nasaId == nasaId) {
      return meteorites[i];
    }
  }
}

var renderInfo = function(meteorite) {
  $('#name').text(meteorite.name);
  $('#year').text('year: ' + meteorite.getYear() + ' AD');
  $('#recclass').text('family: ' + meteorite.recclass);
  $('#latitude').text('latitude: ' + meteorite.getLat());
  $('#longitude').text('longitude: ' + meteorite.getLong());
  // $('#m-image').html('<img src="p-blue.png"/>');
  $('#story').text(meteorite.tellStory());
}

Gamemap.prototype.newQuery = function() {
  var yearFrom = "'0860-12-24T14:26:40-06:00'"
  var lastMeteorite = this.game.meteorites[this.game.meteorites.length -1];
  return "SELECT * FROM rows WHERE (year >= (" + yearFrom + ") AND year <= ('" + lastMeteorite.year + "'))"
}
