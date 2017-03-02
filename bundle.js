/**
 * Data for side menu
 * 
 * @author Yauheni Svirydzenka <partagas@mail.ru>
 * @version 0.0.1
 * @copyright Yauheni Svirydzenka 2017
 */
 
var citiesData = [
	{
		id: "asipovichi", 
		value: "Asipovichi",
		icon: "retweet"
	},
	{
		id: "baranavichy", 
		value: "Baranavichy",
		icon: "train"
	},
	{
		id: "barysaw", 
		value: "Barysaw",
		icon: "futbol-o"
	},
	{
		id: "bobruysk", 
		value: "Bobruysk",
		icon: "gear"
	},
	{
		id: "braslav", 
		value: "Braslav",
		icon: "road"
	},
	{
		id: "brest", 
		value: "Brest",
		icon: "arrows-v"
	},
	{
		id: "gorki", 
		value: "Gorki", 
		icon: "university"
	},
	{
		id: "grodno", 
		value: "Grodno", 
		icon: "building"
	},
	{
		id: "homyel", 
		value: "Homyel", 
		icon: "truck"
	},
	{
		id: "kalinkavichi", 
		value: "Kalinkavichi", 
		icon: "save"
	},
	{
		id: "kobrin", 
		value: "Kobrin", 
		icon: "bed"
	},
	{
		id: "krichev", 
		value: "Krichev", 
		icon: "dashboard"
	},
	{
		id: "lida", 
		value: "Lida", 
		icon: "key"
	},
	{
		id: "lyepyel'", 
		value: "Lyepyel'", 
		icon: "leaf"
	},
	{
		id: "mahilyow", 
		value: "Mahilyow", 
		icon: "tty"
	},
	{
		id: "maladzyechna", 
		value: "Maladzyechna", 
		icon: "cloud"
	},
	{
		id: "mazyr", 
		value: "Mazyr", 
		icon: "fire-extinguisher"
	},
	{
		id: "minsk", 
		value: "Minsk", 
		icon: "send"
	},
	{
		id: "navapolatsk", 
		value: "Navapolatsk", 
		icon: "bank"
	},
	{
		id: "niasvizh", 
		value: "Niasvizh", 
		icon: "certificate"
	},
	{
		id: "orsha", 
		value: "Orsha", 
		icon: "plus"
	},
	{
		id: "pinsk", 
		value: "Pinsk", 
		icon: "arrows-h"
	},
	{
		id: "polatsk", 
		value: "Polatsk", 
		icon: "anchor"
	},
	{
		id: "rechytsa", 
		value: "Rechytsa", 
		icon: "random"
	},
	{
		id: "rogachev", 
		value: "Rogachev", 
		icon: "tag"
	},
	{
		id: "salihorsk", 
		value: "Salihorsk", 
		icon: "signal"
	},
	{
		id: "slutsk", 
		value: "Slutsk", 
		icon: "stop"
	},
	{
		id: "smarhon", 
		value: "Smarhon", 
		icon: "inbox"
	},
	{
		id: "svetlagorsk", 
		value: "Svetlagorsk", 
		icon: "sun-o"
	},
	{
		id: "vaukavysk", 
		value: "Vaukavysk", 
		icon: "camera"
	},
	{
		id: "vitsyebsk", 
		value: "Vitsyebsk", 
		icon: "user"
	},
	{
		id: "zhlobin", 
		value: "Zhlobin", 
		icon: "bullhorn"
	},
	{
		id: "zhodzina", 
		value: "Zhodzina", 
		icon: "tags"
	}
];

/**
 * Main app logic
 * 
 * @author Yauheni Svirydzenka <partagas@mail.ru>
 * @version 0.0.1
 * @copyright Yauheni Svirydzenka 2017
 */

/**
 * Set data for google map
 *
 * @param {object} weatherData Whole data from server
 */
function setDataForGoogleMap(weatherData) {
    var lat = weatherData.item.lat;
    var long = weatherData.item.long;
    
    var center = [];
    center.push(lat);
    center.push(long);
    $$("googleMap").define("center", center);
    

    var marker = {
        lat: lat,
        lng: long,
        title: "<b>City:</b> " + weatherData.location.city + "<br/><b>Country:</b> " + weatherData.location.country
    };
    $$("googleMap").add(marker);
}

/**
 * Choose arrow class for rendering wind direction
 *
 * @param {object} weatherData Whole data from server
 * @return {string} arrowClass Class name for arrow image
 */
function getClassForWindDirection(weatherData) {
    var arrowClass = "";
    var degrees = weatherData.wind.direction * 1;

    if (degrees <= 23 && degrees > 338) {
        arrowClass = "north";
    } else if (degrees > 23 && degrees <= 68) {
        arrowClass = "north-east";
    } else if (degrees > 68 && degrees <= 113) {
        arrowClass = "east";
    } else if (degrees > 113 && degrees <= 158) {
        arrowClass = "south-east";
    } else if (degrees > 158 && degrees <= 203) {
        arrowClass = "south";
    } else if (degrees > 203 && degrees <= 248) {
        arrowClass = "south-west";
    } else if (degrees > 248 && degrees <= 293) {
        arrowClass = "west";
    } else if (degrees > 293 && degrees <= 338) {
        arrowClass = "north-west";
    } else {
        arrowClass = "north";
    }

    return arrowClass;
}

