import { getRefs } from './refs';
import { Skycons } from "./skycons";
const refs = getRefs();

let long = 0;
let lat = 0;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    fetchWeather(lat, long);
  });
}


function fetchWeather(lat, long) {
  const KEY = `5c8dab899c73e9fec8517804e94f0209`;
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${KEY}&units=metric&lang=en`;
  fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(showWeather);
}

function showWeather({ main, weather, name }) {
  refs.temperatureDescription.textContent = weather[0].main
  refs.temmperatureDegree.textContent = Math.round(main.temp)
  refs.locationTimezone.textContent = name
  refs.icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
  setSkycons(weather[0].description)
}

const objectCeys = {
  'clear sky': `CLEAR_DAY`,
  'few clouds': `PARTLY_CLOUDY_DAY`,
}

function setSkycons(icon) {
  const skyicon = objectCeys[icon]
  const skycons = new Skycons({ "color": "lightblue" })
  skycons.set(refs.iconSkycon, Skycons[skyicon])
  skycons.play();
}

// CLEAR_DAY CLEAR_NIGHT PARTLY_CLOUDY_DAY PARTLY_CLOUDY_NIGHT CLOUDY RAIN SLEET SNOW WIND FOG



//'clear sky', 'few clouds','scattered clouds',
// "broken clouds", "shower rain", 'rain', 'thunderstorm', 'snow', 'mist'


//clear-day,clear-night,partly-cloudy-day,partly-cloudy-night,
// cloudy, rain, sleet, snow, wind, fog

