const express = require("express");
const https = require("https");
const app = express();
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

var CityName = "";
var temp = 0.0;
var TempFeelsLike = 0.0;
var MinTemp = 0.0;
var MaxTemp = 0.0;
var Pressure = 0;
var Humidity = 0;
var CloudCondition = "";
var WeatherId = 0;
var IconUrl = "";

    if (WeatherId >= 700 || WeatherId < 800){
          IconUrl = "fas fa-cloud-rain fa-3x";
        console.log("yes");
    }
   else{
       console.log("error id");
   }


app.get("/",function(req,res){
    res.render("weather",{CityName: CityName});
})
app.post("/",function(req,res){
  var city = req.body.CityName;
  console.log(city);
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=8045b99916c2e151cb2114bdf1d26663";
   https.get(url,function(response){
       response.on("data",function(data){
           const weatherInfo = JSON.parse(data);
           CityName = req.body.CityName;
           temp = weatherInfo.main.temp;
           TempFeelsLike = weatherInfo.main.feels_like;
           MinTemp = weatherInfo.main.temp_min;
           MaxTemp = weatherInfo.main.temp_max;
           Pressure = weatherInfo.main.pressure;
           Humidity = weatherInfo.main.humidity;
           CloudCondition = weatherInfo.weather[0].description;
           WeatherId = weatherInfo.weather[0].id;
           console.log(WeatherId);
           console.log(CityName);
           console.log(temp);
           res.render("weather",{CityName: CityName ,
             Temp: temp,
             TempFeelsLike: TempFeelsLike,
             MinTemp: MinTemp,
             MaxTemp: MaxTemp,
             Pressure: Pressure,
             Humidity: Humidity,
             Cloud: CloudCondition,
             IconUrl: IconUrl
            
            });

       })
   })
   
})

app.listen("3003",function(){
    console.log("server is up and running");
})



