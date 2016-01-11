$(document).ready(function() {

  var ID = 'cbefa5b57b550d80e3f3b0f770c7f305';
  var units = "imperial";
  var Ftemperature;
  var Ctemperature;
  
  //get city and state name;
$.get("http://ipinfo.io", function(area) {
  var city = area.city;
  var region = area.region;
      $('#area')
        .append(city)
        .append(", " + region);
}, "jsonp");
  
  
    if (navigator.geolocation) {   navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude

 var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon + '&units=' + units + "&APPID=" + ID;
       
    $.get(weatherAPI, function(API) {
       Ftemperature = API.main.temp;
      Ctemperature = ""+ parseFloat((Ftemperature - 32) * 5/9).toFixed(1) +"°C";
      Ftemperature = ""+ parseFloat(Ftemperature).toFixed(0) + "°F";
      var pic = API.weather[0].icon;  
      var description = API.weather[0].description;
      
     $('#temp').text(Ftemperature);     
     $('#description').append("<img src='http://openweathermap.org/img/w/" + pic + ".png'>");
      $('#description').append(" " + description);
      }, "jsonp"); 
   
    });
    }
 
  
//toggle F and C
  $("#button").on( "click", function() { 
  if (units === "imperial") {
  units = "metric";
  $('#temp').text(Ctemperature); 
} else {
  units = "imperial";
  $('#temp').text(Ftemperature);  
}  
});
  
});