var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './static')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  
var upload = multer({ storage: storage })


router.get('/', (req, res) => {
  res.render('up');
})

router.post('/',
  upload.single('file'), (req, res) => {
    // single('file')のfileはform要素のname属性と一致

    // req.file.pathでmulterが作成したファイルのパスを取得可能
    console.log(req.file.path, req.file.originalname);
    res.end("upload!");
})


module.exports = router;


