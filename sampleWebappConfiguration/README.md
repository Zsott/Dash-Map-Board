## About the Sample Dash-Map-Board Webapp Configuration

### Purpose
We try to make it easier for you to understand the concept behind the Dash-Map-Board configurable webapp. For this we've created four time-aware MapServices and preconfigured a [config.jon](sampleWebappConfiguration/config.json) with which you can start a Sample Dash-Map-Board immediately and you can try to change the preconfigured config.json's parameters as you wish.  

### How to make it run?
1. Download the whole Dash-Map-Board project by clicking on the `Clone or download` button on the [project's main page](https://github.com/Zsott/Dash-Map-Board). Choose `Download ZIP` and save the file to your computer.
2. Unzip the downloaded file.
3. Rename or delete the original `config.json` (the one next to the `index.html`).
4. Copy the preconfigured `config.json` file from the `sampleWebappConfiguration` folder next to the `index.html`. (From where you've been deleted / renamed the original `config.json`.)
5. Start the `index.html` file with a browser. **IMPORTANT** Use Firefox or [start Chrome with local file access](https://stackoverflow.com/questions/18586921/how-to-launch-html-using-chrome-at-allow-file-access-from-files-mode)!
6. The preconfigured Dash-Map-Board project starts.
7. Open the `config.json` with a text editor like Notepad++, SublimeText or whatever and change a parameter's value (but first consult with the [Configuration Guide](../configurationGuide.md)) and save your changes.
8. Reload the browser page and the Dash-Map-Board project starts with the change(s) you've made.  

### Services
We created four time-aware MapServices using EUROSTAT data and three other (non-time-aware) MapServices as supporting layers. We also found some MapServices that can be used as supporting layers too. 
  
Time-aware thematic MapServices:
- Crime: http://arcgisserver.lechnerkozpont.hu/arcgisserverwa/rest/services/homokozo/DashMapBoardSampleCrime/MapServer
- Demography: http://arcgisserver.lechnerkozpont.hu/arcgisserverwa/rest/services/homokozo/DashMapBoardSampleDemography/MapServer
- Internet: http://arcgisserver.lechnerkozpont.hu/arcgisserverwa/rest/services/homokozo/DashMapBoardSampleInternet/MapServer
- Research&Development: http://arcgisserver.lechnerkozpont.hu/arcgisserverwa/rest/services/homokozo/DashMapBoardSampleResearchAndDevelopment/MapServer  

Supporting layer MapServices:
- NUTS0 borders: http://arcgisserver.lechnerkozpont.hu/arcgisserverwa/rest/services/homokozo/DashMapBoardSampleNuts0/MapServer
- NUTS1 borders: http://arcgisserver.lechnerkozpont.hu/arcgisserverwa/rest/services/homokozo/DashMapBoardSampleNuts1/MapServer
- NUTS2 borders: http://arcgisserver.lechnerkozpont.hu/arcgisserverwa/rest/services/homokozo/DashMapBoardSampleNuts2/MapServer
- Hydrology: http://hydrology.esri.com/arcgis/rest/services/WorldHydroReferenceOverlay/MapServer
- Transportation:  

### Meta data

### Data sources
