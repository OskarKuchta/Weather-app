const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const nameOutput = document.querySelector(".name");
const conditionOutput = document.querySelector(".condition");
const humidityOutput = document.querySelector(".humidity");
const cloudOutput = document.querySelector(".cloud");
const windOutput = document.querySelector(".wind");
const icon = document.querySelector(".icon");
const form = document.querySelector("#locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");


let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener("click", (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
})

form.addEventListener("submit", (e) => {
    if (search.value.length == 0) {
        alert("Please type in a city name");
    }
    else {
        cityInput = search.value;
    }
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Firday",
        "Saturday"
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=a9518d77c15f46398a4162156231103&q=${cityInput}&aqi=yes`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;
            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
            timeOutput.innerHTML = time;
        });
}