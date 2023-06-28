const apiKey = "871c022af251f0860451b3f9edeccbdb";
const apiCountryURL = "https://www.countryflagicons.com/FLAT/64/.png";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const fellsLikeElement = document.querySelector("#feels-like span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const lonElement = document.querySelector("#lon span");
const latElement = document.querySelector("#lat span");

const weatherContainer = document.querySelector("#weather-data");

const loader = document.querySelector("#loader");

const toggleLoader = () => {
    loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
    toggleLoader();
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    toggleLoader();
    return data;
};

const showWeatherData = async (city) =>{
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    fellsLikeElement.innerText = parseInt(data.main.feels_like);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://www.countryflagicons.com/FLAT/64/${data.sys.country}.png`); 
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    latElement.innerText = `${data.coord.lat}`;
    lonElement.innerText = `${data.coord.lon}`;

    weatherContainer.classList.remove("hide");

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city); 
    };
});