
$(document).ready(function() {

var celcius;
var fahrenheit;
var weatherDetails;
var callWeatherAPI = "https://api.openweathermap.org/data/2.5/weather";
var apiKey = "&APPID=98c5401b36d41b34f97eaf7891e4918a";

// call function to get Latitude and longitude of your location
getLatLong();


// After getting lat & lon, call this API to get further weather details
function setWeather(){
  $.ajax({
                  url: callWeatherAPI,
                  type: 'GET',

    dataType: 'json',
    success: function(data){

// set temperature (Celcius & Fahrenheit)
      var temperature = data.main.temp;
      celcius = Math.round(temperature);
      fahrenheit = Math.round(celcius*1.8+32);


// Set weather data in HTML
      weatherDetails = data.weather[0].description;
      var icon = data.weather[0].icon;
      var weatherIcon = "http://openweathermap.org/img/wn/"+icon+"@2x.png";


      $('.weatherDetail').html(weatherDetails);
      $('.temp').html(celcius+"&#8451;");
      $('.iconpic>img').attr("src", weatherIcon);

    },
           error: function(err){
             alert('Error in SetWeather Function');
             console.log(err);
     }
  })
}


//Function used to get the Latitude & longitude of your location
// Also gets the city & country you are in and displays in HTML
function getLatLong(){
  $.ajax({
              url: "https://geoip-db.com/json/",
              type: 'GET',

    dataType: 'json',
    success: function(data){

      // Get Latitude & longitude of your location
      lat = data.latitude;
      lon = data.longitude;

       // Display city & country in which you are located
      $('.city').html(data.city);
      $('.country').html(data.country_name);

      // Use Latitude & longitude & API key to set URL used in setWeather function;
      callWeatherAPI += "?lat="+lat+"&lon="+lon+apiKey+"&units=metric";

      setWeather();

    },
           error: function(err){
             alert('Error in LatLong');
             console.log(err);
     }

  })
}


           // Toggle between Fahrenheit & Celcius;
            $('.toggle .btn').click(function(){

              if($('.toggle').attr('id')=='c') {
                $('.temp').html(fahrenheit+"&#8457;");
                  $('.toggle').attr('id', 'f');

                } else if ($('.toggle').attr('id')=='f') {
                  $('.temp').html(celcius+"&#8451;");
                    $('.toggle').attr('id', 'c');

              }
            });

});
