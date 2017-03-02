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
