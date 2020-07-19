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

    app.post("/failure", function(req, res){
        res.redirect("/");
    });

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/24907a104a";
    const options = {
        method: "POST",
        auth: "anyname:e94587f2f2bc16b8f50f5bf48d78a9b2-us10"
    };

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {  //nodejs reponse code - see doc
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    });

    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 5500, function () {  //process.env.PORT is for heroku  5500 is local port
    console.log("Server started on port 5500");
});


// List ID:  24907a104a
