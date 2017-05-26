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
- Transportation: http://utility.arcgis.com/usrsvcs/servers/851b325051af48e087c5a21e91ce0137/rest/services/Reference/World_Transportation/MapServer  

### Meta data
#### Fields in all sample MapServices
**Field name**: areacode  
**Data type**: string  
**Alias**: NUTS3 CODE  

**Field name**: areaname  
**Data type**: string  
**Alias**:  Name of NUTS3 unit  
**Where to use?**: `areaNameField`  

**Field name**: year  
**Data type**: number  
**Alias**: Year  
**Where to use?**: `timeField`  

#### Theme specific fields
##### Crime theme
**Field name**: homicide  
**Data type**: number  
**Alias**: Intentional homicide  
**Unit**: incidents  
**Where to use?**: pie, table  

**Field name**: robbery  
**Data type**: number  
**Alias**: Robbery  
**Unit**: incidents  
**Where to use?**: pie, table  

**Field name**: burglary  
**Data type**: number  
**Alias**: Burglary of private residential premises  
**Unit**: incidents  
**Where to use?**:  pie, table  

**Field name**: theftvehicle  
**Data type**: number  
**Alias**: Theft of a motorized land vehicle  
**Unit**: incidents  
**Where to use?**: pie, table  

**Field name**: total  
**Data type**: number  
**Alias**: Examined crime types together  
**Unit**: incidents  
**Where to use?**: table  

**Field name**: pop  
**Data type**: number  
**Alias**: Population on 1 January - total  
**Unit**: persons  
**Where to use?**: bubble, table  

**Field name**: crimepoll  
**Data type**: number  
**Alias**: Crime pollution  
**Unit**: incidents / 1000 persons  
**Where to use?**: map, table  

##### Demography theme
**Field name**: pop  
**Data type**: number  
**Alias**: Population on 1 January - total  
**Unit**: persons  
**Where to use?**: table  

**Field name**: area  
**Data type**: number  
**Alias**: Total area  
**Unit**: square kilometers  
**Where to use?**: table  

**Field name**: popden  
**Data type**: number  
**Alias**: Population density  
**Unit**: persons per square kilometers  
**Where to use?**: map, table  

**Field name**: pmale  
**Data type**: number  
**Alias**: Male population  
**Unit**: persons  
**Where to use?**: serial, pie, table  

**Field name**: pfemale  
**Data type**: number  
**Alias**: Female population  
**Unit**: persons  
**Where to use?**: serial, pie, table  

**Field name**: ylt15  
**Data type**: number  
**Alias**: Population - Less than 15 years  
**Unit**: persons  
**Where to use?**: serial, pie, table  

**Field name**: y1564  
**Data type**: number  
**Alias**: Population - From 15 to 64 years  
**Unit**: persons  
**Where to use?**: serial, pie, table  

**Field name**: yge65  
**Data type**: number  
**Alias**: Population - 65 years or over  
**Unit**: persons  
**Where to use?**: serial, pie, table  

**Field name**: yunk  
**Data type**: number  
**Alias**: Population - Unknown age  
**Unit**: persons  
**Where to use?**: serial, pie, table  

**Field name**: cnmigrat  
**Data type**: number  
**Alias**: Net migration plus statistical adjustment  
**Unit**: persons  
**Where to use?**: table  

**Field name**: cnmigratrt  
**Data type**: number  
**Alias**: Crude rate of net migration plus statistical adjustment  
**Unit**: thousandths  
**Where to use?**: table  

**Field name**: death  
**Data type**: number  
**Alias**: Deaths - total  
**Unit**: persons  
**Where to use?**: table  

**Field name**: gbirthrt  
**Data type**: number  
**Alias**: Crude birth rate  
**Unit**: thousandths  
**Where to use?**: bubble, table  

**Field name**: gdeathrt  
**Data type**: number  
**Alias**: Crude death rate  
**Unit**: thousandths  
**Where to use?**: bubble, table  

**Field name**: grow  
**Data type**: number  
**Alias**: Total population change  
**Unit**: persons  
**Where to use?**: table  

**Field name**: growrt  
**Data type**: number  
**Alias**: Crude rate of total population change  
**Unit**: thousandths  
**Where to use?**: table  

**Field name**: lbirth  
**Data type**: number  
**Alias**: Live births - total  
**Unit**: persons  
**Where to use?**: table  

**Field name**: natgrow  
**Data type**: number  
**Alias**: Natural change of population  
**Unit**: persons  
**Where to use?**: table  

**Field name**: natgrowrt  
**Data type**: number  
**Alias**: Crude rate of natural change of population  
**Unit**: thousandths  
**Where to use?**: table  

##### Internet theme
**Field name**: pc_hh  
**Data type**: number  
**Alias**: Percentage of households with broadband access  
**Unit**: percents  
**Where to use?**: map, table  

**Field name**: i_iubk  
**Data type**: number  
**Alias**: Internet use: Internet banking
**Unit**: percents  
**Where to use?**: bubble, table  

**Field name**: i_iusnet  
**Data type**: number  
**Alias**: Internet use: participating in social networks (creating user profile, posting messages or other contributions to facebook, twitter, etc.)  
**Unit**: percents  
**Where to use?**: bubble, table  

**Field name**: i_iusell  
**Data type**: number  
**Alias**: Internet use: selling goods or services  
**Unit**: percents  
**Where to use?**: bubble, table  

**Field name**: 
**Data type**: number  
**Alias**:
**Unit**: percents  
**Where to use?**:

**Field name**: 
**Data type**: number  
**Alias**:
**Unit**: percents  
**Where to use?**:

**Field name**: 
**Data type**: number  
**Alias**:
**Unit**: percents  
**Where to use?**:

**Field name**: 
**Data type**: number  
**Alias**:
**Unit**: percents  
**Where to use?**:

**Field name**: 
**Data type**: number  
**Alias**:
**Unit**: percents  
**Where to use?**:

**Field name**: 
**Data type**: number  
**Alias**:
**Unit**: percents  
**Where to use?**:

**Field name**: 
**Data type**: number  
**Alias**:
**Unit**: percents  
**Where to use?**:

**Field name**: 
**Data type**: number  
**Alias**:
**Unit**: percents  
**Where to use?**:

**Field name**: 
**Data type**: number  
**Alias**:
**Unit**: percents  
**Where to use?**:

**Field name**: 
**Data type**: number  
**Alias**:
**Unit**: percents  
**Where to use?**:

### Data sources
