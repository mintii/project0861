
// $(document).ready(function($) {
//   // $("body").on("click", function() {

//   $("body").load(init());

//   // });

// });

// var map;
// function init(){
//   // initiate leaflet map
//   map = new L.Map('#cartodb-map', {
//     center: [0,0],
//     zoom: 2
//   })

//   L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
//     attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
//   }).addTo(map);

//   var layerUrl = 'https://tlantz.cartodb.com/api/v2/viz/9bd62f5e-3a38-11e6-ac85-0e98b61680bf/viz.json';
//   // var subLayerOptions = {
//   //   sql: "SELECT * FROM example_cartodbjs_1 where adm0_a3 = 'USA'"
//   // }

//   cartodb.createLayer(map, layerUrl)
//     .addTo(map)
//     .on('done', function(layer) {
//       // layer.getSubLayer(0).set(subLayerOptions);
//     }).on('error', function() {
//       //log the error
//     });
// }


//  var $banana = $("#cartodb-map")
