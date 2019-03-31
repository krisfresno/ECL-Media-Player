var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  //var files = fs.readdirSync('/Cosas/Proyectos/ECL-Media-Player/media/public/images');
  //console.log('files', files);
  res.render('index', { title: 'Express' });
});

module.exports = router;
