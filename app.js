const express = require("express");
const https = require("https");
const app = express();
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.get("/",function(req,res){
    res.render("weather");
})
app.post("/",function(req,res){
  var city = req.body.CityName;
  console.log(city);
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=8045b99916c2e151cb2114bdf1d26663";
   https.get(url,function(response){
       response.on("data",function(data){
           const weatherInfo = JSON.parse(data);
           console.log(weatherInfo);
           console.log(req.body.CityName)
       })
   })
})

app.listen("3003",function(){
    console.log("server is up and running");
})



