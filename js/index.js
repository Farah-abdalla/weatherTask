var inputValue = document.getElementById("inputvalue");
var currentValue;
var dayCurrent;


getWeather("cairo");

inputValue.addEventListener("input", function() {
    currentValue = inputValue.value;
    getWeather(currentValue);
    
});


async function getWeather(country) {
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${country}&days=3`);
    var data = await response.json();

    
    var nameCountry = data.location.name;
    var imgCountry = data.current.condition.icon;
    var textCountry = data.current.condition.text;
    var temperatureCountry = data.current.temp_c;

    displayWeather(nameCountry, imgCountry, temperatureCountry, textCountry);

    dayCurrent = data.forecast.forecastday;

    dayCurrent.forEach((day, index) => {
        displayDayForecast(day, index);
    });
}


function displayWeather(nameCountry, imgCountry, temperatureCountry, textCountry) {
   //  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   //  var date = dayCurrent[0].date; 
   //  var dateObj = new Date(date);
   //  var dayName = daysOfWeek[dateObj.getDay()];

    var cartona = `
        <h3>${nameCountry}</h3>
        <div class="temperture">
            <span class="info">${temperatureCountry}<sup>o</sup>C</span>
        </div>
        <div><img src="https:${imgCountry}" alt="" class="w-25"></div>
        <span>${textCountry}</span>
        <ul class="list-unstyled d-flex">
            <li><img src="./img/icon-umberella.png" alt="umberella"> 20%</li>
            <li><img src="./img/icon-wind.png" alt="wind"> 18km/h</li>
            <li><img src="./img/icon-compass.png" alt="compass"> East</li>
        </ul>
    `;
   //  var today = `<h5>${dayName}</h5>`;
    
   //  document.getElementById("first").innerHTML = today;
    document.getElementById("card-first").innerHTML = cartona;
}

function displayDayForecast(day, index) {
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var date = day.date; 
    var dateObj = new Date(date);
    var dayName = daysOfWeek[dateObj.getDay()];
    var maxTemp = day.day.maxtemp_c;
    var minTemp = day.day.mintemp_c;
    var condition = day.day.condition.text;
    var icon = day.day.condition.icon
    var dateCartona = `
        <div class="day-forecast text-center">
              <div><img src="https:${icon}" alt="" class="w-25"></div>
            <p id="tem"> ${maxTemp}<sup>o</sup>C</p>
            <p id="tem1"> ${minTemp}<sup>o</sup>C</p>
            <p id="tem2"> ${condition}</p>
        </div>
    `;
    var today = `<h5>${dayName}</h5>`;
     
    if (index === 1) {
        document.getElementById("second-day").innerHTML = today;
        document.getElementById("forecast-days").innerHTML = dateCartona;
    } else if (index === 2) {
        document.getElementById("third-day").innerHTML = today;
        document.getElementById("forecast-day").innerHTML = dateCartona;
    }
    else{
      document.getElementById("first").innerHTML = today;
     
    }
}
