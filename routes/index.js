var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('db.sqlite3');

router.get('/', (req, res) => {
  db.serialize(() => {
    db.all('select * from spectra', (err, data) => {
      console.log(data);
      res.render('index', {data: data});
    })
  })
})

module.exports = router;