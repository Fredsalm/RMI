(function main(){

	$('#liste-commande').each(function(){
		var $tableau = $('#tableau');

		$.get('bdd.json', {}, function(data){
            

			//Création du tableau
			for(var i= 0; i<data.commandes.length; i++){
				var html = '',
					cmd = data.commandes[i],
					step = cmd.step,
					urgency = "",
					stbl = cmd.sortable,
					urgtry = "";


				if(cmd.urgency[0].selected == "selected"){
					urgency = "urgency"; // Condition Urgence. 
				};

				if(cmd.urgency[1].selected == "selected" && cmd.try[0].selected == "selected"){
					urgtry = "try"; // Condition essai. 
				}

				html += '<td>'+cmd.date+'</td>';
				html += '<td>'+cmd.cmdnumb+'</td>';
				html += '<td>'+cmd.accnumb+'</td>';
				html += '<td>'+cmd.clientname+'</td>';
				
				html += '<td sorttable_customkey="'+stbl+'">';
				for (var j = 0; j < step.length; j++) {
					html += '<div class="step ' + (step[j] ? 'ok' : 'wait') + '"></div>'; //Condition Couleurs Puces
				}
				html += '</td>';
				html += '<td><a href="' + $tableau.data('url') + '?c='+cmd.cmdnumb+'">Modifier</a></td>';

				$('tbody', $tableau).append('<tr class="' + cmd.state + " " + urgency + " " + urgtry + '">' + html + '</tr>')
				//Lignes Tableau


			};
        }, 'json');

		//Filtres Boutons services
		$('.filtre button').on('click', function(){
			var $b = $(this),
				filter = $b.data('filter');

			//Ajout des classes de filtre/tri
			if(!$b.hasClass('active')){

				$('.filtre .active').add($b).toggleClass('active');

				$('tbody tr.hide', $tableau).removeClass('hide');
				
				if(filter != '*')
					$('tbody tr:not(.'+filter+')').addClass('hide');					

			};
		});
	});	

	$('#modif-commande').each(function(){

		var oParametre = {};

		//Récupération du numéro de commande dans l'url
		if (window.location.search.length > 1) {
		  for (var aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
		     aItKey = aCouples[nKeyId].split("=");
		     oParametre[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
		    };
		};

		// Render Mustache
		$.get('bdd.json', {}, function(data){
			console.log(oParametre)
			for(var i=0; i<data.commandes.length; i++){
				if(data.commandes[i].cmdnumb == oParametre.c ){
					$('.tpl').html(Mustache.render($('.tpl').html(), {test : data.commandes[i]}))
				}
			}
		}, 'json');
    });
})();