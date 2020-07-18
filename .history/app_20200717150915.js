// jshint eversion:6

const express = require("express");  //npm install express
const bodyParser = require("body-parser");  //npm install body-parser
const request = require("request");
const https = require("https"); //NodeJS https api functionality

const app = express();

app.use(bodyParser.urlencoded({extended: true})); //3 options - urlencoded, text and ?
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
    // console.log("connected to page");
});

app.post("/", function(req, res) {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members: [
            {
              email_address:  email,
              status: "subscribed",
              merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
              }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/24907a104a";
    const options = {
        method: 'POST',
        auth: 'anyname: b090c2b7a6f022920caec26f231d0757-us10'
    };

    const request = https.request(url, options, function(response) {
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    });

    request.write(jsonData);
    request.end();

});

app.listen(5500, function () {
    console.log("Server started on port 5500");
});

// API Key:  b090c2b7a6f022920caec26f231d0757-us10
// List ID:  24907a104a
