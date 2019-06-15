// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

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
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p><br>Magnitude: " + feature.properties.mag);
}



  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (feature, latlng) {
      

      function getColor(d) {
        mag = d.properties.mag;
        
        return mag > 5  ? 'rgb(245, 59, 2)' :
               mag > 4  ? 'rgb(252, 144, 42)' :
               mag > 3   ? 'rgb(253, 176, 60)' :
               mag > 2   ? 'rgb(253, 224, 60)' :
               mag > 1   ? 'rgb(201, 253, 60)' :
                          'rgb(147, 253, 60)';
    }
    
    
      function getSize(d) {
        mag = d.properties.mag;
      
        return mag > 5  ? '18' :
               mag > 4  ? '16' :
               mag > 3   ? '14' :
               mag > 2   ? '12' :
               mag > 1   ? '10' :
                        '8';
  }




    
      var geojsonMarkerOptions = {
        radius: getSize(feature),
        fillColor: getColor(feature),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };


      return L.circleMarker(latlng, geojsonMarkerOptions);
  }, 
  onEachFeature: onEachFeature


 });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap layer
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });


  // Set up the legend
 // var legend = L.control({ position: "bottomright" });

 // legend.onAdd = function() {
 //   var div = L.DomUtil.create("div", "info legend");
    
 //   var limits = geojson.options.limits;
  //  var colors = geojson.options.colors;
  //  var labels = [];

    // Add min & max
  //  var legendInfo = "<h1>Median Income</h1>" +
  //    "<div class=\"labels\">" +
  //      "<div class=\"min\">" + limits[0] + "</div>" +
    //    "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      //"</div>";

   // div.innerHTML = legendInfo;

   // limits.forEach(function(limit, index) {
   //   labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
   // });

   // div.innerHTML += "<ul>" + labels.join("") + "</ul>";
   // return div;
 // };

  // Adding legend to the map
  //legend.addTo(myMap);

}








