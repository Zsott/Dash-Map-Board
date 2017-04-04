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
**Description**: Sets the width (in percents of the screen width) of the left panel which contains the map and optionally one chart. Also sets the width of the right panel: 100 - leftPanelWidthPercent.
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

#### [theme]/layout/...
` `
**Description**:
**Type**:
**Valid values**:
**Example value**:
**Tips**:
