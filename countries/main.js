const country_card = document.querySelector(".countries-container");
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((response) => {
    country_card.innerHTML = response
      .map(
        (countryInfo) => `<div class="country-card">
    <img class="flag" src=${countryInfo.flags.svg} alt="aaa" />
    <p class="country-name">${countryInfo.name.official}</p>
    <p class="capital">Capital: ${
      countryInfo.capital ? countryInfo.capital.join(", ") : "NA"
    }</p>
    <p class="continent">Continent: ${countryInfo.continents.join(", ")}</p>
  </div>`
      )
      .join(" ");
  });
