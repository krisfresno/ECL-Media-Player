var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
	
	const lista = [];
	var dir = "./public/images/";
	fs.readdirSync(dir).forEach(file =>{
		lista.push(file);
	});
  	res.render('index', { 
  		list : JSON.stringify(lista),
  	});
});

module.exports = router;
