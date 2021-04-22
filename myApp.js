var bodyParser = require('body-parser');
var express = require('express');
var app = express();
let data = {"message": "Hello json"};

//Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));

//Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//Start a Working Express Server
app.use('/public', express.static(__dirname + "/public"));

//Get Query Parameter Input from the Client
app.get('/name', (req, res) => {
  let {first: firstName, last: lastName} = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

//Get Data from POST Requests
app.post("/name", function(req, res) {
  let {first: firstName, last: lastName} = req.body;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

//Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => {
  let { word } = req.params;
  res.json({
    echo: word
  });
});

//Chain Middleware to Create a Time Server
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
});

//Serve JSON on a Specific RoutePassed
app.get('/json', (req,res) => {
  if(process.env.MESSAGE_STYLE==="uppercase"){
    data.message = data.message.toUpperCase();}
  return res.json(data); 
});

//Serve Static Assets
app.get("/", (req, res) => {
  absolutePath = __dirname + "/views/index.html"
  res.sendFile(absolutePath);
});

 module.exports = app;
