# Configuration Guide
_How to set up config.json?_
The purpose of this document is to help you with the 

### Common advices
- JSON, key-value, special characters (: , {} []
- ___comment___
- time avare service
- 

### config.json parameters
#### [theme]/layout/leftPanelWidthPercent
`"leftPanelWidthPercent" : Please give a number!`  
**Description**: Sets the width (in percents of the screen width) of the left panel which contains the map and optionally one chart. Also sets the width of the right panel (100 - leftPanelWidthPercent).  
**Type**: number  
**Valid values**: 0 to 100  
**Example value**: 50  
**Tips**: Though 0 is valid value it's not a great idea to set up your page with 0 left panel width as the map can't be seen and clicked.

#### [theme]/layout/mapHeightPercent
`"mapHeightPercent" : Please give a number!`  
**Description**: Sets the height (in percents of the left panel) of the map and also sets the height of the chart below the map (100 - mapHeightPercent).  
**Type**: number  
**Valid values**: 0 to 100  
**Example value**: 40  
**Tips**: Though 0 is valid value it's not a great idea to set up your page with 0 map height as the map can't be seen and clicked.

#### [theme]/layout/upperRightChartHeightPercent
`"upperRightChartHeightPercent" : Please give a number!`  
**Description**: Sets the height (in percents of the right panel) of the upper right chart and also sets the height of the lower right chart (100 - upperRightChartHeightPercent).  
**Type**: number  
**Valid values**: 0 to 100  
**Example value**: 60

#### [theme]/layout/legendOn
`"legendOn" : Please give a 'true' or 'false' value!`  
**Description**: Sets if clickable legend icon appears on the map or not. (If so it will appear in the upper right corner of the map.)  
**Type**: boolean  
**Valid values**: true/false  
**Example value**: true  
**Tips**: You can change the icon of the legend by replacing the 'img\legend.png' file.

#### [theme]/layout/logoImg
`"logoImg" : "Pleas give the logo image's filename as a string!"`  
**Description**: Sets which image is used as a logo in the header.  
**Type**: string  
**Valid values**: Any filename (with extension) between quotation marks.  
**Example value**: "logo.png"  
**Tips**: To use your own logo copy it first into the 'img' folder!

#### [theme]/layout/title
`"title" : "Please give the title in the header as a string!"`  
**Description**: Sets the text of the title shown in the header.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Demography of Hungary"  
**Tips**: Too long title may cause that the title and/or the subtitle will disappear.

#### [theme]/layout/subTitle
`"subTitle" : "Please give the subtitle in the header as a string!"`  
**Description**: Sets the text of the subtitle shown in the header.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Population change by settlements"  
**Tips**: Too long subtitle may cause that the subtitle will disappear.

#### [theme]/layout/splashText
`"splashText" : "Please give the HTML text you want to show in the splash window!"`  
**Description**: Sets the content of the splash (welcome) window.  
**Type**: string  
**Valid values**: Any string (HTML tags can be used also)  
**Example value**: "Welcome to the <b>Demography of Hungary</b> project's webpage!</br>Click on any settlement to check its population related data!"  
**Tips**: Use empty string ("") if you don't want to use splash window. You can use HTML tags in the string.

#### [theme]/layout/infoBoxTest
`"infoBoxTest" : "Please give the HTML text you want to show in the info window!"`  
**Description**: Sets the content of the information window (shown if info icon clicked).  
**Type**: string  
**Valid values**: Any string (HTML tags can be used also)  
**Example value**: "Welcome to the <b>Demography of Hungary</b> project's webpage!</br>Click on any settlement to check its population related data!"  
**Tips**: Use empty string ("") if you don't want to use information window. You can use HTML tags in the string.

#### [theme]/layout/clickOnWhat
`"clickOnWhat" : "Please give the text you want to show as a hint for the users!"`  
**Description**: Sets the hint text shown on the actual panel before the first click.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Click on a settlement!"  
**Tips**: Too long string may cause that the dropdown menu will disappear or appear in a wrong place.

#### [theme]/wkid
`"wkid" : Please give the EPSG code (as a number) of the spatial reference system!`  
**Description**: Sets the spatial reference system of the map.  
**Type**: number  
**Valid values**: Any EPSG code  
**Example value**: 3857

#### [theme]/xmin
`"xmin" : Please give the westernmost coordinate (as a number) of the initial extent!`  
**Description**: Sets the westernmost point of the initial map extent.  
**Type**: number  
**Valid values**: Any number inside the spatial reference system's extent  
**Example value**: 1600000  

#### [theme]/ymin
`"ymin" : Please give the southernmost coordinate (as a number) of the initial extent!`  
**Description**: Sets the southernmost point of the initial map extent.  
**Type**: number  
**Valid values**: Any number inside the spatial reference system's extent  
**Example value**: 5800000  

#### [theme]/xmax
`"xmax" : Please give the easternmost coordinate (as a number) of the initial extent!`  
**Description**: Sets the easternmost point of the initial map extent.  
**Type**: number  
**Valid values**: Any number inside the spatial reference system's extent  
**Example value**: 2800000  

#### [theme]/ymax
`"ymax" : Please give the northernmost coordinate (as a number) of the initial extent!`  
**Description**: Sets the northernmost point of the initial map extent.  
**Type**: number  
**Valid values**: Any number inside the spatial reference system's extent  
**Example value**: 6150000  

#### [theme]/timeStops
`"timeStops" : ["Please give array of timestops as strings!"]`  
**Description**: Sets the stops on the timeslider, serial chart and table.   
**Type**: array of strings  
**Valid values**: Any time code (in quotation marks, separated by commas, enclosed in square brackets)   
**Example value**: ["2010", "2011", "2012", "2013", "2014", "2015"]  
**Tips**: Timestops doesn't have to match the map service's time extent, it can be narrower. (It can also be wider but that doesn't really make any sense.)

#### [theme]/timeSliderMovingRate
`"timeSliderMovingRate" : Please give a number!`  
**Description**: Sets how long shows one timestop when timeslider is on autoplay.  
**Type**: number  
**Valid values**: 0 or greater (in milliseconds)  
**Example value**: 1500  

#### [theme]/dataServiceURL
`"dataServiceURL" : "Please give the URL of the time-aware Map Service as a string!"`  
**Description**: Sets the URL of the time-aware Map Service used in the map.  
**Type**: string  
**Valid values**: Any active and shared time-aware Map Service URL in quotation marks  
**Example value**: "http://maps2.arcgisonline.com/ArcGIS/rest/services/World_Bank/WB_Age_and_Population/MapServer"

#### [theme]/dataServiceLayerIndex
`"dataServiceLayerIndex" : Please give a number!`  
**Description**: Defines which layers is the one within the service you want to use as source of data.  
**Type**: number  
**Valid values**: 0 or greater integer  
**Example value**: 0  

#### [theme]/dataServiceLayerPosition
`""dataServiceLayerPosition" : Please give a number!`  
**Description**: Defines the position of the data layer compared to other (supporting) layers.  
**Type**: number  
**Valid values**: 0 or greater integer  
**Example value**: 1  
**Tips**: The layer with 0 position is at the bottom and all other comes above this.

#### [theme]/additionalLayerURLs
`"additionalLayerURLs" : ["Please give array of Map Service URLs as strings!"]`  
**Description**: ...  
**Type**: array of strings  
**Valid values**: Any active and shared Map Service URLs (in quotation marks, separated by commas, enclosed in square brackets)  
**Example value**: ["https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer","http://services.nationalmap.gov/ArcGIS/rest/services/nhd/MapServer"]  

#### [theme]/areaNameField
`"areaNameField" : "Please give the fieldname (as a string) that contains the name of map objects!"`  
**Description**: Defines which field in the service data layer contains the name of the mapped objects.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "nuts5name"  

#### [theme]/...
`"dataServiceLayerIndex" : Please give a number!`  
**Description**: ...  
**Type**: ...  
**Valid values**: ...  
**Example value**: ...  
**Tips**: ...

#### [theme]/...
`"dataServiceLayerIndex" : Please give a number!`  
**Description**: ...  
**Type**: ...  
**Valid values**: ...  
**Example value**: ...  
**Tips**: ...

#### [theme]/...
`"dataServiceLayerIndex" : Please give a number!`  
**Description**: ...  
**Type**: ...  
**Valid values**: ...  
**Example value**: ...  
**Tips**: ...
