(function main(){

	$('#liste-commande').each(function(){
		var $tableau = $('#tableau');

		$.get('bdd.json', {}, function(data){
                console.log("test")
			for(var i= 0; i<data.commandes.length; i++){
				var html = '',
					cmd = data.commandes[i],
					step = cmd.step;

				html += '<td class="ref">'+cmd.date+'</td>';
				html += '<td class="ref">'+cmd.cmdnumb+'</td>';
				html += '<td class="ref">'+cmd.accnumb+'</td>';
				html += '<td class="ref">'+cmd.clientname+'</td>';
				
				html += '<td class="chk">';
				for (var j = 0; j < step.length; j++) {
					html += '<div class="step ' + (step[j] ? 'ok' : 'wait') + '"></div>';
				}
				html += '</td>';
				html += '<td><a href="' + $tableau.data('url') + '?c='+cmd.cmdnumb+'">Modifier</a></td>';

				$('tbody', $tableau).append('<tr class="'+cmd.state+'">' + html + '</tr>')
			};
		}, 'json');

		$('.filtre button').on('click', function(){
			var $b = $(this);
			var filter = $b.data('filter');

			if(!$b.hasClass('active')){

				$('.filtre .active').add($b).toggleClass('active');

				$('tr.hide', $tableau).removeClass('hide');
				
				if(filter != '*')
					$('tr:not(.'+filter+')').addClass('hide');					

			};
		});
	});	

	$('#modif-commande').each(function(){

		var oParametre = {};

		if (window.location.search.length > 1) {
		  for (var aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
		     aItKey = aCouples[nKeyId].split("=");
		     oParametre[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
		    };
		};

		$.get('bdd.json', {}, function(data){
			for(var i=0; i<data.commandes.length; i++){
				if(data.commandes[i].cmdnumb == oParametre.c ){
					$('.tpl').html(Mustache.render($('.tpl').html(), {test : data.commandes[i]}))
				}
			}
		}, 'json');
    });
})();