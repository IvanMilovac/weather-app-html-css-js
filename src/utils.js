import { months, weekDays } from "./data.js";

import {
  headerLocationName,
  currentWeatherInfoChilds,
  currentWeatherIcon,
  hourlyItemsContainer,
  dailyItemsContainer,
  highTemp,
  windKph,
  sunrise,
  sunset,
  lowTemp,
  rain,
} from "./selectDomElements.js";

const generateDate = (date) => {
  return `${weekDays[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()}`;
};

const fetchData = async (url) => {
  let response;
  response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = await response.json();
  const { temp_c, condition, wind_kph } = result.current;
  const { forecastday } = result.forecast;
  const { day, astro, hour } = result.forecast.forecastday[0];
  const { name, country } = result.location;
  return {
    temp_c,
    wind_kph,
    condition,
    day,
    astro,
    hour,
    name,
    country,
    forecastday,
  };
};

const displayFetchedData = async (url) => {
  let result;
  try {
    result = await fetchData(url);
  } catch (err) {
    throw new Error("Error occured");
  }
  headerLocationName.innerText = `${result.name}, ${result.country}`;
  highTemp.innerText = result.day.maxtemp_c + " °C";
  lowTemp.innerText = result.day.mintemp_c + " °C";
  rain.innerText = result.day.daily_chance_of_rain + " %";
  windKph.innerText = result.wind_kph + " km/h";
  sunrise.innerText = result.astro.sunrise;
  sunset.innerText = result.astro.sunset;
  currentWeatherInfoChilds[0].innerText = result.temp_c + "°";
  currentWeatherInfoChilds[1].innerText = result.condition.text;
  currentWeatherIcon.setAttribute("src", result.condition.icon);
};

const convertTime = (epoch) => new Date(epoch).getHours();

const generateHourlyInfo = async (url) => {
  let result;
  try {
    result = await fetchData(url);
  } catch (err) {
    throw new Error("Error occured");
  }

  const nextSevenHours = result.hour
    .filter((h) => convertTime(h.time_epoch * 1000) > new Date().getHours())
    .slice(0, 7);
  nextSevenHours.forEach(
    (hour) =>
      (hourlyItemsContainer.innerHTML += `<div class="main__todays-weather-by-time_item">
    <p>${convertTime(hour.time_epoch * 1000)}${
        convertTime(hour.time_epoch * 1000) <= 12 ? "am" : "pm"
      }<p>
    <img src="https:${hour.condition.icon}" alt="condition-icon" />
    <p>${hour.temp_c}°</p>
  </div>`)
  );
};

const generateNextThreeDays = async (url) => {
  let result;
  try {
    result = await fetchData(url);
  } catch (err) {
    throw new Error("Error occured");
  }
  result.forecastday.map((dayForecast) => {
    const date = new Date(dayForecast.date_epoch * 1000);
    if (innerWidth > 650)
      dailyItemsContainer.innerHTML += `
      <div class="main__future-weather-by-day_item">
        <div>
          <p>${weekDays[date.getDay()].slice(0, 3)}</p>
          <p>${date.getDate()}/${date.getMonth() + 1}</p>
        </div>
        <img src=${dayForecast.day.condition.icon} alt="weather-icon" />
        <div>
          <p>${dayForecast.day.mintemp_c}°</p>
          <p>Low</p>
        </div>
        <div>
          <p>${dayForecast.day.maxtemp_c}°</p>
          <p>High</p>
        </div>
        <div>
          <p>${dayForecast.day.maxwind_kph}kph</p>
          <p>Wind</p>
        </div>
        <div>
          <p>${dayForecast.day.daily_will_it_rain}%</p>
          <p>Rain</p>
        </div>
      </div>`;
    else
      dailyItemsContainer.innerHTML += `
      <div class="main__future-weather-by-day_item">
        <p>${weekDays[date.getDay()].slice(0, 3)}</p>
        <img src=${dayForecast.day.condition.icon} alt="weather-icon" />
        <p>${dayForecast.day.mintemp_c} - ${dayForecast.day.maxtemp_c}°</p>
      </div>
    `;
  });
};

export {
  generateDate,
  displayFetchedData,
  generateHourlyInfo,
  generateNextThreeDays,
};
