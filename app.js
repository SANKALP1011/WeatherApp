/* Express.js installed and required -: */
const express = require("express");
/* Https installed and required -: */
const https = require("https");
/* App.js using express.js -: */
const app = express();
/* Ejs installed and used -: */
const ejs = require("ejs");
/* Setting ejs as view engine -: */
app.set("view engine", "ejs");
/* Using express as body parsing -: */
app.use(express.urlencoded({ extended: true }));
/* Linking css file to the server -: */
app.use(express.static(__dirname + "/public"));

/* Variables declared to hold the data from the api -: */
var CityName = "";
var Temp = 0.0;
var TempFeelsLike = 0.0;
var MinTemp = 0.0;
var MaxTemp = 0.0;
var Pressure = 0;
var Humidity = 0;
var CloudCondition = "";
var WeatherId = 0;
var IconUrl = "";



/* Get used to send the file to server -: */
app.get("/", function (req, res) {
  res.render("weather", {
    CityName: CityName,
    Temp: Temp,
    TempFeelsLike: TempFeelsLike,
    MinTemp: MinTemp,
    MaxTemp: MaxTemp,
    Pressure: Pressure,
    Humidity: Humidity,
    Cloud: CloudCondition,
    IconUrl: IconUrl
  });
});

/* Post used to post the data on server and handle api functionality -: */
app.post("/", function (req, res) {
  var city = req.body.CityName;
  console.log(city);
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=8045b99916c2e151cb2114bdf1d26663";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherInfo = JSON.parse(data);
      CityName = req.body.CityName;
      Temp = weatherInfo.main.temp;
      TempFeelsLike = weatherInfo.main.feels_like;
      MinTemp = weatherInfo.main.temp_min;
      MaxTemp = weatherInfo.main.temp_max;
      Pressure = weatherInfo.main.pressure;
      Humidity = weatherInfo.main.humidity;
      CloudCondition = weatherInfo.weather[0].description;
      WeatherId = weatherInfo.weather[0].id;
      console.log(weatherInfo);
      console.log(WeatherId);
      console.log(CityName);
      console.log(Temp);
      if (WeatherId >= 200 && WeatherId < 300) {
        IconUrl = "fas fa-cloud-showers-heavy fa-3x";
      } else if (WeatherId >= 300 && WeatherId < 400) {
        IconUrl = "fas fa-cloud-rain fa-3x";
      } else if (WeatherId >= 500 && WeatherId < 600) {
        IconUrl = "fas fa-cloud-rain fa-3x";
      } else if (WeatherId >= 600 && WeatherId < 700) {
        IconUrl = "far fa-snowflake fa-3x";
      } else if (WeatherId >= 700 && WeatherId < 800) {
        if (WeatherId === 701) {
          IconUrl = "fas fa-water fa-3x";
        } else if (WeatherId === 711) {
          IconUrl = "fas fa-smog fa-3x";
        } else if (WeatherId === 721) {
          IconUrl = "fas fa-smog fa-3x";
        } else if (WeatherId === 731) {
          IconUrl = "fas fa-wind fa-3x";
        } else {
          IconUrl = "far fa-sun fa-3x";
        }
      } else if (WeatherId === 800) {
        IconUrl = "far fa-sun fa-3x";
        console.log("yes");
      } else if (WeatherId > 800 || WeatherId < 900) {
        IconUrl = "fas fa-cloud-sun fa-3x";
      } else {
        console.log("error");
      }
      res.render("weather", {
        CityName: CityName,
        Temp: Temp,
        TempFeelsLike: TempFeelsLike,
        MinTemp: MinTemp,
        MaxTemp: MaxTemp,
        Pressure: Pressure,
        Humidity: Humidity,
        Cloud: CloudCondition,
        IconUrl: IconUrl
      });
      res.send();
    });
  });
});

/* Server -: */
app.listen(process.env.PORT || 3005, function () {
  console.log("server is up and running");
});
