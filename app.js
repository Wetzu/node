const express = require('express');
const app = express();
const mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'Wtk25',
  password: '9A_ns55g'
});

con.connect(function(err) {
  if(err) throw err;
  console.log("Connected");
})

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/access', function (req, res) {
  var id = req.query.code;
  res.send('Hello invitation number: ' + id);
});

app.get('/submit', function (req, res) {
  // var date = {
  //   reservationId = req.query.code,
  //   participation = req.query.participation,
  //   persons = req.query.persons,
  //   vegetarians = req.query.vegetarians
  // };

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});