/*
Params = openweather API Object
*/
function WeatherData(params){
		this.cityName = params.name;
		this.kelvin = params.main.temp;
		this.weather = params.weather[0].main;
		this.getCelcius = function(){
			var celcius = Math.round(this.kelvin - 273.15);
			return celcius += "°C";
		}
		this.getFarenheit = function(){
			var farenheit = Math.round(9 * (this.kelvin - 273.15) / 5 + 32);
			return farenheit += "°F";			
		}

	}

//Global weather object for use in the program

var weatherObject;

$(document).ready(function(){
	if (navigator.geolocation){
  		navigator.geolocation.getCurrentPosition(function(position) {
	  	latitude = position.coords.latitude;
		longitude = position.coords.longitude;
	    getWeatherData(latitude,longitude);
	    var responseData = `<h2>${weatherObject.cityName}</h2> <h2 id = "degrees" >${weatherObject.getCelcius()}</h2>`;
		$("#data").append(responseData);
		$("#data h2").addClass("text-center text-white");
		viewWeather(weatherObject.weather);
	  }, errorHandler);
	}

	

});

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

function getWeatherData(lat, lon){
	var apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=8c483ac0ba0e00a23f343af80fbc493a`;
	$.getJSON(apiURL, function (response){
		weatherObject = new WeatherData(response);
	});
}
//Function for getting render the icon based on the weather
function viewWeather(weatherConditions){
	$("#data").append("<h1><i></i></h1>");
	var icon;
	switch(weatherConditions)
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