console.log('Funciona requests');
/*var request = new XMLHttpRequest ();

request.open("GET", "../images/plane.jpg");
request.send(null);
console.log('request', request);
request.onload = function(){
	//console.log(this.responseText);
	var img=document.getElementById('dropzone');
	img.innerHTML = this.response;
};
var img=document.getElementById('dropzone');
//img.src = "../images/plane.jpg";*/
//var fs = require('fs');
fs.readdir('../public/images/', (err, files) =>{
  files.forEach(file =>{
      console.log(file);
  })
})

