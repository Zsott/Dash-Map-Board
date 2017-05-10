// ##### Change all comments to English!!!

//The common part of config.json the key and the type of values (in all theme) 
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
				
//The keys and the type of values in serial chart settings (use in config validator)
var configSerialSettingsJson={
    "title" : "string",
    "colors" : "array",
    "dataPrecision" : "number",
    "dataUnit" : "string",
    "yAxesMax" : "string",
    "yAxesMin" : "string",
    "fieldMap" : "object"
};

//The keys and the type of values in radar chart settings (use in config validator)
var configRadarSettingsJson={
    "title" : "string",
    "colors" : "array",
    "dataPrecision" : "number",
    "dataUnit" : "string",
    "xAxesMax" : "string",
    "xAxesMin" : "string",
    "fieldMap" : "object"
};
		
//The keys and the type of values in bubble chart settings (use in config validator)
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

//The keys and the type of values in table settings (use in config validator)
var configTableSettingsJson={
    "title" : "string",
    "heading" : "string",
    "fieldMap" : "object"
};
		
//The keys and the type of values in serial chart settings (use in config validator)
var configPieSettingsJson={
    "title" : "string",
    "colors" : "array",
    "fieldMap" : "object"
};		

//Valid type of image		
var imgType=["png","jpg","tif","bmp","gif"];
		
