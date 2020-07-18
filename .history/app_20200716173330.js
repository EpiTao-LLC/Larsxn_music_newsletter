// jshint eversion:6

const express = require("express");  //npm install express
const bodyParser = require("body-parser");  //npm install body-parser
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true})); //3 options - urlencoded, text and ?
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
    // console.log("connected to page");
});

app.post("/", function(req, res) {
    console.log("in post");
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

    console.log(jsonData);

});

app.listen(5500, function () {
    console.log("Server started on port 5500");
});

// API Key:  b090c2b7a6f022920caec26f231d0757-us10
// List ID:  24907a104a

{
    "name": "Freddie's Favorite Hats",
    "contact": {
      "company": "Mailchimp",
      "address1": "675 Ponce De Leon Ave NE",
      "address2": "Suite 5000",
      "city": "Atlanta",
      "state": "GA",
      "zip": "30308",
      "country": "US",
      "phone": ""
    },
    "permission_reminder": "You're receiving this email because you signed up for updates about Freddie's newest hats.",
    "campaign_defaults": {
      "from_name": "Freddie",
      "from_email": "freddie@freddiehats.com",
      "subject": "",
      "language": "en"
    },
    "email_type_option": true
  }