const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongo = require('mongodb').MongoClient;

var db;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) throw err;
        res.render('index.ejs', {quotes: result});
    })
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);
        
        console.log('saved to database');
        res.redirect('/');
    });
});


mongo.connect('mongodb://quote-app:Quote-App@ds157278.mlab.com:57278/yetis_first_db', (err, database) => {
    if(err){throw err}
    db = database;

    app.listen(8080, function() {
    console.log('listening on 8080');
    });
})