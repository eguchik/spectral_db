var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db.sqlite3');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './static')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
var upload = multer({ storage: storage })


router.get('/', (req, res) => {
  res.render('upload');
})

router.post('/',
  upload.single('csv_file'), (req, res) => {
    // single('file')のfileはform要素のname属性と一致
    const date = new Date();

    const sampleName = req.body.sample_name;
    const csvFile = req.file.originalname;
    const created_at = date.toLocaleString();

    const instrument = req.body.instrument;
    const wavelengthInterval = req.body.wavelength_interval;
    const slitWidth = req.body.slit_width;
    const scanSpeed = req.body.scan_speed;
    const opticalPathLength = req.body.optical_path_length;
    const settingRemarks = req.body.setting_remarks;

    const buffer = req.body.buffer;
    const temperature = req.body.temperature;
    const energy = req.body.energy;
    const peakWavelength = req.body.peak_wavelength;
    const conditionRemarks = req.body.condition_remarks;

    db.run(
      'insert into spectra (sample_name, csv_file, created_at) values (?, ?, ?)',
      sampleName, csvFile, created_at
    )

    db.run(
      'insert into device_settings (instrument, wavelength_interval, slit_width, scan_speed, optical_path_length, setting_remarks) values (?, ?, ?, ?, ?, ?)',
      instrument, wavelengthInterval, slitWidth, scanSpeed, opticalPathLength, settingRemarks
    )

    db.run(
      'insert into conditions (buffer, temperature, energy, peak_wavelength, condition_remarks) values (?, ?, ?, ?, ?)',
      buffer, temperature, energy, peakWavelength, conditionRemarks
    )

    res.redirect('/');
})

module.exports = router;

