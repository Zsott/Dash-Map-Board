# About the "Dash-Map-Board" project
_aka Easy way to create map-based time-aware dashboard for "lightweight" coders_

## Created by
- László Lellei (spatial data expert)
- Zsolt Ónodi (GIS expert)

#### Contanct us
E-mail: dashmapboard[at]gmail[dot]com

## Short description
Our project goal is to create a configurable time-aware dashboard using ArcGIS JS API and amCharts JS Charts.
If you're new with this whole programming stuff, you only have to change some parameters in [config.json](config.json) with which the "[Configuration guide](configurationGuide.md)" will help.
If you like to dive into codes you can also alter HTML, CSS and JS files as well to create a custom dashboard with map.

## Preparations and preconfigurations
You will need at least one time-aware ESRI MapService. You can find several guides and tutorials on the internet or you can follow our MapService Creation Guide _[COMING SOON]_.  
When you've created or found at least one time-aware service you're ready to change the configuration file ([config.json](config.json)) following our [Configuration Guide](configurationGuide.md).  
But first you may want to check our sample webapp and mainly its [config.json](sampleWebapp/config.json) and change some of the configurations. Don't rush, change only one at a time and check what does it do exactly! When you feel comfortable with the sample, create your own service(s) and build the configuration file from scratch!

## Change log
### v1.0
- You can create a map-based time-aware dashboard web application.
- You can combine several themes in one application.
- The webapp contains one map and zero to three charts for each theme.
- You can choose serial, pie, radar, bubble charts and table.
- You can use a chart type only once.

## Future plans
- Multiple charts of the same type in one dashboard.
- Multiple maps in one dashboard.
- Search box on the map.
- Resizable (map/chart) boxes.
- Front-end chart type seletion for each box.
- Move more parameter from JS to config.json.
- More selectable chart types.
