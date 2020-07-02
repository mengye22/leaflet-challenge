
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  
d3.json(queryUrl, data => {

    createFeatures(data.features);
});

function chooseColor(color){
    return color > 5 ? '#660000':
        color > 4 ? '#cc0000':
        color > 3 ? '#cc3300':
        color > 2 ? '#cc6600':
        color > 1 ? '#cccc00': '#99cc00';
}


function createFeatures(earthquakeData) {

    function circleSize(feature,latlng) {
        return new L.Circle(latlng, {
            radius:feature.properties.mag * 20000,
            fillOpacity:1,
            color:"black",
            fillColor: chooseColor(feature.properties.mag),
            stroke:false
            })

    }
    function addDetails(feature,layer){
        layer.bindPopup("<h3>"+ feature.properties.place + "</h3><hr><p>Magnitude: <strong>"
            + feature.properties.mag + "</strong><hr>" + new Date(feature.properties.time) + "</p>")
    }
    var earthquake = L.geoJSON(earthquakeData, {
        onEachFeature:addDetails,
        pointToLayer:circleSize
    });

    createMap(earthquake);

}


function createMap(earthquake){
    // define lightmap layers
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
        });

    var map = L.map("map",{
        center:[37,-122],
        zoom:4,
        layers:[light,earthquake]
    });
    
    var legend = L.control({position: "bottomright"});

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
    legend.addTo(map)
}

