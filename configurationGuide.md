# Configuration Guide
_How to set up config.json?_
The purpose of this document is to help you with the proper configuration of you own Dash-Map-Board webapp. To edit the config.json file you'll need a text editor. We suggest Notepad++, but you can use any kind of editor you prefer (normal Notepad, SublimeText, etc.).  
Open the config.json and follow the [config.json parameters](configurationGuide.md#configjson-parameters) chapter written below to change every parameter's value. Do not leave any parameter with it's default value (technically a hint) because it can cause errors!

### Common advices
JSON format has a very strict structure about which you can read a lot for example [here](http://json.org/), [here](https://www.w3schools.com/js/js_json_intro.asp) or [here](https://www.w3schools.com/js/js_json_syntax.asp).
- We use key-value pairs in the config.json file. Key is always a string located on the left. Following the key there's a colon `:` and after that there's the value corresponding to the key. For exampl: `"key" : "value"`.
- The value can be several type of data. We use `string`, `number`, `boolean`, `array` and `object` types, sometimes combined with each other like `array of strings`.
- If the type of parameter is string, use quotation marks `"` around the value. Like: `"title" : "Demography of Hungary"`
- If the type of parameter is number, simply put the number after the colon. Like: `"wkid" : 3857`
- If the type of parameter is boolean, simply put `true` or `false` after the colon (without quotation marks). Like: `"legendOn" : true`
- If the type of parameter is array (of something), put square brackets after the colon. Between the brackets you can put every item in the array (or list) separated by comma. Like: `"timeStops" : ["2000","2001","2002","2003","2004"]`
- If the type of parameter is object, put curly brackets after the colon. Inside an object we expect key-value pairs with the same rules written above. Like: `"fieldMap" : {"male2000" : "Male population, 2000,"female2000" : "Female population, 2000"}`
- In a JSON file comma `,` has a very important role as this is the character for separating key-value pairs.
- JSON rarely gives any feedback if something goes wrong so be very precise! **IMPORTANT: There will be no error message if you accidently delete a comma oryou give an invalid value (like a string without quotation marks). If you can't figure out what's wrong with the webapp we suggest to check the config.json!**
- In general we suggest to change the config.json step-by-step until you gain some confidence with it.

### Time-aware service(s)
For the Dash-Map-Board webapp you'll need at least one time-aware, shared ESRI MapService. A common mistake you can make is after you've published the service you forget to share it. If the webapp loads but it's empty, check the sharing options of the service!

### Available chart types
Dash-Map-Board gives you the opportunity to use several chart types.
##### Serial chart
This chart shows all timeStops so you can examine the whole period at a glance.
##### Pie chart
This chart can be used to show any kind of distribution.
##### Radar chart
This is a multidimensional chart that uses as many axes as there's available at the current time stop. For example if you don't have the data of internet users for 2007, in 2007 there will be only 4 axes (electricity / gas / drinking water /sewage) and there will be 5 axes for any other year in the period.
##### Bubble chart
This multidimensional chart can show exactly three different data on its X, Y and Z axes, where Z is the size of the bubble. It can also show multiple record where one bubble will be the clicked record and the others will be its neighbours. At this point this works only with polygon features.
##### Table
Though it's not a chart it can be a very useful tool to show the most important data in a structured way. The column of the actual time stop will be colored in a different way.

### config.json parameters
#### themeOrder
```
"themeOrder" : [{"theme2" : "Theme2 alias"},
                {"theme1" : "Theme1 alias"}]
```  
**Description**: Defines the order and names of the themes in the dropdown menu. This makes much more easier to reorder themes since you only have to change the order of the objects in the array. The first theme in the list will be the default (this will appear when the application starts). You can choose any theme name as a key, but the key of the theme **have to** match with the key in the latter part of the config.json.   
**Type**: array of objects  
**Valid values**: Any string as key and any string as value separated with colon enclosed by curly brackets make one object. These objects are seperated with comma and enclosed by square bracket.  
**Example value**: [{"demography" : "Demography of Hungary"},{"crime" : "Crime statistics of Budapest"}]  
**Tips**:

- This is one of the very rare occasions when you can change the key.
- You can have only one theme it's not necessary to have more.
- Too long aliases will cause line break in the dropdown menu.
- Too long aliases may cause that the hint for clicking and the dropdown menu may overlap.

#### [theme]/layout/leftPanelWidthPercent
```
"leftPanelWidthPercent" : Please give a number!
```
**Description**: Sets the width (in percents of the screen width) of the left panel which contains the map and optionally one chart. Also sets the width of the right panel (100 - leftPanelWidthPercent).  
**Type**: number  
**Valid values**: 0 to 100  
**Example value**: 50  
**Tips**: Though 0 is valid value it's not a great idea to set up your page with 0 left panel width as the map can't be seen and clicked.

#### [theme]/layout/mapHeightPercent
```
"mapHeightPercent" : Please give a number!
```
**Description**: Sets the height (in percents of the left panel) of the map and also sets the height of the chart below the map (100 - mapHeightPercent).  
**Type**: number  
**Valid values**: 0 to 100  
**Example value**: 40  
**Tips**: Though 0 is valid value it's not a great idea to set up your page with 0 map height as the map can't be seen and clicked.

#### [theme]/layout/upperRightChartHeightPercent
```
"upperRightChartHeightPercent" : Please give a number!
```
**Description**: Sets the height (in percents of the right panel) of the upper right chart and also sets the height of the lower right chart (100 - upperRightChartHeightPercent).  
**Type**: number  
**Valid values**: 0 to 100  
**Example value**: 60

#### [theme]/layout/legendOn
```
"legendOn" : Please give a 'true' or 'false' value!
```
**Description**: Sets if clickable legend icon appears on the map or not. (If so it will appear in the upper right corner of the map.)  
**Type**: boolean  
**Valid values**: true/false  
**Example value**: true  
**Tips**: You can change the icon of the legend by replacing the 'img\legend.png' file.

#### [theme]/layout/logoImg
```
"logoImg" : "Pleas give the logo image's filename as a string!"
```
**Description**: Sets which image is used as a logo in the header.  
**Type**: string  
**Valid values**: Any filename (with extension) between quotation marks.  
**Example value**: "img/logo.png"  
**Tips**: You have to add the path related to the index.html.

#### [theme]/layout/title
```
"title" : "Please give the title in the header as a string!"
```
**Description**: Sets the text of the title shown in the header.  
**Type**: string
**Valid values**: Any string  
**Example value**: "Demography of Hungary"  
**Tips**: Too long title may cause that the title and/or the subtitle will disappear.

#### [theme]/layout/subTitle
```
"subTitle" : "Please give the subtitle in the header as a string!"
```
**Description**: Sets the text of the subtitle shown in the header.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Population change by settlements"  
**Tips**: Too long subtitle may cause that the subtitle will disappear.

#### [theme]/layout/splashText
```
"splashText" : "Please give the HTML text you want to show in the splash window!"
```
**Description**: Sets the content of the splash (welcome) window.  
**Type**: string  
**Valid values**: Any string (HTML tags can be used also)  
**Example value**: "Welcome to the <b>Demography of Hungary</b> project's webpage!</br>Click on any settlement to check its population related data!"  
**Tips**: Use empty string ("") if you don't want to use splash window. You can use HTML tags in the string.

#### [theme]/layout/infoBoxText
```
"infoBoxText" : "Please give the HTML text you want to show in the info window!"
```
**Description**: Sets the content of the information window (shown if info icon clicked).  
**Type**: string  
**Valid values**: Any string (HTML tags can be used also)  
**Example value**: "Welcome to the <b>Demography of Hungary</b> project's webpage!</br>Click on any settlement to check its population related data!"  
**Tips**: Use empty string ("") if you don't want to use information window. You can use HTML tags in the string.

#### [theme]/layout/clickOnWhat
```
"clickOnWhat" : "Please give the text you want to show as a hint for the users!"
```
**Description**: Sets the hint text shown on the actual panel before the first click.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Click on a settlement!"  
**Tips**: Too long string may cause that the dropdown menu will disappear or appear in a wrong place.

#### [theme]/wkid
```
"wkid" : Please give the EPSG code (as a number) of the spatial reference system!
```
**Description**: Sets the spatial reference system of the map.  
**Type**: number  
**Valid values**: Any [EPSG code](http://spatialreference.org/ref/epsg/)  
**Example value**: 3857

#### [theme]/xmin
```
"xmin" : Please give the westernmost coordinate (as a number) of the initial extent!
```
**Description**: Sets the westernmost point of the initial map extent.  
**Type**: number  
**Valid values**: Any number inside the spatial reference system's extent  
**Example value**: 1600000  

#### [theme]/ymin
```
"ymin" : Please give the southernmost coordinate (as a number) of the initial extent!
```
**Description**: Sets the southernmost point of the initial map extent.  
**Type**: number  
**Valid values**: Any number inside the spatial reference system's extent  
**Example value**: 5800000  

#### [theme]/xmax
```
"xmax" : Please give the easternmost coordinate (as a number) of the initial extent!
```
**Description**: Sets the easternmost point of the initial map extent.  
**Type**: number  
**Valid values**: Any number inside the spatial reference system's extent  
**Example value**: 2800000  

#### [theme]/ymax
```
"ymax" : Please give the northernmost coordinate (as a number) of the initial extent!
```
**Description**: Sets the northernmost point of the initial map extent.  
**Type**: number  
**Valid values**: Any number inside the spatial reference system's extent  
**Example value**: 6150000  

### [theme]/basemap
```
"basemap" : "Please give the keyword (as a string) of the ESRI basemap! (Valid values: 'streets' , 'satellite' , 'hybrid', 'topo', 'gray', 'dark-gray', 'oceans', 'national-geographic', 'terrain', 'osm', 'dark-gray-vector', 'gray-vector', 'streets-vector', 'streets-night-vector', 'streets-relief-vector', 'streets-navigation-vector', 'topo-vector')"
```
**Description**: Sets the type of the basemap used under the thematic layer(s). Any valid [ESRI Map basemap keyword](https://developers.arcgis.com/javascript/3/jsapi/map-amd.html#map1) is accepted.  
**Type**: string  
**Valid values**: 'streets' , 'satellite' , 'hybrid', 'topo', 'gray', 'dark-gray', 'oceans', 'national-geographic', 'terrain', 'osm', 'dark-gray-vector', 'gray-vector', 'streets-vector', 'streets-night-vector', 'streets-relief-vector', 'streets-navigation-vector', 'topo-vector'  
**Example value**: 'topo'  

#### [theme]/timeStops
```
"timeStops" : ["Please give array of timestops as strings!"]
```
**Description**: Sets the stops on the timeslider, serial chart and table.   
**Type**: array of strings  
**Valid values**: Any time code (in quotation marks, separated by commas, enclosed in square brackets)   
**Example value**: ["2010", "2011", "2012", "2013", "2014", "2015"]  
**Tips**: Timestops doesn't have to match the map service's time extent, it can be narrower. (It can also be wider but that doesn't really make any sense.)

#### [theme]/timeSliderMovingRate
```
"timeSliderMovingRate" : Please give a number!
```
**Description**: Sets how long shows one timestop when timeslider is on autoplay.  
**Type**: number  
**Valid values**: 0 or greater (in milliseconds)  
**Example value**: 1500  

#### [theme]/dataServiceURL
```
"dataServiceURL" : "Please give the URL of the time-aware Map Service as a string!"
```
**Description**: Sets the URL of the time-aware Map Service used in the map.  
**Type**: string  
**Valid values**: Any active and shared time-aware Map Service URL in quotation marks  
**Example value**: "http://maps2.arcgisonline.com/ArcGIS/rest/services/World_Bank/WB_Age_and_Population/MapServer"

#### [theme]/dataServiceLayerIndex
```
"dataServiceLayerIndex" : Please give a number!
```
**Description**: Defines which layer of the service you want to use as source of data.  
**Type**: number  
**Valid values**: 0 or greater integer  
**Example value**: 0  

#### [theme]/dataServiceLayerPosition
```
"dataServiceLayerPosition" : Please give a number!
```
**Description**: Defines the position of the data layer compared to other (supporting) layers.  
**Type**: number  
**Valid values**: 0 or greater integer  
**Example value**: 1  
**Tips**: The layer with 0 position is at the bottom and all other comes above this.

#### [theme]/additionalLayerURLs
```
"additionalLayerURLs" : ["Please give array of Map Service URLs as strings!"]
```
**Description**: ...  
**Type**: array of strings  
**Valid values**: Any active and shared Map Service URLs (in quotation marks, separated by commas, enclosed in square brackets)  
**Example value**: ["https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer","http://services.nationalmap.gov/ArcGIS/rest/services/nhd/MapServer"]  

#### [theme]/areaNameField
```
"areaNameField" : "Please give the fieldname (as a string) that contains the name of map objects!"
```
**Description**: Defines which field in the service data layer contains the name of the mapped objects.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "nuts5name"  

#### [theme]/timeField
```
"timeField" : "Please give the fieldname (as a string) that contains the time information!"
```
**Description**: Defines which field in the service data layer contains the time data which makes the layer the time-aware.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "year"  

#### [theme]/chartPositions/LL
```
"LL" : "Please give the codename of the chart type as a string!"
```
**Description**: Defines which type of chart will be in the lower left panel (under the map).  
**Type**: string  
**Valid values**:
- "ser" (for serial chart)
- "pie" (for pie chart)
- "rad" (for radar chart)
- "bub" (for bubble chart)
- "tab" (for table)
**Example value**: "ser"  
**Tips**:
- If layout has been set not to show lower left panel, the chart/table won't appear on screen.
- In a theme you can use every chart/table type once. _Example: You can't have two pie charts in one theme, however you can use pie chart again in another theme._

#### [theme]/chartPositions/UR
```
"UR" : "Please give the codename of the chart type as a string!"
```
**Description**: Defines which type of chart will be in the upper right panel (next to the map).  
**Type**: string  
**Valid values**:
- "ser" (for serial chart)
- "pie" (for pie chart)
- "rad" (for radar chart)
- "bub" (for bubble chart)
- "tab" (for table)
**Example value**: "tab"  
**Tips**:
- If layout has been set not to show upper right panel, the chart/table won't appear on screen.
- In a theme you can use every chart/table type once. _Example: You can't have two pie charts in one theme, however you can use pie chart again in another theme._

#### [theme]/chartPositions/LR
```
"LR" : "Please give the codename of the chart type as a string!"
```
**Description**: Defines which type of chart will be in the lower right panel (diagonal to the map).  
**Type**: string  
**Valid values**:
- "ser" (for serial chart)
- "pie" (for pie chart)
- "rad" (for radar chart)
- "bub" (for bubble chart)
- "tab" (for table)
**Example value**: "pie"  
**Tips**:
- If layout has been set not to show lower right panel, the chart/table won't appear on screen.
- In a theme you can use every chart/table type once. _Example: You can't have two pie charts in one theme, however you can use pie chart again in another theme._

#### [theme]/serialSettings/title
```
"title" : "Please give the title of the serial chart as a string!"
```
**Description**: Sets the title of the serial chart.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Population by age"  

#### [theme]/serialSettings/colors
```
"colors" : ["Please give array of hex colors as strings!"]
```
**Description**: Sets a color palette which will be used on the chart.  
**Type**: array of strings  
**Valid values**: Any hex codes starting with # (in quotation marks, separated with commas, enclosed by square brackets)  
**Example value**: ["#BFC46B","#85ACCE","#914441"]  
**Tips**: If there are less color in the array than needed, random colors will be applied. Colors will be applied in the same order as they are defined in the array. If don't want to define colors, use empty array ( [] ) as value.

#### [theme]/serialSettings/dataPrecision
```
"dataPrecision" : Please give a number!
```
**Description**: Sets the number of decimal places for rounding values. 
**Type**: number  
**Valid values**: 0 or greater integer  
**Example value**: 0  
**Tips**: 0 dataPrecision means integer numbers.

#### [theme]/serialSettings/dataUnit
```
"dataUnit" : "Please give the data unit of the serial chart as a string!"
```
**Description**: Sets the unit shown at the Y axis.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "persons"  

#### [theme]/serialSettings/yAxesMax
```
"yAxesMax" : Please give the maximum Y axis value as a number!
```
**Description**: Sets the maximum value of Y axis.  
**Type**: number (or empty string)  
**Valid values**: Any number and empty string ("")  
**Example value**: 10000  
**Tips**: If you don't want to use maximum value, use empty string as value (""). In some cases the maximum value can be override by amChart logic. (For mor information check amChart JS documentation.)

#### [theme]/serialSettings/yAxesMin
```
"yAxesMin" : Please give the minimum Y axis value as a number!
```
**Description**: Sets the minimum value of Y axis.  
**Type**: number (or empty string)  
**Valid values**: Any number and empty string ("")  
**Example value**: 10000  
**Tips**: If you don't want to use minimum value, use empty string as value (""). In some cases the minimum value can be override by amChart logic. (For mor information check amChart JS documentation.)

#### [theme]/serialSettings/sorting
```
"sorting" : "Please give the type of sorting as a string! (Valid values: 'asc', 'desc')"
```
**Description**: Sets the order of the time stops in the serial chart.  
**Type**: string  
**Valid values**:  
- 'desc' for descending order  
- 'asc' for ascending order  
**Example value**: 'desc'  

#### [theme]/serialSettings/fieldMap
```
"fieldMap" : {
    "field" : "alias",
    "field" : "alias"
}
```  
**Description**: Defines which fields of the data layer appear on the serial chart. If multiple fields are listed, stacked serial chart will be created. Fieldnames will be replaced with aliases on the chart.  
**Type**: object  
**Valid values**: Any string as keys, any string as aliases  
**Example value**: {"young" : "0-17 years","adult" : "18-59 years","old" : "60 year and above"}  
**Tips**: This is one of the very rare occasions when you have to change the key.

#### [theme]/pieSettings/title
```
"title" : "Please give the title of the pie chart as a string!"
```
**Description**: Sets the title of the pie chart.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Population by age"  

#### [theme]/pieSettings/colors
```
"colors" : ["Please give array of hex colors as strings!"]
```
**Description**: Sets a color palette which will be used on the chart.  
**Type**: array of strings  
**Valid values**: Any hex codes starting with # (in quotation marks, separated with commas, enclosed by square brackets)  
**Example value**: ["#BFC46B","#85ACCE","#914441"]  
**Tips**: If there are less color in the array than needed, random colors will be applied. Colors will be applied in the same order as they are defined in the array. If don't want to define colors, use empty array ( [] ) as value.

#### [theme]/pieSettings/fieldMap
```
"fieldMap" : {
    "field" : "alias",
    "field" : "alias"
}
```  
**Description**: Defines which fields of the data layer appear on the pie chart.  
**Type**: object  
**Valid values**: Any string as keys, any string as aliases  
**Example value**: {"young" : "0-17 years","adult" : "18-59 years","old" : "60 year and above"}  
**Tips**: This is one of the very rare occasions when you have to change the key.

#### [theme]/radarSettings/title
```
"title" : "Please give the title of the radar chart as a string!"
```
**Description**: Sets the title of the radar chart.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Infrastructure supply"  

#### [theme]/radarSettings/colors
```
"colors" : ["Please give array of hex colors as strings!"]
```
**Description**: Sets a color palette which will be used on the chart. One color will be enough as there's only one line on the radar chart.  
**Type**: array of strings  
**Valid values**: Any hex codes starting with # (in quotation marks, separated with commas, enclosed by square brackets)  
**Example value**: ["#BFC46B"]  
**Tips**: If there are less color in the array than needed, random colors will be applied. Colors will be applied in the same order as they are defined in the array. If don't want to define colors, use empty array ( [] ) as value.

#### [theme]/radarSettings/dataPrecision
```
"dataPrecision" : Please give a number!
```
**Description**: Sets the number of decimal places for rounding values. 
**Type**: number  
**Valid values**: 0 or greater integer  
**Example value**: 0  
**Tips**: 0 dataPrecision means integer numbers.

#### [theme]/radarSettings/dataUnit
```
"dataUnit" : "Please give the data unit of the serial chart as a string!"
```
**Description**: Sets the unit shown at hover baloon.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "%"  

#### [theme]/radarSettings/xAxesMax
```
"xAxesMax" : "Please give the maximum axis value as a number!
```
**Description**: Sets the maximum value of axes.  
**Type**: number (or empty string)  
**Valid values**: Any number and empty string ("")  
**Example value**: 100  
**Tips**: If you don't want to use maximum value, use empty string as value (""). In some cases the maximum value can be override by amChart logic. (For mor information check amChart JS documentation.)

#### [theme]/radarSettings/xAxesMin
```
"xAxesMin" : "Please give the minimum axis value as a number!"
```
**Description**: Sets the minimum value of axes.  
**Type**: number (or empty string)  
**Valid values**: Any number and empty string ("")  
**Example value**: 0  
**Tips**: If you don't want to use minimum value, use empty string as value (""). In some cases the minimum value can be override by amChart logic. (For mor information check amChart JS documentation.)

#### [theme]/radarSettings/fieldMap
```
"fieldMap" : {
    "field" : "alias",
    "field" : "alias"
}
```  
**Description**: Defines which fields of the data layer appear on the radar chart.  
**Type**: object  
**Valid values**: Any string as keys, any string as aliases  
**Example value**: {"water" : "Water","waste" : "Waste water","elec" : "Electricity","gas" : "Gas", "internet": "Internet"}  
**Tips**: This is one of the very rare occasions when you have to change the key. There will be as many axes on the radar chart as many key-value pairs in the fieldMap.

#### [theme]/bubbleSettings/title
```
"title" : "Please give the title of the bubble chart as a string!"
```
**Description**: Sets the title of the bubble chart.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Migration"  

#### [theme]/bubbleSettings/colors
```
"colors" : ["Please give array of hex colors as strings!"]
```
**Description**: Sets a color palette which will be used on the chart. Two colors will be enough. First color will apply to the selected object, the second color will be applied to its neighbours.  
**Type**: array of strings  
**Valid values**: Any hex codes starting with # (in quotation marks, separated with commas, enclosed by square brackets)  
**Example value**: ["#BFC46B","#85ACCE"]  
**Tips**: If there are less color in the array than needed, random colors will be applied. Colors will be applied in the same order as they are defined in the array. If don't want to define colors, use empty array ( [] ) as value.

#### [theme]/bubbleSettings/dataPrecision
```
"dataPrecision" : Please give a number!
```
**Description**: Sets the number of decimal places for rounding values. 
**Type**: number  
**Valid values**: 0 or greater integer  
**Example value**: 0  
**Tips**: 0 dataPrecision means integer numbers.

#### [theme]/bubbleSettings/xUnit
```
"xUnit": "Please give the data unit of the bubble chart's X axis as a string!"
```
**Description**: Sets the unit shown at X axis and in the hover baloon.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "%"  

#### [theme]/bubbleSettings/yUnit
```
"yUnit": "Please give the data unit of the bubble chart's Y axis as a string!"
```
**Description**: Sets the unit shown at Y axis and in the hover baloon.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "%"  

#### [theme]/bubbleSettings/zUnit
```
"zUnit": "Please give the data unit of the bubble chart bubble size as a string!"
```
**Description**: Sets the unit shown in the hover baloon.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "persons"  

#### [theme]/bubbleSettings/xAxesMax
```
"xAxesMax" : "Please give the maximum axis value as a number!
```
**Description**: Sets the maximum value of X axis.  
**Type**: number (or empty string)  
**Valid values**: Any number and empty string ("")  
**Example value**: 100  
**Tips**: If you don't want to use maximum value, use empty string as value (""). In some cases the maximum value can be override by amChart logic. (For mor information check amChart JS documentation.)

#### [theme]/bubbleSettings/xAxesMin
```
"xAxesMin" : "Please give the minimum axis value as a number!"
```
**Description**: Sets the minimum value of X axis.  
**Type**: number (or empty string)  
**Valid values**: Any number and empty string ("")  
**Example value**: 0  
**Tips**: If you don't want to use minimum value, use empty string as value (""). In some cases the minimum value can be override by amChart logic. (For mor information check amChart JS documentation.)

#### [theme]/bubbleSettings/yAxesMax
```
"xAxesMax" : "Please give the maximum axis value as a number!
```
**Description**: Sets the maximum value of Y axis.  
**Type**: number (or empty string)  
**Valid values**: Any number and empty string ("")  
**Example value**: 100  
**Tips**: If you don't want to use maximum value, use empty string as value (""). In some cases the maximum value can be override by amChart logic. (For mor information check amChart JS documentation.)

#### [theme]/bubbleSettings/yAxesMin
```
"xAxesMin" : "Please give the minimum axis value as a number!"
```
**Description**: Sets the minimum value of Y axis.  
**Type**: number (or empty string)  
**Valid values**: Any number and empty string ("")  
**Example value**: 0  
**Tips**: If you don't want to use minimum value, use empty string as value (""). In some cases the minimum value can be override by amChart logic. (For mor information check amChart JS documentation.)

#### [theme]/bubbleSettings/fieldMap
```
"fieldMap" : {
    "field" : "alias",
    "field" : "alias",
    "field" : "alias"
}
```  
**Description**: Defines which fields of the data layer appear on the bubble chart. It takes exactly 3 fields. First one will be used as X coordinate, second as Y coordinate and third will determine the size of the bubble.  
**Type**: object  
**Valid values**: Any string as keys, any string as aliases  
**Example value**: {"m_there" : "Moving there","m_from" : "Moving from","pop" : "Population"}  
**Tips**: This is one of the very rare occasions when you have to change the key.

#### [theme]/tableSettings/title
```
"title" : "Please give the title of the table as a string!"
```
**Description**: Sets the title of the table.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Change of population"  

#### [theme]/tableSettings/heading
```
"title" : "Please give the heading of the table as a string!"
```
**Description**: Sets the heading of the table.  
**Type**: string  
**Valid values**: Any string  
**Example value**: "Type of change"  

#### [theme]/tableSettings/dataPrecision
```
"dataPrecision" : Please give a number!
```
**Description**: Sets the number of decimal places for rounding values. 
**Type**: number  
**Valid values**: 0 or greater integer  
**Example value**: 0  
**Tips**: 0 dataPrecision means integer numbers.

#### [theme]/tableSettings/sorting
```
"sorting" : "Please give the type of sorting as a string! (Valid values: 'asc', 'desc')"
```
**Description**: Sets the order of the time stops in the table.  
**Type**: string  
**Valid values**:  
- 'desc' for descending order  
- 'asc' for ascending order  
**Example value**: 'desc'  

#### [theme]/tableSettings/fieldMap
```
"fieldMap" : {
    "field" : "alias",
    "field" : "alias"
}
```  
**Description**: Defines which fields of the data layer appear in the. Each key-value pair will be a line in the table.  
**Type**: object  
**Valid values**: Any string as keys, any string as aliases  
**Example value**: {"birth" : "Number of births","death" : "Number of deaths","m_out" : "Number of people moved out", "m_in" : "Number of people moved in","change" : "Change of population (%)"}  
**Tips**: This is one of the very rare occasions when you have to change the key.
