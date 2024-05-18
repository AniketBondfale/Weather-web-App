//get all necessary elements from the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dataOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.Cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

//default city
let cityInput = "London";

//add city event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        //change from default city to clicked one
        cityInput = e.target.innerHTML;
        // function that fetches and displays all the data from the weather api
        fetchWeatherData();
        //fade out the app 
        app.style.opacity = "0";
    });
});

//submit event
form.addEventListener('submit', (e) => {
    if(search.value.length == 0){
        alert('Please Enter a city name');
    }else{
        //changes from default city to the one written in input field
        cityInput = search.value;

        fetchWeatherData();
        //empty the input field
        search.value = "";
        app.style.opacity = "0";
    }
    //prevents the default behaviour of the form
    e.preventDefault();
});

function dayOfTheWeek(day, month, year){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return weekday[new Date(`${month}/${day}/${year}`).getDay()];
}

// function that fetches and displays all the data from the weather api
function fetchWeatherData(){
    //Fetch the data and dynamically add the city name with template literals
    fetch(`https://api.weatherapi.com/v1/current.json?key=b794396b47b44329b7c85908241805&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        //temp and weather condition
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        //reformat
        dataOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = data.location.name;

        //get the corresponding icon url for the weather and extract a part of it
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        //reformat to local
        icon.src = "./icons/" + iconId;

        //add details
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";

        let timeOfDay = "day";
        const code = data.current.condition.code;

        if (!data.current.is_day) {
            timeOfDay = "night";
        }

        if (code == 1000) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
            btn.style.background = "#e5ba92";
            if (timeOfDay == "night") {
                btn.style.background = "#181e27";
            }
        } else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
        ) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
            btn.style.background = "#fa6d1b";
            if (timeOfDay == "night") {
                btn.style.background = "#181e27";
            }
        } else if (
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
        ) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
            btn.style.background = "#647d75";
            if (timeOfDay == "night") {
                btn.style.background = "#325c80";
            }
        } else {
            app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
            if (timeOfDay == "night") {
                btn.style.background = "#1b1b1b";
            }
        }
        app.style.opacity = "1";
    })
    .catch(() => {
        alert('City not found, please try again');
        app.style.opacity = "1";
    });
}

fetchWeatherData();

app.style.opacity = "1";
