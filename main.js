document.addEventListener("DOMContentLoaded", () => {
  // if ("serviceWorker" in navigator) {
  //   navigator.serviceWorker.register("/sw.js");
  //   if (navigator.serviceWorker.controller) {
  //     console.log("Current controller: ", navigator.serviceWorker.controller);
  //   }
  //   navigator.serviceWorker.oncontrollerchange = (e) => {
  //     console.log("New service worker activated.");
  //   };
  // } else {
  //   console.log("Service worker not supported.");
  // }

  const country_container = document.querySelector(".countries-container");
  fetch("https://restcountries.com/v3.1/currency/rupee")
    .then((response) => response.json())
    .then((response) => {
      country_container.innerHTML = response
        .map(
          (countryInfo) => `<div class="country-card">
    <img class="flag" src=${countryInfo.flags.svg} alt="flag" />
    <p class="country-name">${countryInfo.name.official}</p>
    <p class="capital">Capital: ${
      countryInfo.capital ? countryInfo.capital.join(", ") : "NA"
    }</p>
    <p class="continent">${countryInfo.continents.join(", ")}</p>
  </div>`
        )
        .join(" ");
    });

  const logo = document.querySelector(".logo");
  logo.addEventListener("click", (event) => {
    console.log("Fetching details of India");
    fetch("https://restcountries.com/v3.1/name/india")
      .then((response) => response.json())
      .then((response) => console.log(response));
  });
});
