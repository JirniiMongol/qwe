var connString = 'postgres://aokfxrxipljadk:H1sGlA1o88iWCfZFvaLZeeJ1Sk@ec2-23-21-238-76.compute-1.amazonaws.com:5432/d781h39ucu0rs2'

var pg = require('pg');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.get('/', function (req, res) {
    res.sendfile('index.html');

/*    pg.connect(connString, function (err, client, done) {
        if (err) res.send("Could not connect to DB: " + err);
        client.query('SELECT * FROM MyTable', function (err, result) {
            done();
            if (err) return res.send(err);
            res.send(result.rows);
        });
    });*/
});

app.get('/auth', function (req, res) {

    var login = req.query.login;
    var pass = req.query.password;

    //res.end(login + ' ' + pass);

    pg.connect(connString, function (err, client, done) {
        if (err)
            res.send("Could not connect to DB: " + err);
        client.query('SELECT * FROM MyTable', function (err, result) {
            done();
            if (err)
                return res.send(err);
            res.send(result.rows);

        });
    });
});


app.listen(port, function (err) {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log('server is listening on  %d', port);
});
