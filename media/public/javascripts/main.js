flag = false;
liste_photos = [];
actual_photo = "" ;

showImage = function(){
var h = "<p class='liste' style='color: #000;'><u><b>Photos disponibles</b></u></p>"
var request = new XMLHttpRequest ();
request.onload = function(){
var resp = this.responseText;
var liste = JSON.parse(resp);
liste_photos = liste;

for (i in liste.photos){
    h = h + "\n"+"<div><a onclick=show('"+liste.photos[i]+"')>"+liste.photos[i]+"</a></div>";
}
h = h + "\n"+"<div><p> </p></div>";

};
request.open("GET", "/images/liste_photos.json", true);
request.send(null);
flag = true;
var albumrequest = new XMLHttpRequest ();
albumrequest.onload = function(){
var resp = this.responseText;
var liste_album = JSON.parse(resp);
h+= "<p style='color: #000;'><u><b>albums disponibles</b></u></p>";
//var h = "";
for (var i=0;i<liste_album.albums.length;i++){
    h+= "\n"+'<div id="'+Object.keys(liste_album.albums[i])+'"><a onclick=showimages_album \
	('+JSON.stringify(liste_album.albums[i])+')>'+Object.keys(liste_album.albums[i])+'</a></div>';
}
h = h + "\n"+"<div><p> </p></div>";
noms_des_photos.innerHTML = h;

};
albumrequest.open("GET", "/images/liste_albums.json", true);
albumrequest.send(null);

}

show = function(name){
var image = document.getElementById("dropzone");
var titre = document.getElementById("titre")
titre.innerHTML = "<h2>"+name+"</h2>"
source = "/images/"+name;
image.src = source;
actual_photo = name;

}
showimages_album=function(names){
	names=JSON.parse(names);
	for ( j in names[Object.keys(names)]){
		var node=document.createElement('div');
		node.innerHTML="<a onclick=show('"+j+"')>"+j+"</a>";
		document.getElementById(Object.keys(names)).appendChild(node);
}

}
precedent = function(){
if (flag == true){
var index = liste_photos.photos.indexOf(actual_photo);
if (index != 0) {
    var image = document.getElementById("dropzone");
    name = liste_photos.photos[index-1];
    var titre = document.getElementById("titre")
    titre.innerHTML = "<h2>"+name+"</h2>"
    source = "/images/"+name;
    image.src = source;
    actual_photo = name;
}        
}      
}
next = function(){
    if (flag == true){
        var index = liste_photos.photos.indexOf(actual_photo);
        var size = liste_photos.photos.length;
        if (index < size-1) {
            var image = document.getElementById("dropzone");
            name = liste_photos.photos[index+1];
            var titre = document.getElementById("titre")
            titre.innerHTML = "<h2>"+name+"</h2>"
            source = "../images/"+name;
            image.src = source;
            actual_photo = name;  
        }                                       
    }
}

creer_album = function(){
    var txt;
    var titre = prompt("Titre de l'album", "");
    if (titre == null || titre == "") {
    } else{
    txt = "Vous avez créé l'album "+titre+"";
    console.log(titre);
    var request2 = new XMLHttpRequest ();
    request2.onload = function(){
        var resp = this.responseText;
        var albums = JSON.parse(resp);
        albums[titre] = [];
        //Manque la partie de POST pour modifier le JSON
        var myJSON = JSON.stringify(albums);
    }
    request2.open("GET", "/images/liste_albums.json", true);
    request2.send(null);
    return(titre)
    }
}

ajouter_photo_a_album = function(){
if (actual_photo != "") {
var album_req = new XMLHttpRequest()
album_req.onload = function(){
    var resp = this.responseText;
    var albums = JSON.parse(resp);
    var liste = "";
    for (i in albums.albums){
        var titulo = Object.keys(albums.albums[i]);
        liste = liste + "\n" + titulo;
    }
    var titre = prompt("Albums disponibles: "+"\n"+liste+"\n ", "");
    var flag = false;
    for (i in albums.albums){
        var titulo = Object.keys(albums.albums[i]);
        if (titre == titulo) {
            flag = true;
            id = i;
        }
    }
    if (flag == false & titre != "" & titre != null) { //Si l'album  n'existe pas, sortir
        alert("L'album n'existe pas !");
    } 
    if (flag == true) { //Ajouter la photo a l'album
        var ajouter = true;
        for (i in albums.albums[id][titre]){ // Verifier que la photo n'existe pas déjà sur l'album
            photo_in_album = albums.albums[id][titre][i];
            if (actual_photo == photo_in_album){ //La photo existe sur l'album
                ajouter = false;
            }
        }
        if (ajouter == false){ //Verifier si l'utilisatuer veut ajouter quand-même la photo
            var confirmer = confirm("La photo existe déjà sur l'album. Voulez vous l'ajouter quand-même ?");
            if (confirmer == true) { //On l'ajoute quand-même
                ajouter = true;
            }    
        }
        if (ajouter == true) { //Ajouter la photo
            albums.albums[id][titre].push(actual_photo);
            var JSON_file = JSON.stringify(albums);
            var envoyer = new XMLHttpRequest()
            envoyer.open("POST", "/newalbum", true);
            envoyer.setRequestHeader("Content-Type", "application/json");
            envoyer.send(JSON_file);
        }
    }
album_req.open("GET", "/images/liste_albums.json", true);
album_req.send(null);
}      
}

/*$(function(){
        $("#dialog").dialog({
            buttons: {
                "First": function(){
                    selected = 1;
                },
                texto: function(){
                    selected = 2;
                }
            }
        });                   
    });*/
    /*//console.log("Ha funcionado");
//console.log(albums);
var cont = "<select id='droplist' onchange='myFunction()'>"
var menu = document.getElementById("view-by");
//console.log(albums)
for (i in albums.albums){
var titulo = Object.keys(albums.albums[i]);
//console.log(Object.keys(albums.albums[i]));
//console.log(titulo[0]);
cont = cont + "\n"+"<option value='"+i+"'>"+titulo[0]+"</option>";
/*for (j in albums.albums[i]){
    //console.log('eh', albums.albums[i][j]);
}
//cont = cont + "\n"+"<option value='"+i+"'>"+albums.albums[i]
}
cont = cont + "\n"+"</select>";
//console.log(cont);
menu.innerHTML = cont;
var flag = true;

myFunction = function(){
var e = document.getElementById('droplist');
var selection = e.options[e.selectedIndex].value;
var titre = e.options[e.selectedIndex].text;
console.log('selection', selection);
console.log('titre', titre);
}           
selection = 0;
titre = "avions"
console.log('saliendo');
return [selection, titre];*/