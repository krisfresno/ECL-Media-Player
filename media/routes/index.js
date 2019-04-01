var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
	const casa = ["photo1.jpg", "photo2.jpg"];
	const casa1 = JSON.stringify(casa);

  	res.render('index', { 
  		list : JSON.stringify(casa),
  	});
});

module.exports = router;
