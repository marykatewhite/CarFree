// var searchButton = $("#searchButton");
// var apiKey = '&APPID=6ed916bd27627a41b866c99f280877b5';
// var units = '&units=imperial';

// function getWeatherData() {
//     // current weather
//     var openWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
//     var citySearch = $('#citySearchInput').val();
//     var currentWeather = openWeather + citySearch + units + apiKey;

//     $.ajax({
//         url: currentWeather,
//         method: "GET"
//     })
//         .then(function (response) {

//             var lat = Math.floor(response.coord.lat);
//             var lon = Math.floor(response.coord.lon);


//             // Displaying results
//             $("#cityNameDisplay").html("<h3>City: " + response.name + "</h3>");
//             $("#windSpeedDisplay").text("Current Wind Speed: " + response.wind.speed);
//             $("#humidityDisplay").text("Current Humidity: " + response.main.humidity);
//             $("#temperatureDisplay").text("Current Temperature (F): " + response.main.temp);


//             // UV search using lat and lon
//             var uvSearchURL = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&amp;lon=' + lon;
//             var uvSearchKey = uvSearchURL + apiKey;

//             $.ajax({
//                 url: uvSearchKey,
//                 method: "GET"
//             })
//                 .then(function (response) {
//                     $('#uvIndexDisplay').text("Current UV Index: " + response.value)
//                 });


//             // forecast search
//             var weatherForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';
//             var citySearch = $('#citySearchInput').val();
//             var forecastURL = weatherForecast + citySearch + units + apiKey;

//             $.ajax({
//                 url: forecastURL,
//                 method: "GET"
//             })
//                 .then(function (response) {
//                     var forecastTimes = [0, 7, 15, 31, 39];
//                     var i;
//                     $("#forecastDisplay").empty();
//                     for (i = 0; i < forecastTimes.length; i++) {

//                         $('#forecastDisplay').append("<li>" + "Date: " + response.list[forecastTimes[i]].dt_txt + "</li>");
//                         $('#forecastDisplay').append("<li>" + "Temp: " + response.list[forecastTimes[i]].main.temp + "</li>");
//                         $('#forecastDisplay').append("<li>" + "Humidity: " + response.list[forecastTimes[i]].main.humidity + "</li>");
//                         $('#forecastDisplay').append("<image src=http://openweathermap.org/img/wn/" + response.list[forecastTimes[i]].weather[0].icon + "@2x.png id=icon1>");
//                     }
//                 });
//         });
// }

// searchButton.on("click", getWeatherData);