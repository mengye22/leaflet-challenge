// main url needed to run 
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var plateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

// use d3 to pass the variable 
d3.json(queryUrl, data => {

    createFeatures(data.features);
});


// function to choose color for different range of magnitude
function chooseColor(color){
    return color > 5 ? '#660000':
        color > 4 ? '#cc0000':
        color > 3 ? '#cc3300':
        color > 2 ? '#cc6600':
        color > 1 ? '#cccc00': '#99cc00';
}

// 
function createFeatures(earthquakeData) {
    // create circle for each lat and lng with magnitude as the circle size
    function circleSize(feature,latlng) {
        return new L.Circle(latlng, {
            // create bigger size to dispaly in the map
            radius:feature.properties.mag * 20000,
            fillOpacity:1,
            color:"black",
            fillColor: chooseColor(feature.properties.mag),
            stroke:false
            })

    }
    // create the popup to show the info of each earthquake
    function addDetails(feature,layer){
        layer.bindPopup("<h3>"+ feature.properties.place + "</h3><hr><p>Magnitude: <strong>"
            + feature.properties.mag + "</strong><hr>" + new Date(feature.properties.time) + "</p>")
    }
    // define variable to store structure for the map by using geoJSON
    var earthquake = L.geoJSON(earthquakeData, {
        onEachFeature:addDetails,
        pointToLayer:circleSize
    });
    // call the function to create map with features in the earthquake
    createMap(earthquake);

}


function createMap(earthquake){

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-v9",
        accessToken: API_KEY
        });

    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "outdoors-v10",
        accessToken: API_KEY
    });

    var faultLayer = new L.layerGroup();

    var baseMaps = {
        "Satellite":satellite,
        "Grayscales":light,
        "Outdoors":outdoors
    };

    var overlayMaps = {
        "Earthqueake" : earthquake,
        "Fault Line" : faultLayer
    };

    // define map
    var map = L.map("map",{
        center:[37,-122],
        zoom:4,
        layers:[satellite,earthquake,faultLayer]
    });

    L.control.layers(baseMaps,overlayMaps,{
        collapsed:false
    }).addTo(map);

    d3.json(plateUrl, function(data) {
        L.geoJSON(data, {
          style: function() {
            return {color: "orange",
                fillOpacity:0}
          }
        }).addTo(faultLayer)
      });

    // define legend
    var legend = L.control({position: "bottomright"});
    // add infomation and range for the legend
    legend.onAdd = function(map){
        var div = L.DomUtil.create('div', 'info legend'),
            steps = [0,1,2,3,4,5],
            labels = [];

        for (var i = 0; i < steps.length; i++) {
            div.innerHTML +=
                '<i style="background:' + chooseColor(steps[i] + 1) + '"></i> ' +
                steps[i] + (steps[i + 1] ? '&ndash;' + steps[i + 1] + '<br>' : '+');
        }
        return div;
    }
    // add legend to the map
    legend.addTo(map)
}

