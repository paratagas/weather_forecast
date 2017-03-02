# Weather forecast

### Weather forecast service for Belarus cities created using Node.js and Webix

![Weather forecast](http://i.imgur.com/SoBltSK.png)

---

### Tech
Weather forecast uses several open source projects to work properly:

* [Node.js] - JavaScript runtime built on Chrome's V8 JavaScript engine
* [Webix] - Cross platform and cross browser UI library

---

### API
Weather forecast uses several APIs to work properly:

* [YahooWeather] - Yahoo weather API to receive actual data
* [GoogleMaps] - Google maps service to point the chosen city
* [Highcharts] - Highcharts to create charts

---

### Requirements

* [Node.js](https://nodejs.org/) v4.4+

---

### Installation

* Download and extract the [latest version of Weather forecast](https://github.com/paratagas/weather_forecast)
* Install the dependencies and devDependencies:
```sh
$ cd weather_forecast
$ npm install
```

* Download the [latest standard version of Webix](http://webix.com/download/).
* Extract "codebase" folder from downloaded Webix archive to the root folder of your project
* **Run Node.js server:**
```sh
$ npm start
```

After that your web application is available on:

```sh
http://localhost:4488
```

---

### Development


* To create your bundle.js (if source code is modified) run:
```sh
$ gulp bundle
```

* To watch your source code changing and restarting server in development run:
```sh
$ npm run nodemon
$ gulp watch
```

---

### Adding/Removing cities

You can get City woeid here: [GetWoeid]

* To add City to Cities Id list watch:
```sh
weather_forecast/lib/cityId/cities.js
```

* To add City to sidemenu watch:
```sh
weather_forecast/js/cities.js
```

---

### License

GNU GPLV3

 [Node.js]: <https://nodejs.org/>
 [Webix]: <http://webix.com/>
 [YahooWeather]: <https://developer.yahoo.com/weather/>
 [GoogleMaps]: <https://www.google.ru/maps>
 [Highcharts]: <http://www.highcharts.com/>
 [GetWoeid]: <http://woeid.rosselliot.co.nz/>
 