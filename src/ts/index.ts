//#region  Declaration
const countriesApi = "https://restcountries.com/v3.1/all";
const countriesDiv = document.querySelector(".countries") as HTMLDivElement;
interface Countries {
  name: {
    common: string;
    official: string;
    nativeName: {
      isl: {
        official: string;
        common: string;
      };
    };
  };
  area: number;
  flags: { png: string; svg: string };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies: {};
  languages: {};
  borders: string[];
}
let countriesList: Countries[];
let regionsList = document.querySelector(
  "#regions-list"
) as HTMLDataListElement;
let listDiv = document.querySelector(".list") as HTMLDivElement;
let detailesDiv = document.querySelector(".details") as HTMLDivElement;
let backBtn = document.querySelector(".back-btn>button");
//#endregion
//#region  Functions
function addToLocalStorage(list: any, key: string) {
  localStorage.setItem(key, JSON.stringify(list));
}
function getFromLocalStorage(key: string) {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || "")
    : null;
}
async function getCountries() {
  if (
    getFromLocalStorage("countries-list") == undefined ||
    getFromLocalStorage("countries-list") == null
  ) {
    let data = (await fetch(countriesApi)).json();
    let list = await data;
    list = list.filter((item: Countries) => item.name.common !== "Israel");
    addToLocalStorage(list, "countries-list");
  }
  countriesList = getFromLocalStorage("countries-list");
  loadCountries();
  loadRegions();
}
function loadCountries() {
  countriesDiv.innerHTML = "";
  countriesList.forEach((country: Countries) => {
    let countryDiv = document.createElement("div");
    countryDiv.className = "country";

    let flagDiv = document.createElement("div");
    flagDiv.className = "flag";
    let flagImg = document.createElement("img");
    flagImg.src = country.flags.svg;
    flagDiv.appendChild(flagImg);
    countryDiv.appendChild(flagDiv);

    let dataDiv = document.createElement("div");
    dataDiv.className = "data";

    let h2 = document.createElement("h2");
    h2.innerHTML = country.name.common;
    dataDiv.appendChild(h2);

    let populationDiv = document.createElement("div");
    populationDiv.className = "population";
    let populationlbl = document.createElement("label");
    populationlbl.innerHTML = "Population: ";
    let populationSpan = document.createElement("span");
    populationSpan.innerHTML = country.population.toString();
    populationDiv.appendChild(populationlbl);
    populationDiv.appendChild(populationSpan);
    dataDiv.appendChild(populationDiv);

    let regionDiv = document.createElement("div");
    regionDiv.className = "region";
    let regionlbl = document.createElement("label");
    regionlbl.innerHTML = "Region: ";
    let regionSpan = document.createElement("span");
    regionSpan.innerHTML = country.region;
    regionDiv.appendChild(regionlbl);
    regionDiv.appendChild(regionSpan);
    dataDiv.appendChild(regionDiv);

    if (country.capital !== undefined) {
      let capitalDiv = document.createElement("div");
      capitalDiv.className = "capital";
      let capitalLbl = document.createElement("label");
      capitalLbl.innerHTML = "Capital: ";
      let capitalSpan = document.createElement("span");
      capitalSpan.innerHTML = country.capital.join(", ");
      capitalDiv.appendChild(capitalLbl);
      capitalDiv.appendChild(capitalSpan);
      dataDiv.appendChild(capitalDiv);
    }
    countryDiv.appendChild(dataDiv);
    countryDiv.addEventListener("click", () => {
      loadCountryDetails();
    });
    countriesDiv.appendChild(countryDiv);
  });
}
function loadRegions() {
  let regions = [...new Set(countriesList.map((r) => r.region).sort())];
  regionsList.innerHTML = "";
  regions.forEach((region) => {
    let option = document.createElement("option");
    option.value = region;
    option.innerHTML = region;
    regionsList.appendChild(option);
  });
}
function loadCountryDetails() {
  listDiv.style.display = "none";
  detailesDiv.style.display = "block";
}
function backToList() {
  backBtn?.addEventListener("click", () => {
    listDiv.style.display = "block";
    detailesDiv.style.display = "none";
  });
}
//#endregion
//#region  Calls
getCountries();
backToList();
//#endregion
