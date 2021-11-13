import { getRefs } from './refs';
const refs = getRefs();

console.log(refs);
let long = 0;
let lat = 0;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
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
    .then(data => {
      console.log(data);
    });
}

// `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}`;
