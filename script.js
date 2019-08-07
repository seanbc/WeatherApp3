var celcius;
var fahrenheit;
var weatherDetails
var callWeatherAPI;

getLatLong();

function setWeather(){
  $.ajax({
                  url: callWeatherAPI,
                  type: 'GET',

    dataType: 'json',
    success: function(data){

        // check if this works
      var temperature = data.main.temp;

      celcius = temperature;
      fahrenheit = celcius*1.8+32;
      weatherDetails = data.weather.description;

      // check if this works
      var icon = data.weather.icon;

      $('.weatherDetail').html(weatherDetails);
      $('.iconpic>img').attr('src','http://openweathermap.org/img/w/'+icon+'.png');
      $('.temp').html(temperature+"&#8451;");

    },
           error: function(err){
             alert('Error in SetWeather Function');
             console.log(err);
     }

  })
}

function getLatLong(){
  $.ajax({
                  url: "https://geoip-db.com/json",
                  type: 'GET',

    dataType: 'json',
    success: function(data){
      var lat = data.latitude;
      var long = data.longitude;

      $('.city').html(data.city);
      $('.country').html(data.country_name);

      // Get this later
      callWeatherAPI = "";

    },
           error: function(err){
             alert('Error');
             console.log(err);
     }

  })
}

$('.toggle .btn').click(function(){

  if($('.toggle').attr('id')=='c') {
    $('.temp').html(fahrenheit+"&#8457;");
      ('.toggle').attr('id', 'f');

    } else if ($('.toggle').attr('id')=='f') {
      $('.temp').html(celcius+"&#8451;");
        ('.toggle').attr('id', 'c');

  }
})
