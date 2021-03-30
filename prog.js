// bouton à cliquer pour lancer la requete
const boutonAskWeather = document.getElementById('ask-weather');

// texte qui donne le resultat de la requete
let weatherResult = document.getElementById('weather-result');

// fonction permettant de savoir la taille de l'objet
Object.size = function(obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

// fonction d'affichage du résultat, appelée par la requete quand elle change de statut
function affichResult(ResString) {
	weatherResult.innerHTML = ResString;
}

// Affichage de l'objet ResObj - il faut le "parser"
function affichResults(ResObj) {
	globString = '';
	for (const [ key, value ] of Object.entries(ResObj)) {
		//console.log(`${key}: ${value}`) ;
		globString += `${key}`;
		// value: object or something else?
		var size = Object.size(value);
		if (size > 1) {
			globString += ' -> ' + size + ' elements \n'; 

			for (const [ key2, value2 ] of Object.entries(value)) {
				globString += '<li>' + `${key2}` + '<span>\t' +  `${value2}` + '</span></li>';
			}
		} else globString += `${value}` + '\n';

		affichResult(globString);
	}
}

// fonction de requete AJAX
const askWeather = function(actualStatus) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			var response = JSON.parse(this.responseText);
			//console.log(response.current_condition.condition);
			//affichResult(response.current_condition.condition) ;
			affichResults(response);
		}

		//if (actualStatus != this.status) {
		//    alert("Dans la fonction" + this.status + " act sts: " + actualStatus);
		//    actualStatus = this.status;
		//}
		//console.log(this.status) ;
	};
	request.open('GET', 'https://www.prevision-meteo.ch/services/json/paris');
	request.send();
};

// Action sur le bouton, qui appelle la fonction de requete AJAX
boutonAskWeather.addEventListener('click', function() {
	var actualStatus = 0;
	askWeather(actualStatus);
});
