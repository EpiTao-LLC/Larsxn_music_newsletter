// jshint eversion:6

const express = require("express");  //npm install express
const bodyParser = require("body-parser");  //npm install body-parser
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true})); //3 options - urlencoded, text and ?



app.listen(3000, function () {
    console.log("Server started on port 3000");
});