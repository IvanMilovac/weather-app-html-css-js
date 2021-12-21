const chooseLocationIcon = document.querySelector("#location-icon");
const formErrorField = document.querySelector("form p");
const chooseLocationInput = document.querySelector("input");
const chooseLocationForm = document.forms[0];
const btnBack = document.querySelector(".btn-back");
const modalChooseLocation = document.querySelector(".modal-choose-location");
const headerLocationName = document.querySelector(".header__location h1");
const dateContainer = document.querySelector(".header__date h4");
const currentWeatherInfoChilds = document.querySelector(
  ".main__todays-weather-info_current-info"
).children;
const currentWeatherIcon = document.querySelector(".current-weather-icon");
const highTemp = document.querySelector(
  ".main__todays-weather-info_stats-high h3"
);
const windKph = document.querySelector(
  ".main__todays-weather-info_stats-wind h3"
);
const sunrise = document.querySelector(
  ".main__todays-weather-info_stats-sunrise h3"
);
const lowTemp = document.querySelector(
  ".main__todays-weather-info_stats-low h3"
);
const rain = document.querySelector(".main__todays-weather-info_stats-rain h3");
const sunset = document.querySelector(
  ".main__todays-weather-info_stats-sunset h3"
);
const hourlyItemsContainer = document.querySelector(
  ".main__todays-weather-by-time_items"
);
const dailyItemsContainer = document.querySelector(
  ".main__future-weather-by-day_container"
);

export {
  chooseLocationIcon,
  formErrorField,
  chooseLocationInput,
  chooseLocationForm,
  btnBack,
  modalChooseLocation,
  headerLocationName,
  dateContainer,
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
};
