// index.js
// where your node app starts

// for env variables

require('dotenv').config()
// init project
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", (req, res) => {

  return res.json({
    unix: Date.now(),
    utc: new Date().toUTCString()
  })

})

app.get("/api/:date", (req, res) => {
  if (isNaN(req.params.date)) {

    var date = new Date(req.params.date)

  } else {

    var date = new Date(Number(req.params.date))

  }
  if (date == 'Invalid Date') return res.json({ error: 'Invalid Date' })
  console.log(date, req.params.date)
  const utc = date.toUTCString()
  const unix = Date.parse(utc)
  return res.json({ unix, utc })
})
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

console.log(process.env.myname)

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
