const express = require("express");
const https = require("https");
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.listen("3002",function(){
    console.log("server is up and running");
})



