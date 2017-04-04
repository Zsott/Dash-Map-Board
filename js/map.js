// ##### Change all comments to English!!!

var c = {};
$.getJSON("config.json", function(data){
    for(var key in data){
        c[key] = data[key];
    }
    // Ide lehetne berakni a konfig hibaellenőrzését.
    // Ha az elején csinálunk egy ellenőrzést, akkor hiba esetén le tudjuk lőni az egész webapp építését.
});

require(
// ##### Nézzük át, kell-e minden, amit itt behúzunk!
	[
		"esri/map",
		"esri/layers/ArcGISDynamicMapServiceLayer",
		"esri/geometry/Extent",
		"esri/SpatialReference",
		"esri/dijit/Legend",
		"esri/dijit/Search",
        "esri/layers/FeatureLayer",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/layers/layer",
		"esri/dijit/TimeSlider",
		"esri/TimeExtent",
		
        "dojo/dom-construct",
		"dojo/_base/array",
		"dojo/dom",
		"dojo/ready",
		"dojo/parser",
        "dojo/query",
		"dijit/registry",
		"dojo/on"
	],
	function(
		Map,
		ArcGISDynamicMapServiceLayer,
		Extent,
		SpatialReference,
		Legend,
		Search,
        FeatureLayer,
        Query,
        QueryTask,
		SimpleFillSymbol,
        SimpleLineSymbol,
        Color,
        SimpleMarkerSymbol,
        Layer,
		TimeSlider,
		TimeExtent,
		
        domConstruct,
		arrayUtils,
		dom,
		ready,
		parser,
        query,
		registry,
		on
	){
    // Wait until DOM is ready *and* all outstanding require() calls have been resolved
    ready(function(){
        // Parse DOM nodes decorated with the data-dojo-type attribute
        // Ez futtatja a HTML element-ekbe írt dojo kódot.
        parser.parse();

		//A térképen való első kattintás
		var firstClick = true;

		var firstTheme = true;
		
        //Aktuális év, amin a timeslider áll		
        var currYear;
        
        // Aktuális téma kiválasztása és a témaválasztó elkészítése ##### Teszt
		// Alapértelmezett téma a config.json themeOrder-jének első eleme
        var actTheme;
		createThemeDropDown();
        
		//Az egész featureset (térképi bökés válasza)		
        var actFeatureSet = {};

        
		//Az aktulis év feature
		var actYearFeature;
		
		//A kiválasztott terület neve
		var actAreaName;
		
		var terkep;

		var dataQuery;

		var timeSlider;
		
		initTheme();
		var scale;
		var center;
		
		
		function initTheme(){

		
			//Megadjuk, hogy az EOV legyen a vetület.
			var spRef = new SpatialReference({
				wkid : actTheme.wkid
			});
			//Beállítjuk a térkép kezdő nézetének koordinátáit, valamint a vetületi rendszert.
			var extHun = new Extent({
				"xmin" : actTheme.xmin,
				"ymin" : actTheme.ymin,
				"xmax" : actTheme.xmax,
				"ymax" : actTheme.ymax,
				"spatialReference" : spRef
			});
			
			//Elkészítjük a térképet.
			terkep = new Map("map", {
				spatialReference: spRef,
				basemap: "topo",
				extent : extHun,
				logo : false,
				showAttribution : false
			});

			
			
			if(firstTheme){
console.log("first")
				scale=terkep.getScale();
				center= terkep.extent.getCenter();
console.log(center);				
			}
			else{
console.log("nem first")
				
				terkep.setScale(scale);
				terkep.centerAt(center);
console.log(center);	

			}
			//Az adatréteget beilleszti a rétegek tömb-be a config-ban megadott index értékkel
			var layerUrl = actTheme["additionalLayerURLs"];
			layerUrl.splice(actTheme.dataServiceLayerPosition, 0, actTheme.dataServiceURL);
			
			//Egyéb rétegek hozzáadása a térképhez.
			layerUrl.forEach(function(entry) {
				terkep.addLayer(new ArcGISDynamicMapServiceLayer(entry));
			});

			//Jelmagyarázat hozzáadása
			// var legend = new Legend({
				// map : terkep,
				// autoUpdate : true,
				// layerInfos : [{
					// layer : lyrTimeAware,
					// title: "Népességszám kategória"
				// }]
			// },"legend");
			// legend.startup();


			// Szűrés definiálása
			dataQuery = new esri.tasks.Query();
			dataQuery.returnGeometry = true;
			dataQuery.outFields = ["*"];
			dataQuery.orderByFields = ["ev ASC"];
			dataQueryTask = new QueryTask(actTheme["dataServiceURL"] + "/0");

			//TimeSlider inicializálása
			initTimeSlider();
				 
			// Kattintás esemény kezelése
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
				actFeatureSet=featureSet;
				//Első kattintáskor inicializálás a képernyőbeosztás elkészítése
                if (firstClick){
                    firstClick = false;
                    setLayout();
                }

				
                var actZoomLevel = terkep.getLevel();
                var newWidth = document.getElementById("map").offsetWidth;
                var newHeight = document.getElementById("map").offsetHeight;
                terkep.width = newWidth;
                terkep.height = newHeight;
                terkep.centerAndZoom(dataQuery.geometry,actZoomLevel);                
				
                //A kijelölt település kirajzolása
                var graphic = actFeatureSet.features[0];
				selectFeature(graphic);
				
				//Aktuális év szűrése
				searchCurrentYear(actFeatureSet);
				
				//A terület nevének lekérdezése és kiiratása
				actAreaName = actYearFeature.attributes[actTheme["areaNameField"]];
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
                    $("#dropDownContent").append('<a id="' + key + '" href="#">' + c.themeOrder[t][key] + '</a>')
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
							initTheme();
							initLayout();
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
			$("#placeYear").html("Kattintson a térképen egy területegységre!");
		}
		
        function setLayout(){
            if(actTheme.layout.leftPanelWidthPercent == 0){
                // A bal oldali panel eltüntetése
                $("#leftPanel").css({
                    "display" : "none"
                });
                // A jobb oldali panel létrehozása
                $("body").append('<div id="rightPanel"></div>');
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
            else if(actTheme.layout.leftPanelWidthPercent < 100 && actTheme.layout.leftPanelWidthPercent > 0){
                // A bal oldali panel átméretezése
                $("#leftPanel").css({
                    "width" : "calc(" + actTheme.layout.leftPanelWidthPercent + "% - 12px)",
                    "margin" : "4px 4px 8px 8px"
                });
                // A jobb oldali panel létrehozása
                $("body").append('<div id="rightPanel"></div>');
                $('<div id="rightPanel"></div>').after("#leftPanel");
                var w = 100 - actTheme.layout.leftPanelWidthPercent;
                $("#rightPanel").css({			
                    "width" : "calc(" + w + "% - 12px)"
                });
            }
            else{
                // ##### Kiírja a hibaüzenetet, de aztán megcsinálja a function többi részét. Jó ez így?
                alert("Hibás konfigurációs beállítás! Ellenőrizd a config.json fájlban a leftPanelWidthPercent értékét! (Érvényes értékkészlet: 0-100)");
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
                else if(actTheme.layout.mapHeightPercent > 0 && actTheme.layout.mapHeightPercent < 100){
                    // A térkép magasságának átméretezése
                    $("#map").css({
                        "height" : "calc(" + actTheme.layout.mapHeightPercent + "% - 6px)",
                        "margin-bottom" : "4px"
                    });
                    $("#map").append('<img src="img/enlarge.png" class="enlargeImg"/>');
                    // A bal alsó diagram panel létrehozása, méretezése
                    $("#leftPanel").append('<div id="' + actTheme.chartPositions.LL + '" class="roundedBox panels"></div>');
                    var h = 100 - actTheme.layout.mapHeightPercent;
                    $("#" + actTheme.chartPositions.LL).css({
                        "height" : "calc(" + h + "% - 6px)",
                        "margin-top" : "4px"
                    });
                }
                else{
                    // ##### Kiírja a hibaüzenetet, de aztán megcsinálja a function többi részét. Jó ez így?
                    alert("Hibás konfigurációs beállítás! Ellenőrizd a config.json fájlban a mapHeightPercent értékét! (Érvényes értékkészlet: 0-100)");
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
                    var neighQuery = new esri.tasks.Query();
                    neighQuery.geometry = actYearFeature.geometry;
                    neighQuery.returnGeometry = true;
                    outFields=["*"];
                    neighQuery.outFields = outFields;
                    neighQuery.spatialRelationship = esri.tasks.Query.SPATIAL_REL_TOUCHES;
                    var selNeighbour = new QueryTask(actTheme.dataServiceURL + "/" + actTheme.dataServiceLayerIndex); 
                    selNeighbour.execute(neighQuery, createBubDP);                    
				}
				else if(actTheme["chartPositions"][keyTitle]=="rad"){
                    createRadDP(actFeatureSet);
				}
			}			
		}		
		
		//A FeatureSet szűrése a timeslider-nek megfelelő évre
        function searchCurrentYear(featureSet){
			featureSet.features.forEach(function(entry) {
				if(entry.attributes["ev"]==currYear){
					actYearFeature=entry;
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

				if(actTheme["timeStops"].indexOf(entry.attributes["ev"].toString())!=-1){
					json = {};
					json["year"] = entry.attributes["ev"];

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
				json["year"] = entry.attributes["ev"];

	            for (var key in entry.attributes){
					for (var keyTitle in actTheme["tableSettings"].fieldMap) {
						if(key==keyTitle){
							json[keyTitle]=entry.attributes[key];
						}
					}
                }
				tabDP.push(json);				
			});
			createTable(tabDP);
		}

		//A bubble diagram dataprovider-nek feltöltése
        function createBubDP(featureSet){
			var bubDP=[];
            bubDP.push(actYearFeature.attributes);
            bubDP[0]["color"] = "#7656AB";			
			featureSet.features.forEach(function(entry) {
				if(entry.attributes["ev"]==currYear){
					bubDP.push(entry.attributes);
				}
			});
			var keys = [];
			for(var k in actTheme["bubbleSettings"].fieldMap) keys.push(k);
			//A z értéknek a tömb harmadik elemének kell lennie!!! Sorrend [0]: x, [1]:y, [2]:z
            var bubOrderedDP = orderArrayByAttribute(bubDP,keys[2],"desc");

			//Sorba rendezés z érték alapján
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
		// ##### Ezt tegyük rendbe, szerintem most jobban szét van bombázva, mint kéne.
        function initTimeSlider(){

			if(firstTheme){
				timeSlider = new TimeSlider({},"timeSlider");
				firstTheme=false;
			}
			terkep.setTimeSlider(timeSlider);
          
            timeSlider.on("time-extent-change",extentChanged);
            
            timeSlider.setThumbCount(1);
            timeSlider.setThumbIndexes([0]);
            timeSlider.setThumbMovingRate( actTheme["timeSliderMovingRate"]); 
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
			currYear=timeSlider.getCurrentTimeExtent().startTime.getFullYear();
			if(!firstClick){
				searchCurrentYear(actFeatureSet);
				chooseChart(1);	
				document.getElementById("placeYear").innerHTML=actAreaName+ " - " + currYear ;				
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
//                "colors":  c.pieColors,       
                //"balloonText": "[[percents]]% ([[value]] fő)",
				"balloonText": "[[title]]: [[percents]]%",
                "fontSize": 14,
                "valueField": "value",
                "titleField": "title",
                "labelRadius": -40,
                //"labelText": "[[title]]",
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
				json={}
				json["title"] = actTheme["serialSettings"].fieldMap[keyTitle];
				json["balloonText"]="<b>[[title]]: [[value]] fő</b>";
                json["fillAlphas"]=0.9;
                json["lineAlpha"]=1;
                json["type"]="column";
                json["valueField"]=keyTitle;
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
//                    "axisAlpha": 0,
                    "position": "left",
                    "title": actTheme["serialSettings"].dataUnit,
                    "stackType": "regular"
//					"minimum": 1000
                }],
                "startDuration": 1,
//                "graphs": graphs,
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
			if ($.isNumeric(actTheme["serialSettings"].xAxesMax)){
				serialChart.valueAxes[0].maximum=actTheme["serialSettings"].xAxesMax;
			}
			if ($.isNumeric(actTheme["serialSettings"].xAxesMin)){
				serialChart.valueAxes[0].minimum=actTheme["serialSettings"].xAxesMin;
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
				htmlString = htmlString + '<td>' + actTheme.timeStops[ev] + '</td>';
			}
			htmlString = htmlString + '</tr>';
			for (var keyTitle in actTheme["tableSettings"].fieldMap){
				htmlString = htmlString + '<tr><td class="tableRowId">' + actTheme.tableSettings.fieldMap[keyTitle] + '</td>';
				for (var i = 0; i < dp.length; i++) {
                    // checkRounding(dp[i][keyTitle],actTheme.tableSettings.dataPrecision);
					// htmlString = htmlString + '<td>' + dp[i][keyTitle] + '</td>';
					var cValue = checkRounding(dp[i][keyTitle],actTheme.tableSettings.dataPrecision);
                    htmlString = htmlString + '<td>' + cValue + '</td>';
                    if(i == dp.length - 1){
						htmlString = htmlString + '</tr>';
					}
				}
			}
			htmlString = htmlString + '</table>';
            $("#tableContent").html(htmlString);
            $("#tableTitle").html(actTheme.tableSettings.title);
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
                "colors":["#F8EF22"],
                "zoomOutText": "Mind",
                "valueAxes": [{
                    "title": xTitle+"("+actTheme["bubbleSettings"].xUnit+")",
                    "position": "bottom",
                    "axisAlpha": 0,
//                    "unit": "%",
                    "fontSize": 12
                },{
                    "title": yTitle +"("+actTheme["bubbleSettings"].yUnit+")",
                    "minMaxMultiplier": 1.2,
                    "axisAlpha": 0,
                    "position": "left",
//                    "unit": "%",
                    "fontSize": 12
                }],
                "startDuration": 1.5,
                // "graphs": [{
                    // "balloonText": "<b>[[description]]</b><br>"+xTitle+": <b>[[x]] "+actTheme["bubbleSettings"].xUnit+"</b><br>"+yTitle+": <b>[[y]] "+actTheme["bubbleSettings"].yUnit+"</b><br>"+zTitle+": <b>[[value]] "+actTheme["bubbleSettings"].zUnit+"</b>",
                    // "bullet": "circle",
                    // "bulletBorderAlpha": 0.2,
                    // "bulletAlpha": 0.65,
                    // "lineAlpha": 0,
                    // "fillAlphas": 0,
                    // "valueField": zField,
                    // "xField": xField,
                    // "yField": yField,
                    // "colorField": "color",
                    // "descriptionField": actTheme["areaNameField"],
                    // "maxBulletSize": 100,
                    // "fontSize": 12
                // }],
                "legend":{
                    "align": "center",
                    "fontSize": 12,
                    "data": [{
                        "title": actAreaName,
                        "color": "#7656AB",
                        "fillAlphas": 0.65
                        },
                        {
                        "title": actAreaName+ " szomszédai",
                        "color": "#F8EF22",
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
                "valueAxes":[{
                    //"minimum": 0,
//                    "maximum": 100                    
                }],

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
                    "balloonText": "[[title]]: [[value]]"+actTheme["radarSettings"].dataUnit,
                    "bullet": "round",
                    "lineThickness": 2,
                    "valueField": "value",
                    "bullet": "round"
            }];
			radarChart.addGraph(graphs[0]);			
        }
	});
});

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
function hideSplash(){
	$("#splash").css("display","none");
	$("#map, #heading, #search, #chart, #table, #timeSlider, #legend").css("pointer-events","auto");
}

//Az infóablakot megjelenítő és elrejtő funkció.
function controlInfoBox(){
    if ($("#infoBox").css("display") == "block"){
		$("#infoBox").css("display","none");
		$("#map, #heading, #search, #chart, #table, #timeSlider, #legend").css("pointer-events","auto");
    }
    else{
		$("#infoBox").css("display","block");
		$("#map, #heading, #search, #chart, #table, #timeSlider, #legend").css("pointer-events","none");
		$("#infoIcon").css("pointer-events","auto");
    }
} 
