// console.log("working");


// var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
// });


// // We create the map object with options.
// var map = L.map("mapid", {
//   center: [
//     40.7, -94.5
//   ],
//   zoom: 3
// });

// // Then we add our 'graymap' tile layer to the map.
// graymap.addTo(map);


var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
     pointToLayer: function (feature, latlng) {
         var geojsonMarkerOptions = {
             radius: 3*feature.properties.mag,
             fillColor: "#ff7800",
             color: "#000",
             weight: 1,
             opacity: 1,
             fillOpacity: 0.8
         };
         return L.circleMarker(latlng, geojsonMarkerOptions);
     }
  });



// Sending our earthquakes layer to the createMap function
createMap(earthquakes);
}

function createMap(earthquakes) {

    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.street",
      accessToken: API_KEY
    });
    
     // Define a baseMaps object to hold our base layers
     var baseMaps = {
      "Street Map": streetmap,
    };
    
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };
    
     // Create the map object with options
     var mymap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });
    
     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
     L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(mymap);

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(mymap);
    }
    
    // // https://leafletjs.com/examples/choropleth/
    // function getColor(d) {
    //   return d > 1 ? '#800026' :
    //          d > 2  ? '#BD0026' :
    //          d > 3  ? '#E31A1C' :
    //          d > 4  ? '#FC4E2A' :
    //          d > 5   ? '#FD8D3C' :
    //          d > 6  ? '#FEB24C' :
    //          d > 7   ? '#FED976' :
    //                     '#FFEDA0';
    // }
    
    //  // Set up the legend
