var connString = 'postgres://wnqeqpyghmfrmc:Ph3wdJrPoZh4Wcv70q0EvKaC5Q@ec2-174-129-212-133.compute-1.amazonaws.com:5432/d4etrpot5alp12';

var pg = require('pg');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

app.get('/', function (req, res) {
    console.log('get /');
    res.sendfile('index.html');
});

app.get('/auth', function (req, res) {

    console.log('get /auth');
    var login = req.query.login.toString();
    var pass = req.query.password.toString();

    //res.send(login + ' ' + pass);

    pg.connect(connString, function (err, client, done) {
        if (err) res.send("Could not connect to DB: " + err);
        client.query('SELECT COUNT(login) FROM Accounts WHERE login = $1 AND password = $2', [login, pass],
            function (err, result) {
                done();
                if (err) return res.send(err);
                console.log(result.rows);
                if (result.rows[0].count == '1')
                    res.send('Success');
                else
                    res.send('Failed');
            });
    });
});


app.listen(port, function (err) {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log('server is listening on  %d', port);
});
