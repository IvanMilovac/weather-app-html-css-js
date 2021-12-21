import {
  chooseLocationIcon,
  chooseLocationInput,
  chooseLocationForm,
  btnBack,
  modalChooseLocation,
  dateContainer,
  formErrorField,
  hourlyItemsContainer,
  dailyItemsContainer,
} from "./selectDomElements.js";

import { API_KEY } from "./data.js";

import "../main.css";

import {
  generateDate,
  displayFetchedData,
  generateHourlyInfo,
  generateNextThreeDays,
} from "./utils.js";

let searchLocation = localStorage.getItem("searchLocation");

let url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchLocation}&days=5&aqi=no&alerts=no`;

const date = new Date();

let inputValue = "";

dateContainer.innerText = generateDate(date);

window.addEventListener("load", () => {
  displayFetchedData(url);
  generateHourlyInfo(url);
  generateNextThreeDays(url);
});

btnBack.addEventListener("click", (e) => {
  e.preventDefault();
  modalChooseLocation.style.display = "none";
});

chooseLocationIcon.addEventListener("click", () => {
  modalChooseLocation.style.display = "inherit";
});

chooseLocationInput.addEventListener("keyup", (e) => {
  inputValue = e.target.value;
});

chooseLocationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  localStorage.setItem("searchLocation", inputValue);
  url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${inputValue}&days=5&aqi=no&alerts=no`;
  displayFetchedData(url)
    .then(() => {
      formErrorField.innerText = "";
      modalChooseLocation.style.display = "none";
      e.target[0].value = "";
    })
    .catch(() => {
      formErrorField.innerText = "Something went wrong, try again!";
      formErrorField.style.color = "red";
    });
  hourlyItemsContainer.innerHTML = "";
  generateHourlyInfo(url);
  dailyItemsContainer.innerHTML = "";
  generateNextThreeDays(url);
});
