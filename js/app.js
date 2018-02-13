(function main(){
var date;
var commande;
var cptclient;
var client;

	$.get('bdd.json', {}, function(data){

		for(var i= 0; i<data.commandes.length; i++){
		date = data.commandes[i].date
		commande = data.commandes[i].numcommande
		cptclient = data.commandes[i].numcptclient
		client = data.commandes[i].nomclient
		var chk = '<td><input type="checkbox"></td>'
		var btn = '<td><button>Modifier</button></td>'
		$('#tasty').append("<tr><td>"+date+"</td><td>"+commande+"</td><td>"+cptclient+"</td><td>"+client+"</td>"+chk+chk+chk+chk+chk+chk+btn+"</td></tr>")
		
	}
		// $('#template').html(Mustache.render($('#template').html(), {test : data.commandes} ))
		// console.log("test");
	}, 'json');
})();