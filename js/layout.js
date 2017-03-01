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
	                			minHeight: 300,
	                			cols:[
			    					{
			                			view: "layout",
			                			id: "infoContainer",
			                			minWidth: 500,
			                			gravity: 1,
			                			rows:[
			                				{
					                			view: "layout",
					                			id: "meteoInfoContainer",
					                			gravity: 2,
					                			cols:[
							                		{
					                					id: "meteoInfo",
					                					gravity: 1,
					                					template: "<div class=\"alert alert-warning\">Visibility: </div><div class=\"alert alert-warning\">Humidity: </div><div class=\"alert alert-warning\">Wind speed: </div>",
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
					                			gravity: 3,
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
							    		gravity: 1,
							    		minWidth: 500,
	                					maxWidth: 600,
										zoom: 7,
										center: [53.9, 27.5667]
			                		}
			                	]
	                		},
	                		{view:"resizer"},
	                		{
	                			view: "layout",
	                			id: "chartForecastContainer",
	                			height: 320,
	                			minHeight: 300,
	                			maxHeight: 320,
			    				cols:[
			                		{
			                			id: "chartForecast",
			                			template: "",
			                			css:"underMenu",
			                			height: 320,
			                			minHeight: 300,
			                			maxHeight: 320,
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
