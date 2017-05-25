//The common part of config.json: the key and the type of values (in all theme)
var configMainJson={
    "layout" : {
        "leftPanelWidthPercent" : "number",
        "mapHeightPercent" : "number",
        "upperRightChartHeightPercent" : "number",
        "legendOn" : "boolean",
        "logoImg" : "string",
        "title" : "string",
        "subTitle" : "string",
        "splashText" : "string",
        "infoBoxText" : "string",
        "clickOnWhat" : "string"
        },
	"basemap" : "string",
    "wkid" : "number",
    "xmin" : "number",
    "ymin" : "number",
    "xmax" : "number",
    "ymax" : "number",
    "timeStops" : "array",
    "dataServiceURL" : "string",
    "dataServiceLayerIndex" : "number",
    "dataServiceLayerPosition" : "number",
    "additionalLayerURLs" : "array",
    "areaNameField" : "string",
    "timeField" : "string",
    "chartPositions" : {
        "LL" : "string",
        "UR" : "string", 
        "LR" : "string" 
        }
};
				
//The keys and the type of values in serial chart settings (used in config validator)
var configSerialSettingsJson={
    "title" : "string",
    "colors" : "array",
    "dataPrecision" : "number",
    "dataUnit" : "string",
    "yAxesMax" : "string",
    "yAxesMin" : "string",
	"sorting"  : "string",	
    "fieldMap" : "object",
};

//The keys and the type of values in radar chart settings (used in config validator)
var configRadarSettingsJson={
    "title" : "string",
    "colors" : "array",
    "dataPrecision" : "number",
    "dataUnit" : "string",
    "xAxesMax" : "string",
    "xAxesMin" : "string",
    "fieldMap" : "object"
};
		
//The keys and the type of values in bubble chart settings (used in config validator)
var configBubbleSettingsJson={
    "title" : "string",
    "colors" : "array",
    "dataPrecision" : "number",
    "xUnit": "string",
    "yUnit": "string",
    "zUnit": "string",
    "xAxesMax": "string",
    "xAxesMin": "string",
    "yAxesMax": "string",		
    "yAxesMin": "string",
    "fieldMap" : "object"
};

//The keys and the type of values in table settings (used in config validator)
var configTableSettingsJson={
    "title" : "string",
    "heading" : "string",
	"sorting"  : "string",	
    "fieldMap" : "object"
};
		
//The keys and the type of values in serial chart settings (used in config validator)
var configPieSettingsJson={
    "title" : "string",
    "colors" : "array",
    "fieldMap" : "object"
};		

//Valid type of image extensions
var imgType=["png","jpg","tif","bmp","gif"];

var baseMapType=[
    "dark-gray",
    "dark-gray-vector",
    "gray",
    "gray-vector",
    "hybrid",
    "national-geographic",
    "oceans",
    "osm",
    "satellite",
    "streets",
    "streets-navigation-vector",
    "streets-night-vector",
    "streets-relief-vector",
    "streets-vector",
    "terrain",
    "topo",
    "topo-vector"
];
var sortType=["asc","desc"];

var c = {};

