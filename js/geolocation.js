window.onload = getMylocation;
function getMylocation(){
	var climas;
if (navigator.geolocation){
  	navigator.geolocation.getCurrentPosition(function(position) {
  	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
    document.getElementById('data').innerHTML="latitude: "+ position.coords.latitude + "<br>longitude: " + position.coords.longitude;
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    data.appendChild(img);
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