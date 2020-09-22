# Visualizing Data with Leaflet

## Task

### Level 1: Basic Visualization

![2-BasicMap](Images/2-BasicMap.png)

Visualize an earthquake data set.

1. **Get data set**

   ![3-Data](Images/3-Data.png)
   
The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and visualize the weekly dataset.

   ![4-JSON](Images/4-JSON.png)
   
2. **Import & Visualize the Data**

   Create a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * The data markers is reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for the map data.

   * Visualization should look something like the map above.

- - -

### Level 2: More Data 

![5-Advanced](Images/5-Advanced.png)

Plot a second data set on the map to illustrate the relationship between tectonic plates and seismic activity. Need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step we are going to..

* Plot a second data set on our map.

* Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Add layer controls to our map.


