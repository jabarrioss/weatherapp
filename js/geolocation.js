$(document).ready(function(){
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

		alert(errorMessage);
	}

	$("#degrees").click(function(){
		if ($(this).value.indexOf("C") !== -1) {
			
		}
	})
});

function getWeatherData(lat, lon){
	var apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=8c483ac0ba0e00a23f343af80fbc493a`;
	$.getJSON(apiURL, function (response){
		var cityName = response.name;
		var celcius = Math.round(response.main.temp - 273.15);
		var farenheit = Math.round(9*(response.main.temp-273.15)/5+32);
		var responseData = `<h2>${cityName}</h2> <h2 id = "degrees" >${celcius}°C</h2>`;
		$("#data").append(responseData);
		$("#data h2").addClass("text-center text-white");
		viewWeather(response.weather[0].main);
	});
}

function viewWeather(weather){
	$("#data").append("<h1><i></i></h1>");
	var icon;
	switch(weather)
	{
		case "Clear":
			icon = "fas fa-sun";
		break;

		case "Rain":
		case "Clouds":
		case "Drizzle":
			icon = "fas fa-cloud";
		break;

		case "Thunderstorm":
			icon = "fas fa-bolt";
		break;

		case "Snow":
			icon = "fas fa-snowflake";
		break;

		default:
			icon = "text-danger fas fa-frown";
		break;
	}

	$("#data h1 i").addClass(icon);
	
}