$.getJSON("config.json", function(data){

//=========================================================================	
//Start of config.json validator
//=========================================================================	

    var configError = false;
    var configErrorList = [];

	//Checking if themeOrder key exists
	if (!("themeOrder" in data)){
        alertMessage("The configuration is incorrect! The themeOrder key is missing!");
    }
	if(jQuery.isEmptyObject(data["themeOrder"])){
		alertMessage("The configuration is incorrect! Array of themeOrder is empty!");
	}
	
	//Checking if the settings of theme exist
    for(var t in data.themeOrder){
        for(var key in data.themeOrder[t]){
			if (!(key in data)){
				alertMessage("The configuration is incorrect! The theme of '" + key + "' is missing!");
			}
        }

    }
    
    // Check point in config validation
    // Validator won't continue until you correct the errors listed on the Error List
    if(configError){
        printErrors(configErrorList);
        exit();            
    }
	
	//Checking the settings of all theme
    for(var t in data.themeOrder){
        for(var key in data.themeOrder[t]){
			var chartArray = [];
			var theme = data[key];
			for(var ckey in configMainJson){
				//Checking the keys
				if (!(ckey in theme)){
					alertMessage("The configuration is incorrect! The " + ckey + " key in the theme of '" + key + "' is missing!");
				}
				//Checking the type of values
				if(jQuery.type(theme[ckey]) == "object"){
					for(var cikey in configMainJson[ckey]){
						//Checking keys	
						if (!(cikey in theme[ckey])){
							alertMessage("The configuration is incorrect! The " + ckey + "/" + cikey + " key in the theme of '" + key + "' is missing!");
						}
						//Checking type
						var keyArray = [key,ckey,cikey];
						typeChecking(keyArray,configMainJson[ckey][cikey],jQuery.type( theme[ckey][cikey]))
						//Checking number
						if(jQuery.type(theme[ckey][cikey]) == "number"){
							numberChecking(keyArray,theme[ckey][cikey])
						}
						//Checking array
						if(jQuery.type(theme[ckey][cikey]) == "array"){
							arrayChecking(keyArray,theme[ckey][cikey])
						}
						//Checking image
						if((cikey == "logoImg") && (theme[ckey][cikey] != "")){
							if(imgType.indexOf(theme[ckey][cikey].slice(-3)) == -1){
								alertMessage("The configuration is incorrect! The value of the " + ckey + "/" + cikey + " key in the theme of '" + key + "' is not valid. Only png, jpg, tif, gif and bmp allowed!")
							}
						}
						
						//Loading the diagram of the actual theme into chartArray
						if((ckey == "chartPositions") && (theme[ckey][cikey]!="")){
							chartArray.push(theme[ckey][cikey]);
						}
					}
				}
				else{
					var keyArray = [key,ckey];
					//Checking type
					typeChecking(keyArray,configMainJson[ckey],jQuery.type(theme[ckey]));
					//Checking number
					if(jQuery.type( theme[ckey]) == "number"){
						numberChecking(keyArray,theme[ckey])
					}
					//Checking array
					if(jQuery.type( theme[ckey]) == "array"){
						arrayChecking(keyArray,theme[ckey])
					}
					//Checking url
					if(ckey == "dataServiceURL"){
						urlChecking(keyArray,theme[ckey]);
					}
					//Checking type of basemap 
					if(ckey == "basemap"){
						if(baseMapType.indexOf(theme[ckey]) == -1){
							alertMessage("The configuration is incorrect! The value of the " + ckey + " key in the theme of '" + key + "' is not a valid basemap type.")
						}
					}
				}
			}

			//Choosing the type of actual diagram
			chartArray.forEach(function(chartType){				
				switch(chartType){
					case "ser":
						chartKey = "serialSettings";
						chartJson = configSerialSettingsJson;
						break;
					case "pie":
						chartKey = "pieSettings";
						chartJson = configPieSettingsJson;
						break;
					case "bub":
						chartKey = "bubbleSettings";
						chartJson = configBubbleSettingsJson;
						break;
					case "rad":
						chartKey = "radarSettings";
						chartJson = configRadarSettingsJson;
						break;
					case "tab":
						chartKey = "tableSettings";
						chartJson = configTableSettingsJson;
						break;
				    default:
                        chartKey = undefined;
                        chartJson = undefined;
						alertMessage("The configuration is incorrect! Invalid type of diagram (" + chartType + ") is in the theme of '" + key + "'! Valid set of values is ser, pie, bub, rad, tab!");
				}

				if(typeof chartKey != 'undefined'){
                    var chart = data[key][chartKey];

                    //Checking diagram settings
                    for(var ckey in chartJson){
                        var keyArray = [key, ckey];

                        //Checking keys					
                        if (!(ckey in chart)){
                            alertMessage("The configuration is incorrect!  The " + chartKey + "/" + ckey + " key in the theme of '" + key + "' is missing!");
                        }
                        //Checking type	
                        typeChecking(keyArray,chartJson[ckey],jQuery.type(chart[ckey]));
                        
                        //Checking color
                        if(ckey == "colors"){
                            colorChecking(keyArray,chart[ckey]);
                        }
                        //Checking sorting
                        if(ckey == "sorting"){
                            if(sortType.indexOf(chart[ckey]) == -1){
                                alertMessage("The configuration is incorrect! Invalid value of " + chartKey + "/" + ckey + " (" + chart[ckey] + ") is in the theme of '" + key + "'! Valid set of values is asc or desc!")
                            }
                        }
                        
                        //Checking fieldMap
                        if(ckey == "fieldMap"){
                            
                            if(Object.getOwnPropertyNames(chart[ckey]).length === 0){
                                alertMessage("The configuration is incorrect! The " + chartKey + "/" + ckey + " key in the theme of '" + key + "' is empty!");
                            }
                            for(var fmkey in chart[ckey]){
                                if (jQuery.type(chart[ckey][fmkey]) != "string"){
                                    alertMessage("The configuration is incorrect! The value of " + chartKey + "/" + ckey + "/" + fmkey + " in the theme of '" + key + "' has to be string!");
                                }
                            }
                        }
                    }                    
                }
			});			
        }
    }

	//Validating the type of configuration values
    function typeChecking(keyArray,type1,type2){
		if(type1 != type2){
			var keyString = keyArray[1];
			for (i = 2; i < keyArray.length; i++) {
				keyString += "/" + keyArray[i];
			}
			alertMessage("The configuration is incorrect! The type of the value of the " + keyString + " in the theme of '" + keyArray[0] + "' is incorrect, have " + type1 + " instead of " + type2 + "!");
		}
    }	

	//Validating of the arrays
    function arrayChecking(keyArray,dataArray){
		var keyString = keyArray[1];
		for (i = 2; i < keyArray.length; i++) {
			keyString += "/" + keyArray[i];
		}

		if(keyArray[keyArray.length-1] == "timeStops"){
			if(dataArray.length < 2){
				alertMessage("The configuration is incorrect! The value of " + keyString + " in the theme of '" + keyArray[0] + "' is incorrect! The timeStops array must contain at least two elements!");
			}
		}
		
		if(keyArray[keyArray.length-1] == "additionalLayerURLs"){
			dataArray.forEach(function(entry) {
				urlChecking(keyArray,entry);
			})
		}	
    }	

	//Validating of the numbers
    function numberChecking(keyArray, value){
		var keyString = keyArray[1];
		for (i = 2; i < keyArray.length; i++) {
			keyString += "/" + keyArray[i];
		}

		var lastKey=keyArray[keyArray.length-1];
				
		if((value < 0) && (lastKey!="xmin") && (lastKey!="ymin") && (lastKey!="xmax") && (lastKey!="ymax")){
			alertMessage("The configuration is incorrect! The value of " + keyString + " in the theme of '" + keyArray[0] + "' is incorrect! This value must not be negative!");
		}
		
		if((lastKey == "leftPanelWidthPercent" || lastKey == "mapHeightPercent" || lastKey == "upperRightChartHeightPercent" ) && (value > 100 || value < 0)){
			alertMessage("The configuration is incorrect! The value of " + keyString + " in the theme of '" + keyArray[0] + "' is incorrect! Valid set of values is 0 to 100!");			
		}		
    }	

	//Validating of the color values
    function colorChecking(keyArray, colorsArray){
	
		colorsArray.forEach(function(entry) {
			var isOk  = /^#[0-9A-F]{6}$/i.test(entry);

			var keyString=keyArray[1];
			for (i = 2; i < keyArray.length; i++) {
				keyString += "/" + keyArray[i];
			}
			if(!isOk){
				alertMessage("The configuration is incorrect! One of the " + keyString + " array value in the theme of '" + keyArray[0] + "' is incorrect! ");
			}
		});
    }	
	
	//Validating of urls
	function urlChecking(keyArray,url) {
		var isOk  = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i.test(url);
		var keyString=keyArray[1];
		for (i = 2; i < keyArray.length; i++) {
			keyString +="/"+keyArray[i];
		}
		if(!isOk){
			alertMessage("The configuration is incorrect! The value of "+keyString+" in the theme of '"+keyArray[0]+"' is incorrect! The url is invalid!");
		}
	}

	//Add the alert message to the error list
	function alertMessage(alertText){
        if(!configError){
            configError = true;
        }
        configErrorList.push(alertText);
	}
    
    //Put the error list on screen
    function printErrors(list){
        $("div").remove();
		var errorHtml = '<p class="configErrorList">ERROR LIST<br/>Please check and solve every single error on this list and try to launch the webapp again!</p>';
        list.forEach(function(err){
            errorHtml = errorHtml + '<p class="configErrorList">' + err + '</p>'
        });
        $("body").append(errorHtml);
        alert("Error in config.json! Please check and solve every single error on the Error List and try again!");        
    }
    
    if(configError){
        printErrors(configErrorList);
    }
//=========================================================================	
// End of config.json validator
//=========================================================================	

	//loading config.json
    for(var key in data){
        c[key] = data[key];
    }
    initWebApp();
});

