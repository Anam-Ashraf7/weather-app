//Complete the Weather API Backend part using openweathermap api

// Progression 1: Create a function and fetch data using "fetch" from openweathermap api and display the data as given in reference image.

let form = document.getElementById('input');
let APIkey = '807cebacea268d746bdd0b89651fec19';

let cityName = document.getElementById("input-city");

let message = document.getElementById("message")


form.addEventListener('submit', (event) => {
    event.preventDefault();
    getLocation();
    message.style.display = "none"
});

function getLocation() {

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=5&appid=${APIkey}`)
    .then((response) =>response.json())
    .then((data) => {
        console.log("location",data)
        getWeatherData(data)
    })
    .catch((error) => console.log(error))
}


function getWeatherData(data) {
    let lat = data[0].lat
    let lon = data[0].lon

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then((response) => response.json())
    .then((data) => {
        console.log("weather",data)
        appendData(data,cityName)
    })
    .catch((error) => console.log(error))
    
}


function appendData(data,cityName) {
    
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    
    let city = document.getElementById("city-name")
    let date = document.getElementById("date")
    let temperature = document.getElementById("temp")
    let weather = document.getElementById("weather")
    let minmaxTemp = document.getElementById("min-max-temp")
    
    city.innerText = `${cityName.value},${data.sys.country}`
    temperature.innerText = (data.main.temp - 273.15).toFixed(1) + " °C";
    weather.innerText = data.weather[0].description;
    date.innerText = formattedDate;
    minmaxTemp.innerText = `${(data.main.temp_min-273.15).toFixed(1)+ " °C"}/${(data.main.temp_max-273.15).toFixed(1)+ " °C"}`

}
