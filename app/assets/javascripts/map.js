var map;

function init(){
  // initiate leaflet map
  map = new L.Map('cartodb-map', {
    center: [0,0],
    zoom: 2
  })

  L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
    attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
  }).addTo(map);

  var yearFrom = "'2000-12-24T14:26:40-06:00'"
  var yearTo = "'2010-12-24T14:26:40-06:00'"

  date_range_sql = "SELECT * FROM rows WHERE (year >= (" + yearFrom + ") AND year <= (" + yearTo + "))";

  var layerUrl = 'https://tlantz.cartodb.com/api/v2/viz/9bd62f5e-3a38-11e6-ac85-0e98b61680bf/viz.json';

  var subLayerOptions = {
    sql: date_range_sql
  }

  cartodb.createLayer(map, layerUrl)
    .addTo(map)

    .on('done', function(layer) {

      var sublayer = layer.getSubLayer(0);
      
      sublayer.set(subLayerOptions);
      sublayer.infowindow.set({
          template: $('#infowindow_template').html(),
          sanitizeTemplate: false

        });

    // sublayer.on('featureClick', function(e, latlng, pos, data) {
    //     alert("Hey! You clicked " + data.cartodb_id);
    // });

    }).on('error', function() {
      console.log("some error occurred");
  });

}