/**
 * Set data and render page components
 *
 * @param {object} weatherData Whole data from server
 * @param {string} cityName City name
 */
function setDataToPageComponents(weatherData, cityName) {
    var placeCountry = "<div class=\"alert alert-info\">Country: <b>" + weatherData.location.country + "</b></div>";
    var placeRegion = "<div class=\"alert alert-info\">Region: <b>" + weatherData.location.region + "</b></div>";
    var placeCity = "<div class=\"alert alert-info\">City: <b>" + weatherData.location.city + "</b></div>";
    var wholePlaceInfo = placeCountry + placeRegion + placeCity;
    $$("placeInfo").define("template", wholePlaceInfo);
    $$("placeInfo").refresh();

    var geoInfoSunrise = "<div class=\"alert alert-success\">Sunrise: <b>" + weatherData.astronomy.sunrise + "</b></div>";
    var geoInfoSunset = "<div class=\"alert alert-success\">Sunset: <b>" + weatherData.astronomy.sunset + "</b></div>";
    var geoInfoMood = "<div class=\"alert alert-success\">Mood: <b>" + weatherData.item.condition.text + "</b></div>";
    var wholeGeoInfo = geoInfoSunrise + geoInfoSunset + geoInfoMood;
    $$("geoInfo").define("template", wholeGeoInfo);
    $$("geoInfo").refresh();
    
    var visibility = "<div class=\"alert alert-warning\">Visibility: <b>" + weatherData.atmosphere.visibility + " km</b></div>";
    var humidity = "<div class=\"alert alert-warning\">Humidity: <b>" + weatherData.atmosphere.humidity + " %</b></div>";
    var windSpeedMS = (weatherData.wind.speed * 1000 / 3600).toFixed(1);
    var windDirectionClass = getClassForWindDirection(weatherData);
    var windDirectionImageName = "arrow";
    var windDirectionImageTemplate = '<img src="images/' + windDirectionImageName + '.png" class="' + windDirectionClass + '"/>';
    var wind = "<div class=\"alert alert-warning\">Wind: <b>" + windSpeedMS + " m/s</b>   " + windDirectionImageTemplate + "</div>";
    var wholeMeteoInfo = visibility + humidity + wind;
    $$("meteoInfo").define("template", wholeMeteoInfo);
    $$("meteoInfo").refresh();

    var cityPhotoTemplate = '<img src="images/' + cityName + '.jpg"/>';
    $$("cityPhoto").define("template", cityPhotoTemplate);
    $$("cityPhoto").refresh();

    var labelLatTemplate = "<span class=\"label label-info\">Latitude: " + weatherData.item.lat + "</span>";
    $$("labelLat").define("label", labelLatTemplate);
    $$("labelLat").refresh();

    var labelLongTemplate = "<span class=\"label label-info\">Longitude: " + weatherData.item.long + "</span>";
    $$("labelLong").define("label", labelLongTemplate);
    $$("labelLong").refresh();
    
    setDataForGoogleMap(weatherData);

    var chartForecast = $$("chartForecast").$view;
    chartForecast.setAttribute("id", "chartForecastContainer");
    setChartData(weatherData.item.forecast, weatherData.location.city);
}

/**
 * Handle choosing item in side menu and get data from Yahoo server
 *
 * @param {string} cityName City name
 * @param {object} e Event
 * @param {object} node Element
 */
function getWeatherByCityWoeid(cityName, e, node) {
    webix.ajax().headers({
            "Content-Type": "application/json"
        }).post("http://localhost:4488/data", {"cityName": cityName},
        function(text, data, XmlHttpRequest) {
            var data = JSON.parse(text);
            weatherData = data.query.results.channel;
            console.log(weatherData);
            setDataToPageComponents(weatherData, cityName);
    });
}

/**
 * Set data and render chart
 *
 * @param {object} forecastData Data for chart
 * @param {string} city City name
 */
function setChartData(forecastData, city) {
	var categories = [];
	var highTemp = [];
	var lowTemp = [];

	forecastData.forEach(function(item, i, arr) {
	  	categories.push(item.day + " " + item.date);
	  	highTemp.push(+item.high);
	  	lowTemp.push(+item.low);
	});

	$('#chartForecastContainer').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '10 days weather forecast for ' + city
        },
        subtitle: {
            text: 'Source: Yahoo Weather'
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            tickInterval: 1,
            title: {
                text: 'Temperature °C'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} °C</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
	        {
	            name: 'Highest',
	            color: '#F00',
	            data: highTemp

	        }, {
	            name: 'Lowest',
	            color: '#00F',
	            data: lowTemp

	        }
        ]
    });
}