function initWebApp(){
    require(
        [
            "esri/map",
            "esri/layers/ArcGISDynamicMapServiceLayer",
            "esri/geometry/Extent",
            "esri/SpatialReference",
            "esri/dijit/Legend",
            "esri/tasks/query",
            "esri/tasks/QueryTask",
            "esri/symbols/SimpleFillSymbol",
            "esri/symbols/SimpleLineSymbol",
            "esri/Color",
            "esri/dijit/TimeSlider",
            "esri/TimeExtent",
            
            "dojo/ready",
            "dojo/on"
        ],
        function(
            Map,
            ArcGISDynamicMapServiceLayer,
            Extent,
            SpatialReference,
            Legend,
            Query,
            QueryTask,
            SimpleFillSymbol,
            SimpleLineSymbol,
            Color,
            TimeSlider,
            TimeExtent,
            
            ready,
            on
        ){
        //Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function(){
            
            //Show data about creators of Dash-Map-Board project in the console
            console.log(c.creators);

            //Defining variables used globally
            var firstClick = true; //Checks if there was any click on the map or not
            var firstTheme = true; //Checks if the actual is the first theme or not
            var currYear; //The current position of the timeslider	
            var actTheme; //Tracking the actual theme. By default it is the first element of the themeOrder array from config.json
            var actFeatureSet = {}; //The featureset you get by clicking on the map
            var actYearFeature; //The feature from the featureSet which corresponds to the current year
            var actAreaName; //The name of the clicked element
            var terkep; //The map object
            var dataQuery; //The query object
            var timeSlider; //The conroller of the time-awareness
            var legend; //The legend object
            var isFirstLegend = true; //Checks if legend has been created for the first time
            
            //Creates the theme chooser dropdown menu and selects the first theme
            createThemeDropDown();
            
            //Sets up the theme according to the first theme's configuration
            initTheme();
            
            //Sets the header (logo, title, subtitle, infobox) and the splash screen
            function initHtml(){
                //Sets the source of the logo according to the layout's setup
                if(!actTheme.layout.logoImg == ""){
                    $(".logo").css({
                        "display" : "inline-block"
                    });
                    $(".logo").attr("src",actTheme.layout.logoImg);
                }
                //...or hides the logo if logoImg parameter is set to ""
                else{
                    $(".logo").css({
                        "display" : "none"
                    });                    
                }
                
                //Sets the title of the theme in the header
                if(!actTheme.layout.title == ""){
                    $("#title").css({
                        "display" : "inline-block"
                    });
                    $("#title").html(actTheme.layout.title);
                }
                //... or hides the title if the title parameter is set to ""
                else{
                    $("#title").css({
                        "display" : "none"
                    });
                }
                
                //Sets the subtitle of the theme in the header
                if(!actTheme.layout.subTitle == ""){
                    $("#subTitle").css({
                        "display" : "inline-block"
                    });                    
                    $("#subTitle").html(actTheme.layout.subTitle);
                }
                //... or hides the subtitle if the subtitle parameter is set to ""
                else{
                    $("#subTitle").css({
                        "display" : "none"
                    });                    
                }
                
                //Controls if splash should appear and if so sets its content
                if(actTheme.layout.splashText == ""){
                    $("#splash").addClass("hiddenElement");
                }
                else{
                    $("#splash").removeClass("hiddenElement");
                    var splashText = actTheme.layout.splashText;
                    splashText = '<p class="splashText">' + splashText + '</p>';
                    splashText = splashText + '<button class="splashButton" onclick="hideSplash()">OK</button>';
                    $("#splash").html(splashText);
                }
                
                //Controls if infoBox should appear and if so sets its content
                if(actTheme.layout.infoBoxText == ""){
                    $("#infoBox").addClass("hiddenElement");
                    $("#infoIcon").addClass("hiddenElement");
                }
                else{
                    $("#infoBox").removeClass("hiddenElement");
                    $("#infoIcon").removeClass("hiddenElement");
                    var infoText = actTheme.layout.infoBoxText;
                    infoText = '<p class="infoBoxText">' + infoText + '</p>';
                    infoText = infoText + '<button class="infoBoxButton" onclick="controlInfoBox()">OK</button>';
                    $("#infoBox").html(infoText);
                }
            }         

            // Puts the colophon (created by) text in the colophon div.
            // !!!!!!!!!!!!!!!
            // Please do not remove the colophon text!
            // Make a respectful gesture with it towards those who made your job easier.
            // Thank you!
            // !!!!!!!!!!!!!!!
            function initColophon(){
                var colophonText = '<p class="colophonText"><strong>Az alkalmazás a <a href="https://github.com/Zsott/Dash-Map-Board" class="colophonLink" target="blank">Dash-Map-Board</a> keretrendszer segítségével készült.</strong></p><p></p><p class="colophonText">A Dash-Map-Board keretrendszert Lellei László és Ónodi Zsolt készítették, <a href="https://developers.arcgis.com/javascript/" class="colophonLink" target="blank">ArcGIS API for JS</a> és <a href="http://www.amcharts.com/javascript-charts/" class="colophonLink" target="blank">amCharts JS Charts</a> felhasználásával.</p><hr><hr><p class="colophonText"><strong>This application was created with <a href="https://github.com/Zsott/Dash-Map-Board" class="colophonLink" target="blank">Dash-Map-Board</a>.</strong></p><p></p><p class="colophonText">The Dash-Map-Board project was created by László Lellei and Zsolt Ónodi, using <a href="https://developers.arcgis.com/javascript/" class="colophonLink" target="blank">ArcGIS API for JS</a> and <a href="http://www.amcharts.com/javascript-charts/" class="colophonLink" target="blank">amCharts JS Charts</a>.</p><button class="colophonButton" onclick="controlColophonBox()">OK</button>';
                $("#colophon").html(colophonText);
            }
            
            function initTheme(){
                //Set the header and splash screen
                initHtml();
                
                //Set the colophon
                initColophon();
            
                //Define spatial reference system
                var spRef = new SpatialReference({
                    wkid : actTheme.wkid
                });
                
                //Set the initial extent with the defined spatial reference system
                var extHun = new Extent({
                    "xmin" : actTheme.xmin,
                    "ymin" : actTheme.ymin,
                    "xmax" : actTheme.xmax,
                    "ymax" : actTheme.ymax,
                    "spatialReference" : spRef
                });
                
                //Create map object
                terkep = new Map("map", {
                    spatialReference: spRef,
                    basemap: actTheme.basemap,
                    extent : extHun,
                    logo : false, // @@@ config
                    showAttribution : false // @@@ config
                });
                
                //Resizing and repositioning map when changing theme
                if(!firstTheme){
                    terkep.width = $("#map").outerWidth();
                    terkep.height = $("#map").outerHeight();
                }
                
                //Adding the data layer to the correct position in the array of layers
                var layerUrl = actTheme["additionalLayerURLs"];
                layerUrl.splice(actTheme.dataServiceLayerPosition, 0, actTheme.dataServiceURL);
                
                //Add layers to map
                layerUrl.forEach(function(entry) {
                    terkep.addLayer(new ArcGISDynamicMapServiceLayer(entry));
                });
                
                //Add or hide legend (icon) depending on the config.json setup
                if(actTheme.layout.legendOn && isFirstLegend){
                    isFirstLegend = false;
                    $("#legendIcon").css({
                       "display" : "block"
                    });
                    legend = new Legend({
                        map: terkep,
                        autoUpdate: true, // @@@ config
                        layerInfos : [{
                            layer : terkep.getLayer(terkep.layerIds[actTheme.dataServiceLayerPosition + 1])
                        }]
                    },"legend");
                    legend.startup();
                }
                else if(actTheme.layout.legendOn){
                    legend.layerInfos = [{
                            layer : terkep.getLayer(terkep.layerIds[actTheme.dataServiceLayerPosition + 1])
                        }];
                    legend.refresh();                       
                }
                else{
                    $("#legendIcon").css({
                       "display" : "none"
                    });
                }

                //Defining query - this will be used when clicking on the map
                // => What you want to find?
                dataQuery = new esri.tasks.Query();
                dataQuery.returnGeometry = true;
                dataQuery.outFields = ["*"];

                //Defining the query task - this uses the query defined earlier
                // => Where you want to find it?
                dataQueryTask = new QueryTask(actTheme["dataServiceURL"] + "/" + actTheme.dataServiceLayerIndex);

                //Setting the initial hint string next to the dropdown menu
                $("#placeYear").html(actTheme.layout.clickOnWhat);
                
                //Starting the timeslider
                initTimeSlider();
                
                //Activate pointer events if there's no splash screen
                if(actTheme.layout.splashText == ""){
                    hideSplash();
                }                
                     
                //Defining the click event on the map
                terkep.on("click", initDashBoard);
            }
            
            //This function starts when user clicks on the map
            function initDashBoard(evt){


                //Gets the geometry on which the user clicked and gives it to the query as a parameter
                dataQuery.geometry = evt.mapPoint;
                //Runs the query using the geometry on which the user clicked and creates the dashboard
                dataQueryTask.execute(dataQuery, createDashBoard);
            }

            //This function starts after the user clicked and query finished
            //Initializes or refeshes the dashboard
            function createDashBoard(featureSet){

				//Runs only if the click/query has any results
                // => Won't start if user clicks outside the thematic map boundary or clicks between features
                if (featureSet.features.length > 0){
                    //Temporarily assigns a class to the left panel that makes it disappear
                    $("#leftPanel").addClass("fadeOut");
                    
                    //Assigns the query result to a global variable so we can use it in other functions as well
                    actFeatureSet = featureSet;
                    
                    //If this was the first click switches to dashboard layout
                    if (firstClick){
                        firstClick = false;
                        setLayout();
                    }
                    
                    //Puts the clicked geometry on the map
                    selectFeature(actFeatureSet.features[0]);
                    
                    //Gets the features of the current year
                    searchCurrentYear(actFeatureSet);
                    
                    //Replaces the hint text with the current feature's name and the current year
                    $("#placeYear").html(actAreaName+ " - " + currYear);

                    //Decides which charts will be needed in the dashboard
                    chooseChart(0);
                }			
            }

            //This function creates the theme chooser dropdown menu and sets the first theme
            function createThemeDropDown(){
                for(var t in c.themeOrder){
                    for(var key in c.themeOrder[t]){
                        if(t == 0){
                            actTheme = c[key];
                            $(".dropDownButton").html(c.themeOrder[t][key])
                        }
                        if(c.themeOrder.length == 1){
                            $(".dropDownButton").css({
                                "background-color": "#292929"
                            });
                        }
                        else{                           
                            $("#dropDownContent").append('<a id="' + key + '" href="#">' + c.themeOrder[t][key] + '</a>');
                        }
                    }
                }
                //Assigns a click event to the items in the dropdown menu
                $("#dropDownContent a").click(function(){
                    //Change the actual theme to the clicked theme
                    changeTheme($(this).attr("id"));
                });
            }
            
            //This function changes the actual theme and resets the webapp's layout
            function changeTheme(elem){
                for(var t in c.themeOrder){
                    for(var key in c.themeOrder[t]){
                        if(key == elem){
                            firstTheme = false;
                            terkep.destroy();
                            actTheme = c[elem];
                            $(".dropDownButton").html(c.themeOrder[t][elem]);
                            if(firstClick){
                                initTheme();
                            }
                            else{
                                firstClick = true;
                                terkep.graphics.clear();
                                initLayout();
                                initTheme();
                            }
                        }
                    }
                }
            }
            
            //This function resets the webapp's layout to the original "big map" style
            function initLayout(){
                $("#ser, #pie, #rad, #bub, #tab, #rightPanel").remove();
                $("#leftPanel").css({
                    "height" : "calc(100% - 136px)",
                    "width" : "calc(100% - 16px)",
                    "margin" : "4px 4px 8px 8px"
                });
                $("#map").css({
                    "height" : "calc(100% - 2px)"
                });
            }
            
            //This function changes from the "big map" layout to the dashboard layout
            //Uses a the config.json [theme]/layout parameters like leftPanelWidthPercent
            function setLayout(){				
                //Sets the left-right panel width
                if(actTheme.layout.leftPanelWidthPercent == 0){
                    //Makes the left panel disappear
                    $("#leftPanel").css({
                        "display" : "none"
                    });
                    //Creates the right panel and sets it to full width
                    $("body").append('<div id="rightPanel" class="fadeOut"></div>');
                    $("#rightPanel").css({			
                        "width" : "calc(100% - 16px)",
                        "margin-left" : "8px"
                    });		
                }
                else if(actTheme.layout.leftPanelWidthPercent == 100){
                    //Resizes the left panel to full width
                    $("#leftPanel").css({
                        "width" : "calc(100% - 16px)"
                    });
                }
                else{
                    //Resizes the left panel
                    $("#leftPanel").css({
                        "width" : "calc(" + actTheme.layout.leftPanelWidthPercent + "% - 12px)",
                        "margin" : "4px 4px 8px 8px"
                    });
                    //Creates the right panel and resizes it to the correct width
                    $("body").append('<div id="rightPanel" class="fadeOut"></div>');
                    var w = 100 - actTheme.layout.leftPanelWidthPercent;
                    $("#rightPanel").css({			
                        "width" : "calc(" + w + "% - 12px)"
                    });
                }	

				
                //Sets the vertical splitting of the left panel
                if($("#leftPanel").css("display") != "none"){
                    if(actTheme.layout.mapHeightPercent == 0){
                        //Make the map panel disappear
                        $("#map").css({
                            "display" : "none"
                        });
                        //Creates the lower left panel and resizes it to full height
                        $("#leftPanel").append('<div id="' + actTheme.chartPositions.LL + '" class="roundedBox panels"></div>');
                        $("#" + actTheme.chartPositions.LL).css({
                            "height" : "calc(100% - 2px)"
                        });
                    }
                    else if(actTheme.layout.mapHeightPercent == 100){
                        //Resizes the map to full height						
                        $("#map").css({
                            "height" : "calc(100% - 2px)"
                        });
                    }
                    else{
                        //Resizes the map
                        $("#map").css({
                            "height" : "calc(" + actTheme.layout.mapHeightPercent + "% - 6px)",
                            "margin-bottom" : "4px"
                        });
                        //Creates the lower left panel and resizes it to the correct height
                        $("#leftPanel").append('<div id="' + actTheme.chartPositions.LL + '" class="roundedBox panels"></div>');
                        var h = 100 - actTheme.layout.mapHeightPercent;
                        $("#" + actTheme.chartPositions.LL).css({
                            "height" : "calc(" + h + "% - 6px)",
                            "margin-top" : "4px"
                        });
                    }
                }

                //Sets the vertical splitting of the right panel
                if($("#rightPanel").css("display") != "none"){
                    if(actTheme.layout.upperRightChartHeightPercent == 0){
                        //Creates the lower right panel and resizes it to full height
                        $("#rightPanel").append('<div id="' + actTheme.chartPositions.LR + '" class="roundedBox panels"></div>');
                        $("#" + actTheme.chartPositions.LR).css({
                            "height" : "calc(100% - 2px)"
                        });
                    }
                    else if(actTheme.layout.upperRightChartHeightPercent == 100){
                        //Creates the upper right panel and resizes it to full height
                        $("#rightPanel").append('<div id="' + actTheme.chartPositions.UR + '" class="roundedBox panels"></div>');
                        $("#" + actTheme.chartPositions.UR).css({
                            "height" : "calc(100% - 2px)"
                        });
                    }
                    else{
                        //Creates the upper right panel and resizes it to the correct height
                        $("#rightPanel").append('<div id="' + actTheme.chartPositions.UR + '" class="roundedBox panels"></div>');			
                        $("#" + actTheme.chartPositions.UR).css({
                            "height" : "calc(" + actTheme.layout.upperRightChartHeightPercent + "% - 6px)",
                            "margin-bottom" : "4px"
                        });
                        //Creates the lower right panel and resizes it to the correct height
                        $("#rightPanel").append('<div id="' + actTheme.chartPositions.LR + '" class="roundedBox panels"></div>');
                        var h = 100 - actTheme.layout.upperRightChartHeightPercent;
                        $("#" + actTheme.chartPositions.LR).css({
                            "height" : "calc(" + h + "% - 6px)",
                            "margin-top" : "4px",
                            "display" : "inline-block"
                        });
                    }
                }

                //Resizes the map object according to the map div
                terkep.width = $("#map").outerWidth();
                terkep.height = $("#map").outerHeight();
         
                //Zoom and change extent of the map to show the selected geometry in the center
                terkep.centerAndZoom(dataQuery.geometry,terkep.getLevel());
            }
            
            //This function decides which chart types will be used and creates those charts
            function chooseChart(timeSliderChange){	
                //Checks which chart types are assigned to the different positions
                for (var keyTitle in actTheme["chartPositions"]) {
                    if(actTheme["chartPositions"][keyTitle] == "pie"){
                        createPieDP();
                    }					
                    else if(actTheme["chartPositions"][keyTitle] == "ser" && !timeSliderChange){
                        createSerDP();
                    }
                    else if(actTheme["chartPositions"][keyTitle] == "tab"){
                        createTabDP();
                    }
                    else if(actTheme["chartPositions"][keyTitle] == "bub"){
                        var keys = Object.keys(actYearFeature);
                        if(keys.length == 0){
                            //Creates an empty chart if there's no data
                            createBubbleChart([]);						
                        }
                        else{
                            //Gets the data of the neighbours of the selected geometry for the bubble chart
                            var neighQuery = new esri.tasks.Query();
                            neighQuery.geometry = actYearFeature.geometry;
                            neighQuery.returnGeometry = true;
                            outFields = ["*"];
                            neighQuery.outFields = outFields;
                            neighQuery.spatialRelationship = esri.tasks.Query.SPATIAL_REL_TOUCHES;
                            var selNeighbour = new QueryTask(actTheme.dataServiceURL + "/" + actTheme.dataServiceLayerIndex); 
                            selNeighbour.execute(neighQuery, createBubDP);
                        }
                    }
                    else if(actTheme["chartPositions"][keyTitle] == "rad"){
                        createRadDP(actFeatureSet);
                    }
                }
                //Removes the class that made the left and right panel disappear so they will slowly reappear
                $("#leftPanel, #rightPanel").addClass("fadeIn");
                $("#leftPanel, #rightPanel").removeClass("fadeOut");
            }		
            
            //This function selects the feature for the actual timestop
            function searchCurrentYear(featureSet){
                actYearFeature = {};
                actAreaName = "";
                featureSet.features.forEach(function(entry){
                    actAreaName = entry.attributes[actTheme["areaNameField"]];
                    if(entry.attributes[actTheme["timeField"]] == currYear){
                        actYearFeature = entry;
                    }
                });
            }
            
            //Shows the clicked feature on the map
            function selectFeature(graphic){
                //Removes any graphic (former selections)
                terkep.graphics.clear();
               
                //Sets the symbology of the selected geometry
                // @@@ config
                var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                             new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                             new Color([248, 239, 34]), 2), new Color([200, 200, 200, 0.25]));
                graphic.setSymbol(symbol);
                
                //Add the geometry with the new symbology to the map
                terkep.graphics.add(graphic);
            }

            //Prepares data for pie chart
            function createPieDP(){
                var pieDP = [];				
                for (var key in actYearFeature.attributes){
                    json = {};
                    for (var keyTitle in actTheme["pieSettings"].fieldMap) {
                        if(key == keyTitle){
                            json["title"] = actTheme["pieSettings"].fieldMap[keyTitle];
                            json["value"] = actYearFeature.attributes[key];
                            pieDP.push(json);
                        }
                    }
                }
                createPieChart(pieDP);
            }		
            
            //Prepares data for serial chart
            function createSerDP(){
                var serDP = [];		
                var json;
                actFeatureSet.features.forEach(function(entry){
                    if(actTheme["timeStops"].indexOf(entry.attributes[actTheme["timeField"]].toString()) != -1){
                        json = {};
                        json["year"] = entry.attributes[actTheme["timeField"]];
                        for (var key in entry.attributes){
                            for (var keyTitle in actTheme["serialSettings"].fieldMap){
                                if(key == keyTitle){
                                    json[keyTitle] = entry.attributes[key];
                                }
                            }
                        }
                        serDP.push(json);
                    }
                });
                //Reorder prepared dataset by time
                var serOrderedDP = orderArrayByAttribute(serDP,"year",actTheme.serialSettings.sorting);               
                createSerialChart(serOrderedDP);
            }

            //Prepares data for table
            function createTabDP(){
                var tabDP = [];		
                var json;
                actFeatureSet.features.forEach(function(entry) {
                    json = {};
                    json["year"] = entry.attributes[actTheme["timeField"]];

                    for (var key in entry.attributes){
                        for (var keyTitle in actTheme["tableSettings"].fieldMap) {
                            if(key == keyTitle){
                                json[keyTitle] = entry.attributes[key];
                            }
                        }
                    }
                    tabDP.push(json);				
                });

                //Reorder prepared dataset by time
                var tabOrderedDP = orderArrayByAttribute(tabDP, "year", actTheme.tableSettings.sorting);
                createTable(tabOrderedDP);
            }

            //Prepare data for bubble chart
            function createBubDP(featureSet){
                var bubDP = [];
				//Filter the actual timestop data
                if(actYearFeature.attributes[actTheme["timeField"]] == currYear){
					//Add actual place data
                    bubDP.push(actYearFeature.attributes);
                    bubDP[0]["color"] = actTheme.bubbleSettings.colors[0];			
                }
            
				//Filter the actual timestop data
                featureSet.features.forEach(function(entry) {
					//Add neighbour place date
                    if(entry.attributes[actTheme["timeField"]] == currYear){
                        bubDP.push(entry.attributes);
                    }
                });
                var keys = [];
                for(var k in actTheme.bubbleSettings.fieldMap) keys.push(k);
				
                //The fieldmap order is important! FieldMap[0]: x, [1]:y, [2]:z (axis)
                //Order the data (based on z value) 
                var bubOrderedDP = orderArrayByAttribute(bubDP,keys[2],"desc");
                createBubbleChart(bubOrderedDP);
            }
                        
						
            //Order the data ascending(asc) or descending(desc).
            function orderArrayByAttribute(arr,att,order){
                var newArr = [];
                for (i = 0;i < arr.length;i++){
                    var item = arr[i][att];
                    var index = newArr.length;
                    for (j=0;j < newArr.length;j++){
                        if(order == "desc"){
                            if(item > newArr[j][att]){
                                index = j;
                                break;
                            }
                        }
                        if(order == "asc"){
                            if(item < newArr[j][att]){
                                index = j;
                                break;
                            }
                        }
                    }
                    newArr.splice(index,0,arr[i]);
                }
                return newArr;
            }        
          
            //Prepare data for bubble chart            
			function createRadDP(dp){
                var radDP = [];				
                for (var key in actYearFeature.attributes){
                    json = {};
                    for (var keyTitle in actTheme.radarSettings.fieldMap) {
                        if(key == keyTitle){
                            json["title"] = actTheme.radarSettings.fieldMap[keyTitle];
                            json["value"] = actYearFeature.attributes[key];
							if(actYearFeature.attributes[key]!=null){
								radDP.push(json);
							}	
                        }
                    }
                }
                createRadarChart(radDP);
            }
            
            //Initialize time slider
            function initTimeSlider(){

                if(firstTheme){
                    timeSlider = new TimeSlider({},"timeSlider");
                    firstTheme=false;
                }
				//Add timeslider to map
                terkep.setTimeSlider(timeSlider);
				//Create time extent change event
                timeSlider.on("time-extent-change",extentChanged);
                
				//Load timeStop array from config.json
                var timeStops=[];
                actTheme["timeStops"].forEach(function(entry) {
                    timeStops.push(new Date(entry));
                });
				//Timeslider settings
                timeSlider.setThumbCount(1);
                timeSlider.setThumbIndexes([0]);
                timeSlider.setThumbMovingRate(actTheme["timeSliderMovingRate"]);				
                timeSlider.setTimeStops(timeStops);
                timeSlider.singleThumbAsTimeInstant(true);
                timeSlider.setLabels(actTheme["timeStops"]);
                timeSlider.setLoop(true);
                timeSlider.startup();
            }
            
            //Timeslider change event
            function extentChanged(evt){
				
                currYear = timeSlider.getCurrentTimeExtent().startTime.getFullYear();
                if(!firstClick){
                    searchCurrentYear(actFeatureSet);
                    chooseChart(1);
                    $("#placeYear").html(actAreaName + " - " + currYear);
                    colorTable();
                }
            }		
            
            //Create pie chart
            // @@@ config
            function createPieChart(dp){
                var pieChart = AmCharts.makeChart("pie",{
                    "type": "pie",
                    "theme": "light",
                    "titles": [{
                       "text": actTheme.pieSettings.title,
                       "size": 14,
                       "bold": true
                    }],
                    "dataProvider" : dp,
                    "numberFormatter" : {
                        "precision" : 1,
                        "decimalSeparator": ",",
                        "thousandsSeparator": " "
                    },
                    "colors": actTheme.pieSettings.colors,
                    "balloonText" : "[[title]]: [[percents]]%",
                    "fontSize": 14,
                    "valueField": "value",
                    "titleField": "title",
                    "labelRadius": -40,
                    "labelText": "",
                    "balloon":{"fixedPosition":true},
                    "export": {"enabled": false},
                    "autoMargins": false,
                    "marginTop": 10,
                    "marginBottom": 10,
                    "marginLeft": 10,
                    "marginRight": 10,
                    "pullOutRadius": 10,
                    "legend":{
                        "align": "center",
                        "fontSize": 11,
                        "labelText": "[[title]]",
                        "markerSize": 14,
                        "valueText": ""
                    }
                });
            }
            
            //Create serial chart
            // @@@ config
            function createSerialChart(dp){
                var graphs=[];
                var json;
                for (var keyTitle in actTheme["serialSettings"].fieldMap) {
                    json = {}
                    json["title"] = actTheme["serialSettings"].fieldMap[keyTitle];
                    json["balloonText"] = "<b>[[title]]: [[value]] " + actTheme["serialSettings"].dataUnit + "</b>";
                    json["fillAlphas"] = 0.9;
                    json["lineAlpha"] = 1;
                    json["type"] = "column";
                    json["valueField"] = keyTitle;
                    graphs.push(json);
                }

                var serialChart = AmCharts.makeChart("ser", {
                    "type": "serial",
                    "theme": "light",
                    "marginRight": 20,
                    "titles": [{
                       "text":actTheme["serialSettings"].title ,
                       "size": 14,
                       "bold": true
                    }],
                    "dataProvider": dp,
                    "numberFormatter": {
                        "precision": actTheme["serialSettings"].dataPrecision,
                        "decimalSeparator": ",",
                        "thousandsSeparator": " "
                    },
                    "legend":{
                        "align": "center",
                        "fontSize": 12,
                        "labelText": "[[title]]",
                        "markerSize": 20,
                        "valueText": ""
                    },
                    "mouseWheelZoomEnabled": true,
                    "mouseWheelScrollEnabled ": true,
                    "colors":actTheme["serialSettings"].colors,
                    "valueAxes": [{
                        "position": "left",
                        "title": actTheme["serialSettings"].dataUnit,
                        "stackType": "regular"
                    }],
                    "startDuration": 1,
                    "chartCursor": {
                        "categoryBalloonEnabled": false,
                        "cursorColor": "#DD0000",
                        "cursorAlpha": 0.8,
                        "zoomable": true
                    },
                    "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
                    "chartScrollbar": {
                        "updateOnReleaseOnly": true,
                        "autoGridCount": true,
                        "color": "#1E5776"
                    },
                    "zoomOutText": "Mind",
                    "categoryField": "year",
                    "categoryAxis": {
                        "gridPosition": "start",
                        "labelRotation": 0
                    },
                    "export": {"enabled": true}
                });
            
                //Set axes max and min value from config.json
                if ($.isNumeric(actTheme["serialSettings"].yAxesMax)){
                    serialChart.valueAxes[0].maximum=actTheme["serialSettings"].yAxesMax;
                }
                if ($.isNumeric(actTheme["serialSettings"].yAxesMin)){
                    serialChart.valueAxes[0].minimum=actTheme["serialSettings"].yAxesMin;
                }
                //Add graph to chart
                for (i = 0; i < graphs.length; i++) {
                    serialChart.addGraph(graphs[i]);			
                }
            }

            //Create HTML table in #tab div
            // @@@ config
            function createTable(dp){
                $("#tab").append('<div id="tableTitle"></div>');
                $("#tab").append('<div id="tableContent"></div>');
                var htmlString = '<table>';
				//Header
                htmlString = htmlString + '<tr class="tableHeading"><td>' + actTheme.tableSettings.heading + '</td>';
				for (var i = 0; i < dp.length; i++) {
					//Only for those years that are in timeStop array
					if(actTheme.timeStops.indexOf(dp[i]["year"].toString())!=-1){
						htmlString = htmlString + '<td class="' + dp[i]["year"] + '">' + dp[i]["year"] + '</td>';					
					}
				}
				//Rows
                htmlString = htmlString + '</tr>';
                for (var keyTitle in actTheme.tableSettings.fieldMap){
                    htmlString = htmlString + '<tr><td class="tableRowId">' + actTheme.tableSettings.fieldMap[keyTitle] + '</td>';
                    for (var i = 0; i < dp.length; i++) {
						//Only for those years that are in timeStop array
						if(actTheme.timeStops.indexOf(dp[i]["year"].toString())!=-1){
							var cValue = checkRounding(dp[i][keyTitle],actTheme.tableSettings.dataPrecision);
							htmlString = htmlString + '<td class="' + dp[i]["year"] + '">' + cValue + '</td>';
							if(i == dp.length - 1){
								htmlString = htmlString + '</tr>';
							}
						}
                    }
                }
                htmlString = htmlString + '</table>';
                $("#tableContent").html(htmlString);
                $("#tableTitle").html(actTheme.tableSettings.title);
                colorTable();
            }    

			//Change color in actual timestop
            // @@@ config
            function colorTable(){
                $(".actualYearColumn").removeClass("actualYearColumn");
                $("." + currYear).addClass("actualYearColumn");
            }
            
            //Rounding function for table creation
            function checkRounding(value, prec){
				if(value == null){
					//@@@ config no data text
					return("n.d.")
				}					
                var rValue = value.toFixed(prec).split(".");
                if(rValue[0] == 0 && rValue[1] == 0){
                    return 0;
                }
                else if(rValue[1] == 0){
                    return value;
                }
                else{
                    return value.toFixed(prec).replace(".",",");
                }
            }
            
            //Create bubble chart
            // @@@ config
            function createBubbleChart(dp){
                var xField, yField, zField, xTitle, yTitle;
                var xField = actTheme.bubbleSettings.fieldMap;
                var x = 1;
                var keys = [];
                
                for(var k in actTheme.bubbleSettings.fieldMap) keys.push(k);
                //Field order is important!
                xField = keys[0];
                xTitle = actTheme.bubbleSettings.fieldMap[keys[0]];
                yField = keys[1];
                yTitle = actTheme.bubbleSettings.fieldMap[keys[1]];
                zField = keys[2];
                zTitle = actTheme.bubbleSettings.fieldMap[keys[2]];

                var bubbleChart = AmCharts.makeChart( "bub", {
                    "type": "xy",
                    "theme": "light",
                    "titles": [{
                       "text": actTheme.bubbleSettings.title,
                       "size": 14,
                       "bold": true
                    }],
                    "balloon":{"fixedPosition": true},
                    "dataProvider": dp,
                    "numberFormatter": {
                        "precision": actTheme.bubbleSettings.dataPrecision,
                        "decimalSeparator": ",",
                        "thousandsSeparator": " "
                    },
                    "colors":[actTheme.bubbleSettings.colors[1]],
                    "zoomOutText": "Mind",
                    "valueAxes": [{
                        "title": xTitle + "(" + actTheme.bubbleSettings.xUnit + ")",
                        "position": "bottom",
                        "axisAlpha": 0,
                        "fontSize": 12
                    },{
                        "title": yTitle + "(" + actTheme.bubbleSettings.yUnit + ")",
                        "minMaxMultiplier": 1.2,
                        "axisAlpha": 0,
                        "position": "left",
                        "fontSize": 12
                    }],
                    "startDuration": 1.5,
                    "legend":{
                        "align": "center",
                        "fontSize": 12,
                        "data": [{
                            "title": actAreaName,
                            "color": actTheme.bubbleSettings.colors[0],
                            "fillAlphas": 0.65
                            },
                            {
                            "title": actAreaName + " szomszédai",
                            "color": actTheme.bubbleSettings.colors[1],
                            "fillAlpha": 0.65
                        }],
                        "markerSize": 20,
                        "valueText": "",
                        "autoMargins": false,
                        "marginRight": 20,
                        "marginBottom": 8
                    },
                    "marginLeft": 46,
                    "marginBottom": 35,
                    "chartScrollbar": {
                        "updateOnReleaseOnly": true,
                        "color": "#1E5776",
                        "offset": 10,
                        "scrollbarHeight": 8,
                        "dragIconWidth": 25
                    },
                    "chartCursor": {
                        "categoryBalloonEnabled": false,
                        "cursorColor": "#DD0000",
                        "cursorAlpha": 0.8,
                        "zoomable": true
                    },               
                    "export": {"enabled": false}
                });                        
                //Set axes max and min value from config.json
				//X axes
                if ($.isNumeric(actTheme.bubbleSettings.xAxesMax)){
                    bubbleChart.valueAxes[0].maximum = actTheme.bubbleSettings.xAxesMax;
                }
                if ($.isNumeric(actTheme.bubbleSettings.xAxesMin)){
                    bubbleChart.valueAxes[0].minimum = actTheme.bubbleSettings.xAxesMin;
                }
                //Set axes max and min value from config.json
				//Y axes
                if ($.isNumeric(actTheme.bubbleSettings.yAxesMax)){
                    bubbleChart.valueAxes[1].maximum = actTheme.bubbleSettings.yAxesMax;
                }
                if ($.isNumeric(actTheme.bubbleSettings.yAxesMin)){
                    bubbleChart.valueAxes[1].mimimum = actTheme.bubbleSettings.yAxesMin;
                }

                //Create graph
                var graphs= [{
                        "balloonText": "<b>[[description]]</b><br>" + xTitle + ": <b>[[x]] " + actTheme.bubbleSettings.xUnit + "</b><br>" + yTitle + ": <b>[[y]] " + actTheme.bubbleSettings.yUnit + "</b><br>" + zTitle + ": <b>[[value]] " + actTheme.bubbleSettings.zUnit + "</b>",
                        "bullet": "circle",
                        "bulletBorderAlpha": 0.2,
                        "bulletAlpha": 0.65,
                        "lineAlpha": 0,
                        "fillAlphas": 0,
                        "valueField": zField,
                        "xField": xField,
                        "yField": yField,
                        "colorField": "color",
                        "descriptionField": actTheme.areaNameField,
                        "maxBulletSize": 100,
                        "fontSize": 12
                    }];
				//Add graph
                bubbleChart.addGraph(graphs[0]);
            }
            
			//Create radar chart
            function createRadarChart(dp){
                var radarChart = AmCharts.makeChart( "rad", {
                    "type": "radar",
                    "theme": "light",
                    "titles": [{
                       "text": actTheme.radarSettings.title,
                       "size": 14,
                       "bold": true
                    }],
                    "numberFormatter": {
                        "precision": actTheme.radarSettings.dataPrecision,
                        "decimalSeparator": ",",
                        "thousandsSeparator": " "
                    },
                    "colors": actTheme.radarSettings.colors,					
                    "dataProvider": dp,
                    "startDuration": 1,
                    "categoryField": "title",
                    "export": {"enabled": false}
                });
                //Set axes max and min value from config.json
                if ($.isNumeric(actTheme.radarSettings.xAxesMax)){
                    radarChart.valueAxes[0].maximum = actTheme.radarSettings.xAxesMax;
                }
                if ($.isNumeric(actTheme.radarSettings.xAxesMin)){
                    radarChart.valueAxes[0].minimum = actTheme.radarSettings.xAxesMin;
                }
                var graphs=[{
                        "balloonText": "[[title]]: [[value]]" + actTheme.radarSettings.dataUnit,
                        "bullet": "round",
                        "lineThickness": 2,
                        "valueField": "value",
                        "bullet": "round",
						
                }];
                radarChart.addGraph(graphs[0]);			
            }
        });
    });
}