var c = {};
$.getJSON("config.json", function(data){
	
//-------------------------------------------------------------------------	
//JSON Validator
//-------------------------------------------------------------------------	

	//Checking themeOrder key
	if (!("themeOrder" in data)){
            alertMessage("The configuration is incorrect! The themeOrder key is missing!");
    }
	if(jQuery.isEmptyObject(data["themeOrder"])){
		alertMessage("The configuration is incorrect! Array of themeOrder is empty!");
	}
	
	//Checking if the settings of theme were exist
    for(var t in data.themeOrder){
        for(var key in data.themeOrder[t]){
			if (!(key in data)){
				alertMessage("The configuration is incorrect! The theme of '" + key + "' is missing!");
			}
        }
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
							alertMessage("The configuration is incorrect! The "+ckey+"/"+cikey+" key in the theme of '"+key+"' is missing!");
						}
						//Checking type
						var keyArray=[key,ckey,cikey];
						typeChecking(keyArray,configMainJson[ckey][cikey],jQuery.type( theme[ckey][cikey]))
						//Checking number
						if(jQuery.type( theme[ckey][cikey])=="number"){
							numberChecking(keyArray,theme[ckey][cikey])
						}
						//Checking array
						if(jQuery.type( theme[ckey][cikey])=="array"){
							arrayChecking(keyArray,theme[ckey][cikey])
						}
						//Checking image //##### Üres is legyen valid!!!
						if(cikey=="logoImg"){
							if(imgType.indexOf(theme[ckey][cikey].slice(-3))==-1){
								alertMessage("The configuration is incorrect! The value of the "+ckey+"/"+cikey+" key in the theme of '"+key+"' is not valid. Only png, jpg, tif, gif and bmp allowed!")
							}
						}
						
						//Loading the diagram of the actual theme into chartArray
						if((ckey=="chartPositions") && (theme[ckey][cikey]!="")){
							chartArray.push(theme[ckey][cikey]);
						}
					}
				}
				else{
					var keyArray=[key,ckey];
					//Checking type
					typeChecking(keyArray,configMainJson[ckey],jQuery.type(theme[ckey]));
					//Checking number
					if(jQuery.type( theme[ckey])=="number"){
						numberChecking(keyArray,theme[ckey])
					}
					//Checking array
					if(jQuery.type( theme[ckey])=="array"){
						arrayChecking(keyArray,theme[ckey])
					}
					//Checking url
					if(ckey=="dataServiceURL"){
						urlChecking(keyArray,theme[ckey]);
					}
				}
			}

			//Choosing the type of actual diagram
			chartArray.forEach(function(chartType) {				
				switch(chartType) {
					case "ser":
						chartKey="serialSettings";
						chartJson=configSerialSettingsJson;
						break;
					case "pie":
						chartKey="pieSettings";
						chartJson=configPieSettingsJson;
						break;
					case "bub":
						chartKey="bubbleSettings";
						chartJson=configBubbleSettingsJson;
						break;
					case "rad":
						chartKey="radarSettings";
						chartJson=configRadarSettingsJson;
						break;
					case "tab":
						chartKey="tableSettings";
						chartJson=configTableSettingsJson;
						break;
				    default:
						alertMessage("The configuration is incorrect! Invalid type of diagram ("+chartType+") is in the theme of '"+key+"'! Valid set of values is ser, pie, bub, rad, tab!");
				}
				var chart=data[key][chartKey];

				//Checking diagram settings
				for(var ckey in chartJson){
					var keyArray=[key,ckey];

					//Checking keys					
					if (!(ckey in chart)){
						alertMessage("The configuration is incorrect!  The "+chartKey+"/"+ckey+" key in the theme of '"+key+"' is missing!");
					}
					//Checking type	
					typeChecking(keyArray,chartJson[ckey],jQuery.type(chart[ckey]));
					
					//Checking color
					if(ckey=="colors"){
						colorChecking(keyArray,chart[ckey]);
					}
					//Checking fieldMap
					if(ckey=="fieldMap"){
						
						if(Object.getOwnPropertyNames(chart[ckey]).length === 0){
							alertMessage("The configuration is incorrect! The "+chartKey+"/"+ckey+" key in the theme of '"+key+"' is empty!");
						}
						for(var fmkey in chart[ckey]){ //##### Ezt az ellenőrzést átnézni, angolosítani.
							if (jQuery.type(chart[ckey][fmkey])!="string"){
								alertMessage("The configuration is incorrect! A "+key+" kulcsú téma "+chartKey+"/"+ckey+"/"+fmkey+" értéke csak string lehet!");
							}
						}
					}
				}	
			});			
        }
    }

	//Validating the type of configuration values
    function typeChecking(keyArray,type1,type2){
		if(type1!=type2){
			var keyString=keyArray[1];
			for (i = 2; i < keyArray.length; i++) {
				keyString +="/"+keyArray[i];
			}
			alertMessage("The configuration is incorrect! The type of the value of the "+keyString+" in the theme of '"+keyArray[0]+"' is incorrect, have "+type1+" instead of "+type2+"!");
		}
    }	

	//Validating of the arrays
    function arrayChecking(keyArray,dataArray){
		var keyString=keyArray[1];
		for (i = 2; i < keyArray.length; i++) {
			keyString +="/"+keyArray[i];
		}

		if(keyArray[keyArray.length-1] == "timeStops"){
			if(dataArray.length<2){
				alertMessage("The configuration is incorrect! The value of "+keyString+" in the theme of '"+keyArray[0]+"' is incorrect! The timeStops array must contain at least two elements!");
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
		var keyString=keyArray[1];
		for (i = 2; i < keyArray.length; i++) {
			keyString +="/"+keyArray[i];
		}

		var lastKey=keyArray[keyArray.length-1];
				
		if(value<0){
			alertMessage("The configuration is incorrect! The value of "+keyString+" in the theme of '"+keyArray[0]+"' is incorrect! This value must not be negative!");
		}
		
		if((lastKey=="leftPanelWidthPercent" || lastKey=="mapHeightPercent" || lastKey=="upperRightChartHeightPercent" ) && (value>100 || value <0)){
			alertMessage("The configuration is incorrect! The value of "+keyString+" in the theme of '"+keyArray[0]+"' is incorrect! Valid set of values is 0 to 100!");			
		}		
    }	

	//Validating of the color values
    function colorChecking(keyArray, colorsArray){
	
		colorsArray.forEach(function(entry) {
			var isOk  = /^#[0-9A-F]{6}$/i.test(entry);

			var keyString=keyArray[1];
			for (i = 2; i < keyArray.length; i++) {
				keyString +="/"+keyArray[i];
			}
			if(!isOk){
				alertMessage("The configuration is incorrect! One of the "+keyString+" array value in the theme of '"+keyArray[0]+"' is incorrect! ");
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

	//Showing the error message
	function alertMessage(alertText){
		alert(alertText);
		$("div").remove();
		$("body").append('<p class="configErrorList">'+alertText+'</p>');
	}
//-------------------------------------------------------------------------	

	//loading config.json
    for(var key in data){
        c[key] = data[key];
    }
    initWebApp();
});

function initWebApp(){
    require(
    // ##### Nézzük át, kell-e minden, amit itt behúzunk!
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
            //"esri/layers/layer",
            "esri/dijit/TimeSlider",
            "esri/TimeExtent",
            
            //"dojo/dom-construct",
            //"dojo/_base/array",
            "dojo/dom",
            "dojo/ready",
            "dojo/parser",
            //"dojo/query",
            //"dijit/registry",
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
            //Layer,
            TimeSlider,
            TimeExtent,
            
            //domConstruct,
            //arrayUtils,
            dom,
            ready,
            parser,
            //query,
            //registry,
            on
        ){
        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function(){
            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();
            
            console.log(c.creators);

            //Defining variables
            var firstClick = true; //Checks if there was any click on the map or not
            var firstTheme = true; //Checks if the actual is the first theme or not
            var currYear; //The current position of the timeslider	
            var actTheme; //Tracking the actual theme. By default it is the first element of the themeOrder array from config.json
            var actFeatureSet = {}; //The featureset you get by clicking on the map
            var actYearFeature; //The feature from the featureSet which corresponds to the current year
            var actAreaName; //The name of the clicked element
            var terkep;
            var dataQuery;
            var timeSlider;
            var legend; //The legend object
            var isFirstLegend = true;
            
            //Creates the theme chooser dropdown menu and selects the first theme
            createThemeDropDown();
            
            //Sets up the theme according to the first theme's configuration
            initTheme();
            
            //
            function initHtml(){
                //Sets the source of the logo according to the layout's setup
                if(!actTheme.layout.logoImg == ""){
                    $(".logo").css({
                        "display" : "inline-block"
                    });
                    $(".logo").attr("src",actTheme.layout.logoImg);
                }
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
                var colophonText = '<p class="colophonText"><strong>Az alkalmazás a <a href="https://github.com/Zsott/Dash-Map-Board" class="colophonLink" target="blank">Dash-Map-Board</a> keretrendszer segítségével készült.</strong></p><p></p><p class="colophonText">A Dash-Map-Board keretrendszert Lellei László és Ónodi Zsolt (<a href="http://lechnerkozpont.hu/" class="colophonLink" target="blank">Lechner Tudásközpont</a>) készítették, <a href="https://developers.arcgis.com/javascript/" class="colophonLink" target="blank">ArcGIS API for JS</a> és <a href="http://www.amcharts.com/javascript-charts/" class="colophonLink" target="blank">amCharts JS Charts</a> felhasználásával.</p><hr><hr><p class="colophonText"><strong>This application was created with <a href="https://github.com/Zsott/Dash-Map-Board" class="colophonLink" target="blank">Dash-Map-Board</a>.</strong></p><p></p><p class="colophonText">The Dash-Map-Board project was created by László Lellei and Zsolt Ónodi (<a href="http://lechnerkozpont.hu/" class="colophonLink" target="blank">Lechner Knowledge Center</a>), using <a href="https://developers.arcgis.com/javascript/" class="colophonLink" target="blank">ArcGIS API for JS</a> and <a href="http://www.amcharts.com/javascript-charts/" class="colophonLink" target="blank">amCharts JS Charts</a>.</p><button class="colophonButton" onclick="controlColophonBox()">OK</button>';
                $("#colophon").html(colophonText);
            }
            
            function initTheme(){
                
                initHtml();
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
                    basemap: actTheme.basemap, //##### config?
                    extent : extHun,
                    logo : false, //##### config?
                    showAttribution : false //##### config?
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
                
                //Add or hide legend depending on the config.json setup
                if(actTheme.layout.legendOn && isFirstLegend){
                    isFirstLegend = false;
                    $("#legendIcon").css({
                       "display" : "block"
                    });
                    legend = new Legend({
                        map: terkep,
                        autoUpdate: true,
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
                dataQuery = new esri.tasks.Query();
                dataQuery.returnGeometry = true;
                dataQuery.outFields = ["*"];

                //TimeSlider inicializálása
                dataQueryTask = new QueryTask(actTheme["dataServiceURL"] + "/" + actTheme.dataServiceLayerIndex);

                $("#placeYear").html(actTheme.layout.clickOnWhat);
                
                //Starting the timeslider
                initTimeSlider();
                     
                //Defining the click event on the map
                terkep.on("click", initDashBoard);
            }
            
            //A kattintásra inicializálódik(később frissül) a dashboard
            function initDashBoard(evt){
                //A kattintás által metszett geometria
                dataQuery.geometry = evt.mapPoint;
                //A lekérdezés futtatása
                dataQueryTask.execute(dataQuery, createDashBoard);
            }

            //Kattintásra a dashboard inicializálása/frissítése
            function createDashBoard(featureSet){
                if (featureSet.features.length > 0){
                    $("#leftPanel").addClass("fadeOut");
                    actFeatureSet=featureSet;
                    //Első kattintáskor inicializálás a képernyőbeosztás elkészítése
                    if (firstClick){
                        firstClick = false;
                        setLayout();
                    }
                    
                    //A kijelölt település kirajzolása
                    selectFeature(actFeatureSet.features[0]);
                    
                    //Aktuális év szűrése
                    searchCurrentYear(actFeatureSet);
                    
                    // ##### Kezeli azt a helyzetet, ha nincs adat az adott évhez?
                    $("#placeYear").html(actAreaName+ " - " + currYear);

                    //Diagramm adatok előállítása
                    chooseChart(0);
                }			
            }

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
                $("#dropDownContent a").click(function(){
                    changeTheme($(this).attr("id"));
                });
            }
            
            function changeTheme(elem){
                for(var t in c.themeOrder){
                    for(var key in c.themeOrder[t]){
                        if(key == elem){
                            firstTheme=false;
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
            
            function setLayout(){
                if(actTheme.layout.leftPanelWidthPercent == 0){
                    // A bal oldali panel eltüntetése
                    $("#leftPanel").css({
                        "display" : "none"
                    });
                    // A jobb oldali panel létrehozása
                    $("body").append('<div id="rightPanel" class="fadeOut"></div>');
                    $("#rightPanel").css({			
                        "width" : "calc(100% - 16px)",
                        "margin-left" : "8px"
                    });		
                }
                else if(actTheme.layout.leftPanelWidthPercent == 100){
                    // A bal oldali panel átméretezése
                    $("#leftPanel").css({
                        "width" : "calc(100% - 16px)"
                    });
                }
                else{
                    // A bal oldali panel átméretezése
                    $("#leftPanel").css({
                        "width" : "calc(" + actTheme.layout.leftPanelWidthPercent + "% - 12px)",
                        "margin" : "4px 4px 8px 8px"
                    });
                    // A jobb oldali panel létrehozása
                    $("body").append('<div id="rightPanel" class="fadeOut"></div>');
                    //$('<div id="rightPanel" class="fadeOut"></div>').after("#leftPanel");
                    var w = 100 - actTheme.layout.leftPanelWidthPercent;
                    $("#rightPanel").css({			
                        "width" : "calc(" + w + "% - 12px)"
                    });
                }
            
                // A baloldali panel függőleges tagolásának kialakítása
                if($("#leftPanel").css("display") != "none"){
                    if(actTheme.layout.mapHeightPercent == 0){
                        // A térkép eltüntetése
                        $("#map").css({
                            "display" : "none"
                        });
                        // A bal alsó diagram panel létrehozása
                        $("#leftPanel").append('<div id="' + actTheme.chartPositions.LL + '" class="roundedBox panels"></div>');
                        $("#" + actTheme.chartPositions.LL).css({
                            "height" : "calc(100% - 2px)"
                        });
                    }
                    else if(actTheme.layout.mapHeightPercent == 100){
                        // A térkép átméretezése
                        $("#map").css({
                            "height" : "calc(100% - 2px)"
                        });
                    }
                    else{
                        // A térkép magasságának átméretezése
                        $("#map").css({
                            "height" : "calc(" + actTheme.layout.mapHeightPercent + "% - 6px)",
                            "margin-bottom" : "4px"
                        });
                        // A bal alsó diagram panel létrehozása, méretezése
                        $("#leftPanel").append('<div id="' + actTheme.chartPositions.LL + '" class="roundedBox panels"></div>');
                        var h = 100 - actTheme.layout.mapHeightPercent;
                        $("#" + actTheme.chartPositions.LL).css({
                            "height" : "calc(" + h + "% - 6px)",
                            "margin-top" : "4px"
                        });
                    }
                }

                // A jobb oldali panel tagolásának kitalakítása
                if($("#rightPanel").css("display") != "none"){
                    if(actTheme.layout.upperRightChartHeightPercent == 0){
                        // A jobb alsó diagram panel létrehozása és méretezése
                        $("#rightPanel").append('<div id="' + actTheme.chartPositions.LR + '" class="roundedBox panels"></div>');
                        $("#" + actTheme.chartPositions.LR).css({
                            "height" : "calc(100% - 2px)"
                        });
                    }
                    else if(actTheme.layout.upperRightChartHeightPercent == 100){
                        // A bal felső diagram panel létrehozása és méretezése
                        $("#rightPanel").append('<div id="' + actTheme.chartPositions.UR + '" class="roundedBox panels"></div>');
                        $("#" + actTheme.chartPositions.UR).css({
                            "height" : "calc(100% - 2px)"
                        });
                    }
                    else if(actTheme.layout.upperRightChartHeightPercent > 0 && actTheme.layout.upperRightChartHeightPercent < 100){
                        // A bal felső diagram panel létrehozása és méretezése
                        $("#rightPanel").append('<div id="' + actTheme.chartPositions.UR + '" class="roundedBox panels"></div>');			
                        $("#" + actTheme.chartPositions.UR).css({
                            "height" : "calc(" + actTheme.layout.upperRightChartHeightPercent + "% - 6px)",
                            "margin-bottom" : "4px"
                        });
                        // A jobb alsó diagram panel létrehozása és méretezése
                        $("#rightPanel").append('<div id="' + actTheme.chartPositions.LR + '" class="roundedBox panels"></div>');
                        var h = 100 - actTheme.layout.upperRightChartHeightPercent;
                        $("#" + actTheme.chartPositions.LR).css({
                            "height" : "calc(" + h + "% - 6px)",
                            "margin-top" : "4px",
                            "display" : "inline-block"
                        });
                    }
                    else{
                        alert("Hibás konfigurációs beállítás! Ellenőrizd a config.json fájlban a upperRightChartHeightPercent értékét! (Érvényes értékkészlet: 0-100)");
                    }
                }
                terkep.width = $("#map").outerWidth();
                terkep.height = $("#map").outerHeight();
                terkep.centerAndZoom(dataQuery.geometry,terkep.getLevel());
            }
            
            //A configból a szükséges diagramtípusok kiolvasása és diagramépítések meghívása
            function chooseChart(timeSliderChange){	
                for (var keyTitle in actTheme["chartPositions"]) {
                    if(actTheme["chartPositions"][keyTitle]=="pie"){
                        createPieDP();
                    }					
                    else if(actTheme["chartPositions"][keyTitle]=="ser" && !timeSliderChange){
                        createSerDP();
                    }
                    else if(actTheme["chartPositions"][keyTitle]=="tab"){
                        createTabDP();
                    }
                    else if(actTheme["chartPositions"][keyTitle]=="bub"){
                        //Kezelni kell ha nincs adat az adott évhez
                        var keys = Object.keys(actYearFeature);
                        if(keys.length==0){
                            //Nincs adat üresen hívja meg a diagram készítést
                            createBubbleChart([]);						
                        }
                        else{
                            var neighQuery = new esri.tasks.Query();
                            neighQuery.geometry = actYearFeature.geometry;
                            neighQuery.returnGeometry = true;
                            outFields=["*"];
                            neighQuery.outFields = outFields;
                            neighQuery.spatialRelationship = esri.tasks.Query.SPATIAL_REL_TOUCHES;
                            var selNeighbour = new QueryTask(actTheme.dataServiceURL + "/" + actTheme.dataServiceLayerIndex); 
                            selNeighbour.execute(neighQuery, createBubDP);
                        }
                        

                    }
                    else if(actTheme["chartPositions"][keyTitle]=="rad"){
                        createRadDP(actFeatureSet);
                    }
                }
                $("#leftPanel, #rightPanel").addClass("fadeIn");
                $("#leftPanel, #rightPanel").removeClass("fadeOut");
            }		
            
            //A FeatureSet szűrése a timeslider-nek megfelelő évre
            function searchCurrentYear(featureSet){
                actYearFeature={};
                actAreaName="";
                featureSet.features.forEach(function(entry) {
                    actAreaName=entry.attributes[actTheme["areaNameField"]];
                    if(entry.attributes[actTheme["timeField"]] == currYear){
                        actYearFeature = entry;
                    }
                });				
            }
            
            //A térképen kijelöli a kiválasztott objektumot
            function selectFeature(graphic){
                //Esetleges korábbi jelölések törlése
                terkep.graphics.clear();
                // Kiválasztott területi egység szimbóluma
                var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                             new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                             new Color([248, 239, 34]), 2), new Color([200, 200, 200, 0.25]));
                graphic.setSymbol(symbol);
                terkep.graphics.add(graphic);
            }

            //A pie diagram dataprovider-nek feltöltése
            function createPieDP(){
                var pieDP = [];				
                for (var key in actYearFeature.attributes){
                    json = {};
                    for (var keyTitle in actTheme["pieSettings"].fieldMap) {
                        if(key==keyTitle){
                            json["title"]=actTheme["pieSettings"].fieldMap[keyTitle];
                            json["value"] = actYearFeature.attributes[key];
                            pieDP.push(json);
                        }
                    }
                }
                createPieChart(pieDP);
            }		
            
            //A serial diagram dataprovider-nek feltöltése
            function createSerDP(){
                var serDP = [];		
                var json;
                actFeatureSet.features.forEach(function(entry) {

                    if(actTheme["timeStops"].indexOf(entry.attributes[actTheme["timeField"]].toString())!=-1){
                        json = {};
                        json["year"] = entry.attributes[actTheme["timeField"]];

                        for (var key in entry.attributes){
                            for (var keyTitle in actTheme["serialSettings"].fieldMap) {
                                if(key==keyTitle){
                                    json[keyTitle]=entry.attributes[key];
                                }
                            }
                        }
                        serDP.push(json);
                    }
                });

                var serOrderedDP = orderArrayByAttribute(serDP,"year","asc");
                
                createSerialChart(serOrderedDP);
            }

            //A táblázat dataprovider-nek feltöltése
            function createTabDP(){
                var tabDP = [];		
                var json;
                actFeatureSet.features.forEach(function(entry) {
                    json = {};
                    json["year"] = entry.attributes[actTheme["timeField"]];

                    for (var key in entry.attributes){
                        for (var keyTitle in actTheme["tableSettings"].fieldMap) {
                            if(key==keyTitle){
                                json[keyTitle]=entry.attributes[key];
                            }
                        }
                    }
                    tabDP.push(json);				
                });
                var tabOrderedDP = orderArrayByAttribute(tabDP,"year","asc");
                createTable(tabOrderedDP);
            }

            //A bubble diagram dataprovider-nek feltöltése
            function createBubDP(featureSet){
                var bubDP=[];
                
                if(actYearFeature.attributes[actTheme["timeField"]]==currYear){
                    bubDP.push(actYearFeature.attributes);
                    bubDP[0]["color"] = actTheme["bubbleSettings"].colors[0];			
                }
            
                featureSet.features.forEach(function(entry) {
                    if(entry.attributes[actTheme["timeField"]]==currYear){
                        bubDP.push(entry.attributes);
                    }
                });
                var keys = [];
                for(var k in actTheme["bubbleSettings"].fieldMap) keys.push(k);
                //A z értéknek a tömb harmadik elemének kell lennie!!! Sorrend [0]: x, [1]:y, [2]:z
                //Sorba rendezés z érték alapján
                var bubOrderedDP = orderArrayByAttribute(bubDP,keys[2],"desc");

                createBubbleChart(bubOrderedDP);
            }
                        
            //Sorbarendezés attributum alapján (Bubble diagramnál a kisebb kerüljön felülre, Serial fordítva)
            function orderArrayByAttribute(arr,att,order){
                var newArr = [];
                for (i=0;i<arr.length;i++){
                    var item = arr[i][att];
                    var index = newArr.length;
                    for (j=0;j < newArr.length;j++){
                        if(order=="desc"){
                            if(item > newArr[j][att]){
                                index = j;
                                break;
                            }
                        }
                        if(order=="asc"){
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
          
            function createRadDP(dp){
                var radDP = [];				
                for (var key in actYearFeature.attributes){
                    json = {};
                    for (var keyTitle in actTheme["radarSettings"].fieldMap) {
                        if(key==keyTitle){
    //						json[keyTitle]=entry.attributes[key];
                            json["title"]=actTheme["radarSettings"].fieldMap[keyTitle];
                            json["value"] = actYearFeature.attributes[key];
                            radDP.push(json);
                        }
                    }
                }
                createRadarChart(radDP);
            }
            
            //TimeSlider beállítások
            function initTimeSlider(){

                if(firstTheme){
                    timeSlider = new TimeSlider({},"timeSlider");
                    firstTheme=false;
                }
                terkep.setTimeSlider(timeSlider);
              
                timeSlider.on("time-extent-change",extentChanged);
                
                timeSlider.setThumbCount(1);
                timeSlider.setThumbIndexes([0]);
                timeSlider.setThumbMovingRate(actTheme["timeSliderMovingRate"]); 
                var timeStops=[];
                actTheme["timeStops"].forEach(function(entry) {
                    timeStops.push(new Date(entry));
                });
                timeSlider.setTimeStops(timeStops);
                timeSlider.singleThumbAsTimeInstant(true);
                timeSlider.setLabels(actTheme["timeStops"]);
                timeSlider.setLoop(true);
                timeSlider.startup();
            }
            
            //Timeslider változás esemény
            function extentChanged(evt){
                currYear = timeSlider.getCurrentTimeExtent().startTime.getFullYear();
                if(!firstClick){
                    searchCurrentYear(actFeatureSet);
                    chooseChart(1);
                    $("#placeYear").html(actAreaName + " - " + currYear);
                    colorTable();
                }
            }		
            
            //Pie chart elkészítése
            function createPieChart(dp){
                var pieChart = AmCharts.makeChart("pie",{
                    "type": "pie",
                    "theme": "light",
                    "titles": [{
                       "text": actTheme["pieSettings"].title + ", " + currYear,
                       "size": 14,
                       "bold": true
                    }],
                    "dataProvider": dp,
                    "numberFormatter": {
                        "precision": actTheme["pieSettings"].dataPrecision, //### Itt sajnos nem működik, mert a percent van kiiírva
                        "decimalSeparator": ",",
                        "thousandsSeparator": " "
                    },
                    "colors":  actTheme["pieSettings"].colors,
                    "balloonText": "[[title]]: [[percents]]%", //##### config?
                    "fontSize": 14, //##### config?
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
            
            //Serial chart elkészítése
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
            
                // x tengely értekek maximumának és minimumának beállítása, ha az meg volt adva a configba
                if ($.isNumeric(actTheme["serialSettings"].yAxesMax)){
                    serialChart.valueAxes[0].maximum=actTheme["serialSettings"].yAxesMax;
                }
                if ($.isNumeric(actTheme["serialSettings"].yAxesMin)){
                    serialChart.valueAxes[0].minimum=actTheme["serialSettings"].yAxesMin;
                }
                //az értékeket újra meg kell adni, hogy tengelybeállítás érvényes legyen
                for (i = 0; i < graphs.length; i++) {
                    serialChart.addGraph(graphs[i]);			
                }
            }

            //Create HTML table in #tab div
            function createTable(dp){
                $("#tab").append('<div id="tableTitle"></div>');
                $("#tab").append('<div id="tableContent"></div>');
                var htmlString = '<table>';
                htmlString = htmlString + '<tr class="tableHeading"><td>' + actTheme.tableSettings.heading + '</td>';
                for(var ev in actTheme.timeStops){
                    htmlString = htmlString + '<td class="' + actTheme.timeStops[ev] + '">' + actTheme.timeStops[ev] + '</td>';
                }
                htmlString = htmlString + '</tr>';
                for (var keyTitle in actTheme.tableSettings.fieldMap){
                    htmlString = htmlString + '<tr><td class="tableRowId">' + actTheme.tableSettings.fieldMap[keyTitle] + '</td>';
                    for (var i = 0; i < dp.length; i++) {
                        var cValue = checkRounding(dp[i][keyTitle],actTheme.tableSettings.dataPrecision);
                        htmlString = htmlString + '<td class="' + dp[i]["year"] + '">' + cValue + '</td>';
                        if(i == dp.length - 1){
                            htmlString = htmlString + '</tr>';
                        }
                    }
                }
                htmlString = htmlString + '</table>';
                $("#tableContent").html(htmlString);
                $("#tableTitle").html(actTheme.tableSettings.title);
                colorTable();
            }    

            function colorTable(){
                $(".actualYearColumn").removeClass("actualYearColumn");
                $("." + currYear).addClass("actualYearColumn");
            }
            
            //Rounding function for table creation
            function checkRounding(value,prec){
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
            
            //Bubble chart elkészítése
            function createBubbleChart(dp){
                var xField, yField, zField, xTitle, yTitle;
                var xField=actTheme["bubbleSettings"].fieldMap;
                var x=1;
                var keys = [];

                
                for(var k in actTheme["bubbleSettings"].fieldMap) keys.push(k);
                
                
                //Lényeges a sorrend x,y,z
                xField=keys[0];
                xTitle=actTheme["bubbleSettings"].fieldMap[keys[0]];
                yField=keys[1];
                yTitle=actTheme["bubbleSettings"].fieldMap[keys[1]];
                zField=keys[2];
                zTitle=actTheme["bubbleSettings"].fieldMap[keys[2]];

                

                var bubbleChart = AmCharts.makeChart( "bub", {
                    "type": "xy",
                    "theme": "light",
                    "titles": [{
                       "text": actTheme["bubbleSettings"].title,
                       "size": 14,
                       "bold": true
                    }],
                    "balloon":{"fixedPosition": true},
                    "dataProvider": dp,
                    "numberFormatter": {
                        "precision": actTheme["bubbleSettings"].dataPrecision,
                        "decimalSeparator": ",",
                        "thousandsSeparator": " "
                    },
                    "colors":[actTheme["bubbleSettings"].colors[1]],
                    "zoomOutText": "Mind",
                    "valueAxes": [{
                        "title": xTitle + "(" + actTheme["bubbleSettings"].xUnit + ")",
                        "position": "bottom",
                        "axisAlpha": 0,
                        "fontSize": 12
                    },{
                        "title": yTitle + "(" + actTheme["bubbleSettings"].yUnit + ")",
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
                            "color": actTheme["bubbleSettings"].colors[0],
                            "fillAlphas": 0.65
                            },
                            {
                            "title": actAreaName+ " szomszédai",
                            "color": actTheme["bubbleSettings"].colors[1],
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
            
                // x tengely értekek maximumának és minimumának beállítása, ha az meg volt adva a configba
                if ($.isNumeric(actTheme["bubbleSettings"].xAxesMax)){
                    bubbleChart.valueAxes[0].maximum=actTheme["bubbleSettings"].xAxesMax;
                }
                if ($.isNumeric(actTheme["bubbleSettings"].xAxesMin)){
                    bubbleChart.valueAxes[0].minimum=actTheme["bubbleSettings"].xAxesMin;
                }
                // y tengely értekek maximumának és minimumának beállítása, ha az meg volt adva a configba
                //Y-nál valamennyit ráhagy pl beállítom 9000 és 10000 rak ki...
                if ($.isNumeric(actTheme["bubbleSettings"].yAxesMax)){
                    bubbleChart.valueAxes[1].maximum=actTheme["bubbleSettings"].yAxesMax;
                }
                if ($.isNumeric(actTheme["bubbleSettings"].yAxesMin)){
                    bubbleChart.valueAxes[1].mimimum=actTheme["bubbleSettings"].yAxesMin;
                }

                //az értékeket újra meg kell adni, az értékeket újra meg kell adni, hogy tengelybeállítás érvényes legyen
                var graphs= [{
                        "balloonText": "<b>[[description]]</b><br>"+xTitle+": <b>[[x]] "+actTheme["bubbleSettings"].xUnit+"</b><br>"+yTitle+": <b>[[y]] "+actTheme["bubbleSettings"].yUnit+"</b><br>"+zTitle+": <b>[[value]] "+actTheme["bubbleSettings"].zUnit+"</b>",
                        "bullet": "circle",
                        "bulletBorderAlpha": 0.2,
                        "bulletAlpha": 0.65,
                        "lineAlpha": 0,
                        "fillAlphas": 0,
                        "valueField": zField,
                        "xField": xField,
                        "yField": yField,
                        "colorField": "color",
                        "descriptionField": actTheme["areaNameField"],
                        "maxBulletSize": 100,
                        "fontSize": 12
                    }];
                bubbleChart.addGraph(graphs[0]);
            }
            
            function createRadarChart(dp){
                var radarChart = AmCharts.makeChart( "rad", {
                    "type": "radar",
                    "theme": "light",
                    "titles": [{
                       "text": actTheme["radarSettings"].title,
                       "size": 14,
                       "bold": true
                    }],
                    "numberFormatter": {
                        "precision": actTheme["radarSettings"].dataPrecision,
                        "decimalSeparator": ",",
                        "thousandsSeparator": " "
                    },
                    "dataProvider": dp,
                    "startDuration": 1,
                    "categoryField": "title",
                    "export": {"enabled": false}
                });
                // x tengely értekek maximumának és minimumának beállítása, ha az meg volt adva a configba
                if ($.isNumeric(actTheme["radarSettings"].xAxesMax)){
                    radarChart.valueAxes[0].maximum=actTheme["radarSettings"].xAxesMax;
                }
                if ($.isNumeric(actTheme["radarSettings"].xAxesMin)){
                    radarChart.valueAxes[0].minimum=actTheme["radarSettings"].xAxesMin;
                }
                var graphs=[{
                        "balloonText": "[[title]]: [[value]]" + actTheme["radarSettings"].dataUnit,
                        "bullet": "round",
                        "lineThickness": 2,
                        "valueField": "value",
                        "bullet": "round"
                }];
                radarChart.addGraph(graphs[0]);			
            }
        });
    });
}

//A jelmagyarázat ikonra kattintást szabályozó funkció.
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

//Az üdvözlőképernyőt eltüntető funkció.
//##### Pointer-events-et átnézni!!!
function hideSplash(){
	$("#splash").css("display","none");
	$("#map, #heading, #chart, #table, #timeSlider, #legend").css({
        "pointer-events" : "auto"
    });
}

//Az infóablakot megjelenítő és elrejtő funkció.
//##### Pointer-events-et átnézni!!!
function controlInfoBox(){
    if ($("#infoBox").css("display") == "block"){
		$("#infoBox").css("display","none");
		$("#map, #heading, #chart, #table, #timeSlider, #legend").css({
            "pointer-events" : "auto"
        });
    }
    else{
		$("#infoBox").css("display","block");
		$("#map, #heading, #chart, #table, #timeSlider, #legend").css({
            "pointer-events" : "none"
        });
		$("#infoIcon").css("pointer-events","auto");
    }
}

//The function that shows and hides the colophon ("Created by") window
//##### Pointer-events-et átnézni!!!
function controlColophonBox(){
    if ($("#colophon").css("display") == "block"){
		$("#colophon").css("display","none");
		$("#map, #heading, #chart, #table, #timeSlider, #legend").css({
            "pointer-events" : "auto"
        });
    }
    else{
		$("#colophon").css("display","block");
		$("#map, #heading, #chart, #table, #timeSlider, #legend").css({
            "pointer-events" : "none"
        });
		$("#colophonIcon").css("pointer-events","auto");
    }
}
