// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get("/api/:date?", function (req, res) {
  if(!req.params.date){
    res.json({"unix": new Date().getTime(),"utc":new Date().toUTCString()
  })}
  if(req.params.date.match(/\d{5,}/)){
    let y = new Date(+req.params.date);//parses it to a number
    res.json({"unix": y.getTime(),"utc":y.toUTCString()})
  }
  let d = new Date(req.params.date);
   if(d.toUTCString() === "Invalid Date")
   {res.json({"error":d.toUTCString()})}
   res.json({"unix": d.getTime(),"utc":d.toUTCString()})
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

