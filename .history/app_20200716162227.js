// jshint eversion:6

const express = require("express");  //npm install express
const bodyParser = require("body-parser");  //npm install body-parser
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true})); //3 options - urlencoded, text and ?
app.use(express.static("public"));

app.get("/signup", function(req, res){
    res.sendFile(__dirname + "/signup.html");
    // console.log("connected to page");
});

app.post("/", function(req, res) {
    console.log("in post");
    var firstName = rec.body.firstName;
    var lastName = rec.body.lastName;
    var email = rec.body.email;
    console.log(firstName + " " + lastName + " " + email);
    // var num1 = Number(req.body.n1);
    // var num2 = Number(req.body.n2);

    // var result = num1 + num2;
    // res.send("The result is " + result);
});

app.listen(5500, function () {
    console.log("Server started on port 5500");
});