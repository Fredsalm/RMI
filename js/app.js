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
		var chk = '<td class="chk"><input type="checkbox"></td>'
		var btn = '<td><button>Modifier</button></td>'
		$('#tableau').append('<tr><td class="ref">'+date+'</td><td class="ref">'+commande+'</td><td class="ref">'+cptclient+'</td><td class="ref">'+client+'</td>'+chk+chk+chk+chk+chk+chk+btn+'</td></tr>')
		
	}
		// $('#template').html(Mustache.render($('#template').html(), {test : data.commandes} ))
		// console.log("test");
	}, 'json');
})();