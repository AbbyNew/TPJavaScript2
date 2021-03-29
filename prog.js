// bouton à cliquer pour lancer la requete
const boutonAskWeather = document.getElementById('ask-weather');

// texte qui donne le resultat de la requete
let weatherResult = document.getElementById("weather-result");


// fonction d'affichage du résultat, appelée par la requete quand elle change de statut 
function affichResult(ResString) {
    weatherResult.innerText=ResString ; 
} ; 

// fonction de requete AJAX
const askWeather = function (actualStatus) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      var response = JSON.parse(this.responseText);
      console.log(response.current_condition.condition);
      affichResult(response.current_condition.condition) ; 
    }
    
    //if (actualStatus != this.status) {
    //    alert("Dans la fonction" + this.status + " act sts: " + actualStatus);
    //    actualStatus = this.status;
    //}
        //console.log(this.status) ;
  };
  request.open("GET", "https://www.prevision-meteo.ch/services/json/paris");
  request.send();
};

// Action sur le bouton, qui  appelle la fonction de requete AJAX
boutonAskWeather.addEventListener("click", function () {
  var actualStatus = 0;
  askWeather(actualStatus);
});


