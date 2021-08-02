var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db.sqlite3');
const fs = require("fs");
const path = require('path');




router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.get('select * from spectra where id=?', id, (err, row) => {
        const file_path = path.resolve(__dirname, '..') + '/static/' + row.csv_file;
        fs.readFile(file_path, "utf-8", (err, txtData) => {
            if (err) throw err;

            let data = txtData.split('\r\n');
            let sampleName = data.shift().split(',');
            sampleName.shift(); // Wavelength (nm) の削除
            let nSample = sampleName.length;
            let nWavelength;

            spectra = [];
            for (let i = 0; i < nSample+1; i++) { // インデックスも含めるため nSample+1
                spectra[i] = [];
            }

            data.forEach((value) => { // インデックスも含めるため nSample+1
                for (let i = 0; i < nSample+1; i++) {
                    spectra[i].push(value.split(',')[i]);
                }
            })

            spectra.forEach((value) => {
                value.pop();
            })

            nWavelength = spectra[0].length;

            xdata = spectra.shift();
            console.log(spectra);

            res.render('plot', {
                xdata: xdata,
                spectra: spectra,
                sampleName: sampleName,
                nSample: nSample,
                nWavelength: nWavelength
            });
        })


    })


})
        


module.exports = router;