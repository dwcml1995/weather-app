const apiKey = "69235d5b13881636003080b16677ed23"; //api key for weather app
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //url to look up cities 

const searchBox = document.querySelector(".search input"); // variable for search class with input field
const searchBtn = document.querySelector(".search button"); //variable for search class + button
const weatherIcon = document.querySelector(".weather-icon"); //variable for weather class and its icons

async function checkWeather(city) { //function to check the city that was input, from there it will await the input, fetch the apis url for the city & insert the city where `&appid=${apiKey}` is located 
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404) { //if an invalid city is entered and receives a 404 error
        document.querySelector(".error").style.display = "block"; //blocks invalid cities on the 404 error and wont display data besides invalid city text
        document.querySelector(".weather").style.display = "none"; //no 404 error present, will not display error msg
    } else {
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name; //targets city class and displays data for the name of the city
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; //targets temp class, rounds the temp to the nearest integer
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; //targets humidity class & takes the api data to display humidity
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";//targets wind class & takes the api data to display the current wind
    
        if(data.weather[0].main == "Clouds") { //if its cloudy, display this image
            weatherIcon.src = "./images/clouds.png";
        }
        else if(data.weather[0].main == "Clear") { //if clear, display this img 
            weatherIcon.src = "./images/clear.png";
        }
        else if(data.weather[0].main == "Drizzle") { //if drizzle, display this img
            weatherIcon.src = "./images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist") { //if mist, display this img
            weatherIcon.src = "./images/mist.png";
        }
        else if(data.weather[0].main == "Rain") { //if rain, display this img
            weatherIcon.src = "./images/rain.png";
        }
        else if(data.weather[0].main == "Snow") { //if snow, display this img
            weatherIcon.src = "./images/snow.png";
        }
        document.querySelector(".weather").style.display = "block"; //targets weather class, if its a valid city name, data will be displayed
        document.querySelector(".error").style.display = "none"; //targets error class, if theres an error, it will display the error message
    } 
}
searchBtn.addEventListener("click", ()=>{ //if the search button is clicked, the check weather call will display the value of the input into search box
    checkWeather(searchBox.value);
})