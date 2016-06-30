var Gamemap =  function(game) {
  this.game = game;

  var southWest = L.latLng(-64, -166),
    northEast = L.latLng(82, 180),
    bounds = L.latLngBounds(southWest, northEast);




  this.map = new L.Map('cartodb-map', {
    center: [0,0],
    zoom: 3,
    minZoom: 3,
    maxZoom: 5,
    maxBounds: bounds
  });

  L.tileLayer('https://a.tiles.mapbox.com/v4/colemanm.blue-marble-8bit/{z}/{x}/{y}.png?access_token={token}', {
    attribution: 'cartodb-map',
    token: 'pk.eyJ1IjoiY29sZW1hbm0iLCJhIjoieW8wN2lTNCJ9.j1zlDeYFSVAl8XWjaHY-5w#4/7.58/11.56'
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
  var layerUrl = 'https://tlantz.cartodb.com/api/v2/viz/8cdeef5c-3d78-11e6-b546-0e31c9be1b51/viz.json';
  var subLayerOptions = {
    sql: this.newQuery()
  }
  var gamemap = this;
  var map = this.map;

  // $('#logout-button').on('click', function() {
  //   console.log("you're clicking me!");
  //   var logout = $.ajax({
  //     method: 'get',
  //     url: '/logout'
  //   });
  //
  // });


  cartodb.createLayer(map, layerUrl)
    .addTo(map)

    .on('done', function(layer) {
      var sublayer = layer.getSubLayer(0);
      sublayer.set(subLayerOptions);
      sublayer.infowindow.set({
        template: $('#infowindow_template').html(),
        sanitizeTemplate: false
      });

      $('#title-box').html("<p>project</p><p><span style='font-size: 2em'> &nbsp &nbsp 0861</span></p>");
      $('#sidebar').html("<div id='fam-list-header'><h5>Family Members Collected</h5></div><div id='fam-list'><ul><li id='L-display'></li><li id='H-display'></li><li id='I-display'></li> <li id='U-display'></li></ul></div><div id='fam-rescue-display'></div>")
      renderFamilies(gamemap.game);


    sublayer.on('featureClick', function(e, latlng, pos, data) {
      var id_query = "SELECT nasaid FROM rows WHERE (cartodb_id = " + data["cartodb_id"] + ")";
      var nasaidGetUrl = 'https://tlantz.cartodb.com/api/v2/sql?q=' + id_query;

      var request = $.getJSON(nasaidGetUrl);
      request.done(function(data) {
        var nasaId = data["rows"][0]["nasaid"];
        var currentMeteorite = findCurrentMeteorite(nasaId, gamemap.game.meteorites);
        setTimeout(function() {
          renderInfo(currentMeteorite);
        }, 900);

        var winHandler = function() {
          $(".grid-container").remove();
          $("#goal").remove();
          $(".popup-content-wrapper").html("<div id='popup-content'><div id='m-info'><h1 id='name' style='font-size: 2em; padding-bottom: 10px'>PC7OX9DjPFgvml</h1><h3 id='year'>year: urMrN6oTncyr1A</h3><h3 id='recclass'>family: 2EkMu0iOn<h3><h3 id='latitude'>latitude: W3AXIE5GMHAOva</h3><h3 id='longitude'>longitude: wkIVtuOHKUX7cr</h3><br></div><div id='m-image'><img src='../assets/p-green.png' class='profile_pic'></div><p id='story'>UY16D8TfIAEKp2 zSK0sMyOHrQ0eV l8nqvLawMuJ2WD aCQhiMz0VlAPAQ 5kntlYoBCvx5kq JhFcbYHWg0Uy2Y 4j2DuHayM24rCI</p><h3 id='minigame-buttons'></h3><br></div>");
          var request = gamemap.game.defeat(currentMeteorite);
          request.done(function() {
            renderInfo(currentMeteorite);
            renderFamilies(gamemap.game);
            renderVictoryDisplay(gamemap.game, currentMeteorite);
            sublayer.setSQL(gamemap.newQuery());
          });
        }

        $(".cartodb-infowindow").on("click", "#reset-button", function() {
          if (!currentMeteorite.defeated) {
            var difficulty = gamemap.game.findFamily(currentMeteorite).length+5;
            var minigame = new Minigame2048(difficulty, winHandler);

            // $("#popup-content").hide();
            $(".popup-content-wrapper").html('<div class="grid-container"><div class="goal"><p>Target:'+ Math.pow(2, difficulty) +'</p><button class="minigame-buttons" id="reset-button">RESET</button></div><div class="grid-row"><div class="grid-cell" id="0"></div><div class="grid-cell" id="1"></div><div class="grid-cell" id="2"></div><div class="grid-cell" id="3"></div></div><div class="grid-row"><div class="grid-cell" id="4"></div><div class="grid-cell" id="5"></div><div class="grid-cell" id="6"></div><div class="grid-cell" id="7"></div></div><div class="grid-row"><div class="grid-cell" id="8"></div><div class="grid-cell" id="9"></div><div class="grid-cell" id="10"></div><div class="grid-cell" id="11"></div></div><div class="grid-row"><div class="grid-cell" id="12"></div><div class="grid-cell" id="13"></div><div class="grid-cell" id="14"></div><div class="grid-cell" id="15"></div></div></div>');

            minigame.spawn();
            minigame.spawn();
            minigame.play(gamemap, currentMeteorite);
          }
        });

        $(".cartodb-infowindow").on("click", "#minigame-button", function() {
          if (!currentMeteorite.defeated) {
            var difficulty = gamemap.game.findFamily(currentMeteorite).length+5;
            var minigame = new Minigame2048(difficulty, winHandler);

            // $("#popup-content").hide();
            $(".popup-content-wrapper").html('<div class="grid-container"><div class="goal"><p>Target:'+ Math.pow(2, difficulty) +'</p><button class="minigame-buttons" id="reset-button">RESET</button></div><div class="grid-row"><div class="grid-cell" id="0"></div><div class="grid-cell" id="1"></div><div class="grid-cell" id="2"></div><div class="grid-cell" id="3"></div></div><div class="grid-row"><div class="grid-cell" id="4"></div><div class="grid-cell" id="5"></div><div class="grid-cell" id="6"></div><div class="grid-cell" id="7"></div></div><div class="grid-row"><div class="grid-cell" id="8"></div><div class="grid-cell" id="9"></div><div class="grid-cell" id="10"></div><div class="grid-cell" id="11"></div></div><div class="grid-row"><div class="grid-cell" id="12"></div><div class="grid-cell" id="13"></div><div class="grid-cell" id="14"></div><div class="grid-cell" id="15"></div></div></div>');

            minigame.spawn();
            minigame.spawn();
            minigame.play(gamemap, currentMeteorite);
          }
        });

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

var renderFamilies = function(game) {
  $('#L-display').text('L: ' + game.lfamily.length);
  $('#H-display').text('H: ' + game.hfamily.length);
  $('#I-display').text('I: ' + game.ifamily.length);
  $('#U-display').text('U: ' + game.ufamily.length);
}

var renderVictoryDisplay = function(game, meteorite) {
  if (game.checkFamilyVictory(meteorite)) {
      $('#fam-rescue-display').text('You reunited a family!').show();
  } else {
    $('#fam-rescue-display').hide();
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
  if (!meteorite.defeated) {
  $('#minigame-buttons').html("<button class='minigame-buttons' id='minigame-button'>Play Minigame!</button>");
  } else {$('#minigame-buttons').html(""); };
}

Gamemap.prototype.newQuery = function() {
  var yearFrom = "'0860-12-24T14:26:40-06:00'"
  var lastMeteorite = this.game.meteorites[this.game.meteorites.length -1];
  return "SELECT * FROM rows WHERE (year >= (" + yearFrom + ") AND year <= ('" + lastMeteorite.year + "'))"
}
