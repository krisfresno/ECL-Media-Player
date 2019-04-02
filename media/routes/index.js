var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
	const casa = ["photo1.jpg", "photo2.jpg"];
	const casa1 = JSON.stringify(casa);
	const lista = [];
	//var dir = '../public/images'+__dirname+'';
	//var dir = "C:/Cosas/Proyectos/ECL-Media-Player/media/routes";
	var dir = "./public/images/";
	//console.log(dir);
	fs.readdirSync(dir).forEach(file =>{
		//console.log(file);
		lista.push(file);
	});
	console.log(lista);
  	res.render('index', { 
  		list : JSON.stringify(lista),
  	});
});

module.exports = router;
