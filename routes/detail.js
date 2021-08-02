var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db.sqlite3');
const fs = require("fs");
const path = require('path');



router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('select * from spectra natural join device_settings natural join conditions where id=?', id,
    (err, row) => {
      res.render('detail', {row:row});
  })
})


module.exports = router;