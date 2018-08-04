window.onload = getMylocation;
function getMylocation(){
	var climas;
if (navigator.geolocation){
  	navigator.geolocation.getCurrentPosition(function(position) {
  	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
    getWeatherData(latitude,longitude);	
  }, errorHandler);
}
	function errorHandler(error){
		var errorTypes = {
			0 : "Unknown Error",
			1 : "Permission denied by user",
			2 : "Position is not available",
			3 : "Request timed out"
		};

		var errorMessage = errorTypes[error.code];

		if(error.code == 0 || error.code == 2) {
			errorMessage = errorMessage + " " + error.message;
		}

		var message = document.getElementById("data");
		message.innerHTML = errorMessage;
	}
}

function getWeatherData(lat, lon){
	var apiURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=8c483ac0ba0e00a23f343af80fbc493a";
	$.getJSON(apiURL, function (response){
		console.log(response);
		var dataDiv = document.getElementById('data');
		dataDiv.innerHTML = response.name;
		dataDiv.innerHTML += response.weather[0].id;
	});
}