/**
 * Main app structure
 * 
 * @author Yauheni Svirydzenka <partagas@mail.ru>
 * @version 0.0.1
 * @copyright Yauheni Svirydzenka 2017
 */

/**
 * Create main layout
 */
webix.ready(function(){
	webix.ui({
		rows:[
			{
				view: "toolbar",
				id: "toolbar",
				elements: [
					{
						view: "icon", 
						icon: "bars",
						click: function() {
							if( $$("menu").config.hidden) {
								$$("menu").show();
							} else {
								$$("menu").hide();
							}
						}
					},
					{
						view: "label",
						label: "Weather forecast"
					},
					{
						view: "label",
						id: "labelLat",
						align: "right",
						width: 180,
						label: ""
					},
					{width: 10},
					{
						view: "label",
						id: "labelLong",
						align: "right",
						width: 180,
						label: ""
					},
					{width: 20},
					{
				        view: "button",
				        id: "resetPins",
				        type: "iconButton",
				        label: "Remove map markers",
				        icon: "flag",
				        width: 185,
				        click: function() {
				            $$("googleMap").clearAll();
			            }
			        },
					{
				        view: "button",
				        id: "exportToPNG",
				        type: "iconButton",
				        label: "Export to PNG",
				        icon: "image",
				        width: 140,
				        click: function() {
				            webix.toPNG($$("infoContainer"), "current_weather.png");
			            }
			        }

				]
			},
			{
				view: "layout",
			    cols:[
	                {
	                	template: "<img src=\"images/snow.jpg\"/>",
	                	css:"underMenu",
		                width: 200
		            },
	                {
	                	rows:[
	                		{
	                			gravity: 3,
	                			minHeight: 250,
	                			cols:[
			    					{
			                			view: "layout",
			                			id: "infoContainer",
			                			minWidth: 300,
			                			gravity: 3,
			                			rows:[
			                				{
					                			view: "layout",
					                			id: "meteoInfoContainer",
					                			gravity: 1,
					                			cols:[
							                		{
					                					id: "meteoInfo",
					                					gravity: 1,
					                					template: "<div class=\"alert alert-warning\">Visibility: </div><div class=\"alert alert-warning\">Humidity: </div><div class=\"alert alert-warning\">Wind: </div>",
					                					css:"underMenu",
					                					borderless: true
					                				},
							                		{
					                					id: "geoInfo",
					                					gravity: 1,
					                					template: "<div class=\"alert alert-success\">Sunrise: </div><div class=\"alert alert-success\">Sunset: </div><div class=\"alert alert-danger\">Mood:</div>",
					                					css:"underMenu",
					                					borderless: true
					                				}
					                			]	
					                		},
					                		{
					                			view: "layout",
					                			id: "cityInfoContainer",
					                			gravity: 2,
					                			cols:[
					                				{
							                			id: "placeInfo",
							                			template: "<div class=\"alert alert-info\">Place info: </div>",
							                			gravity: 1,
							                			css:"underMenu",
							                			borderless: true
							                		},
					                				{
					                					id: "cityPhoto",
					                					gravity: 2,
					                					template: "<img src=\"images/placeimg_arch.jpg\"/>",
					                					css:"underMenu",
					                					borderless: true
					                				},
					                				{width: 5, css:"underMenu"}
					                			]	
					                		},
					                		{height: 1}
			                			]
			                		},
			                		{view:"resizer"},
			                		{
										key: "AIzaSyAi0oVNVO-e603aUY8SILdD4v9bVBkmiTg",
							    		view: "google-map",
							    		id: "googleMap",
							    		gravity: 2,
							    		minWidth: 200,
										zoom: 7,
										center: [53.9, 27.5667]
			                		}
			                	]
	                		},
	                		{view:"resizer"},
	                		{
	                			gravity: 2,
	                			view: "layout",
	                			id: "chartForecastContainer",
	                			minHeight: 150,
			    				cols:[
			                		{
			                			id: "chartForecast",
			                			template: "",
			                			css:"underMenu"
			                		}
			    				]
	                		}
	                	]
	                }
	            ]
			}
		]
	});

	webix.ui({
		view: "sidemenu",
		id: "menu",
		width: 200,
		position: "left",
		state: function(state){
			var toolbarHeight = $$("toolbar").$height;
			state.top = toolbarHeight;
			state.height -= toolbarHeight;
		},
		css: "my_menu",
		body:{

			view: "list",
			borderless: true,
			select: true,
			type: {
				height: 40
			},
			on: {
			    "onItemClick": getWeatherByCityWoeid
			},	
			template: "<span class='webix_icon fa-#icon#'></span> #value#",
			data: citiesData
		}
	}).show();
});

//# sourceMappingURL=bundle.js.map
