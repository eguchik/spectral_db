var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('db.sqlite3');

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    db.run(
        'delete from spectra where id=?', id
    );
    db.run(
        'delete from device_settings where id=?', id
    );
    db.run(
        'delete from conditions where id=?', id
    );

    res.redirect('/');
})


module.exports = router;