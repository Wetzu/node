const express = require('express');
const path = require('path')
const fs = require('fs');
const ejs = require('ejs');
const https = require('https');
const app = express();
const mysql = require('mysql');

app.use(express.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('pages/index', {
    title: 'WTK Jubiläum'
  });
});

app.post('/access', processAccess);
app.post('/submit', processSubmit);

function processSubmit(req, res){
  var con = mysql.createConnection({
    host: 'localhost',
    port: 3000,
    user: 'wtk25',
    password: '9A_ns55g',
    database: "wtk25"
  });
    var code = req.body.invitationCode;
    var name = req.body.name;
    var participation = req.body.participation;
    var notes = req.body.notes;
    var coming = false;
    if(participation === 'true'){
      coming = true;
    }
    var log = name + " with " + "Invitation Nr " + code + " is ";
    var sql = "";
    if(coming){
      var persons = req.body.numberOfPersons;
      var vegetarians = req.body.numberOfVegetarians;
      log += "coming with " + persons + " Persons of which " + vegetarians + " are Vegetarians.";
      sql = "UPDATE jubabend SET name = '" + name +  "', persons = " + persons + ", vegetarians = " + vegetarians + ", notes = '" + notes + "', coming = 1 WHERE inviteCode = " + code + ";";
    }
    else{ 
      log += "not coming.";
      sql = "UPDATE jubabend SET name = '" + name +  "', notes = '" + notes + "', coming = 0 WHERE inviteCode = " + code + ";";
    }
    console.log(log);
    
    con.connect(function(err) {
      if (err) throw err;
      con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " records updated");
        con.end();
      })
    });
    res.render('pages/updated', {
      title: "WTK Jubiläum"
    });
};

function processAccess(req, res){
  var con = mysql.createConnection({
    host: 'localhost',
    port: 3000,
    user: 'wtk25',
    password: '9A_ns55g',
    database: "wtk25"
  });
  var code = req.body.invitationCode;
  var name = req.body.name;
  console.log(name + " wants to Access the Form with Code " + code);
  con.connect(function(err){
    if(err) throw err;
    var sql = "SELECT * FROM jubabend WHERE inviteCode = " + code + ";";
    con.query(sql, function(err, result){
      if(result[0] != null){
        res.render('pages/form', {
          name: name,
          code: code,
          title: 'WTK Jubiläum'
        });
        console.log("Access granted!");
      }
      else{
        res.render('pages/accessDenied', {
          title: "WTK Jubiläum"
        });
        console.log("Access Denied");
      }
    })
  })
};

module.exports = app;