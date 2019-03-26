console.log('Funcionass');
var p = document.getElementById('mouse-style');
p.addEventListener('mouseover',  function(){
	this.style.backgroundColor = 'red';
	this.style.color = 'black';
	this.style.border = '3px outste black'

})
p.addEventListener('mouseout',  function(){
	this.style.backgroundColor = 'white';
	this.style.color = 'black';
	//this.style.border = '3px outste black'
})