//Click on legend icon event
function controlLegend(){
    var state = $("#legend").css("display");
    if (state == "block"){        
        $("#legend").css("display","none");
		$("#legendIcon").css("display","block");
    }
    else{        
        $("#legend").css("display","block");
		$("#legendIcon").css("display","none");
    }            
}

//Hide splash window
function hideSplash(){
	$("#splash").css("display","none");
	$("#heading, #leftPanel, #rightPanel, #timeSlider, #legend, #colophonIcon, #infoIcon, #theme").css({
        "pointer-events" : "auto"
    });
}

//The function that shows and hides infowindow
function controlInfoBox(){
    if ($("#infoBox").css("display") == "block"){
		$("#infoBox").css("display","none");
		$("#heading, #leftPanel, #rightPanel, #timeSlider, #legend, #colophonIcon, #theme").css({
            "pointer-events" : "auto"
        });
    }
    else{
		$("#infoBox").css("display","block");
		$("#heading, #leftPanel, #rightPanel, #timeSlider, #legend, #colophonIcon, #theme").css({
            "pointer-events" : "none"
        });
		$("#infoIcon").css("pointer-events","auto");
    }
}

//The function that shows and hides the colophon ("Created by") window
function controlColophonBox(){
    if ($("#colophon").css("display") == "block"){
		$("#colophon").css("display","none");
		$("#heading, #leftPanel, #rightPanel, #timeSlider, #legend, #infoIcon, #theme").css({
            "pointer-events" : "auto"
        });
    }
    else{
		$("#colophon").css("display","block");
		$("#heading, #leftPanel, #rightPanel, #timeSlider, #legend, #infoIcon, #theme").css({
            "pointer-events" : "none"
        });
		$("#colophonIcon").css("pointer-events","auto");
    }
}
