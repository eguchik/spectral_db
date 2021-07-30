var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/:csv_file', (req, res) => {
    
  file_path= path.resolve(__dirname, '..') + '/static/' + req.params.csv_file;
  res.download(file_path);

})

module.exports = router;