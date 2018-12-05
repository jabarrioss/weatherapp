var weatherIcons = {
	"Clear" : "fas fa-sun",
	 "Rain" : "fas fa-cloud",
	 "Clouds" : "fas fa-cloud",
	 "Drizzle" : "fas fa-cloud",			
	 "Thunderstorm":"fas fa-bolt",
	 "Snow" : "fas fa-snowflake",
	"default" : "text-danger fas fa-frown"
};

$(document).ready(function(){
	
	function initialize(){
		if (navigator.geolocation){
  			navigator.geolocation.getCurrentPosition(function(position){
		  	latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			getWeatherData(latitude,longitude);
	  		}, errorHandler);
		}

	}

	var weatherObject;

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

	function getWeatherData(lat, lon){
		var apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=5d0331d48aeb29456aab442abfd15aee`;
		console.log(apiURL);
		$.getJSON(apiURL, function (response){
			weatherObject = new WeatherData(response);
			var responseData = `<h2>${weatherObject.cityName}</h2> <h2 id = "degrees" >${weatherObject.getCelcius()}</h2>`;
			$("#data").append(responseData);
			$("#data h2").addClass("text-center text-white");
			viewWeather(weatherObject.weather);
		});
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
	//Function for getting render the icon based on the weather
	function viewWeather(weatherConditions){
		$("#data").append("<h1><i></i></h1>");
		var icon = weatherIcons[weatherConditions];
		$("#data h1 i").addClass(icon);
		
	}

	$("#switch").click(function(){
		if($("#degrees").text().indexOf("C") == -1 ){
			$("#degrees").empty();
			$("#degrees").append(weatherObject.getCelcius());
		}else{
			$("#degrees").empty();
			$("#degrees").append(weatherObject.getFarenheit());
		}
	});
	initialize();
});