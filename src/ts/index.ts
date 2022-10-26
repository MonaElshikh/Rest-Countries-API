//#region  Declaration
const countriesApi = "https://restcountries.com/v3.1/all";
const countriesDiv = document.querySelector(".countries") as HTMLDivElement;
const rootElement = document.documentElement;
let themeDiv = document.querySelector(".theme") as HTMLDivElement;
let regionsOptions: any;
let regionInput = document.querySelector(
  ".by-region > input"
) as HTMLInputElement;
let arrowImg = document.querySelector(".by-region >img") as HTMLImageElement;
let regionDdl = document.querySelector("#regions-list") as HTMLDListElement;
let searchInput = document.querySelector(
  ".by-country>input"
) as HTMLInputElement;
interface Countries {
  name: {
    common: string;
    official: string;
    nativeName: {
      key: {
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
  cca3: string;
  currencies: {
    key: {
      name: string;
    };
  };
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
const THEMES: any = {
  dark: {
    "--bg-color": "hsl(207, 26%, 17%)",
    "--txt-color": "hsl(0, 0%, 98%)",
    "--elements-bgcolor": "hsl(209, 23%, 22%)",
    "--filter": "invert(100%) grayscale(1)",
  },
  light: {
    "--bg-color": "hsl(0, 0%, 98%)",
    "--txt-color": "hsl(200, 15%, 8%)",
    "--elements-bgcolor": "hsl(0, 0%, 100%)",
    "--filter": "none",
  },
};
//#region Details Elements
let detailesFlag = document.querySelector(
  ".content  .flag > img"
) as HTMLImageElement;
let detailsCountryName = document.querySelector(
  ".data .main-data > h3"
) as HTMLHeadingElement;
let nativeName = document.querySelector(
  ".main-data  .native-name > span"
) as HTMLSpanElement;
let population = document.querySelector(
  ".main-data  .population > span"
) as HTMLSpanElement;
let region = document.querySelector(
  ".main-data  .region > span"
) as HTMLSpanElement;
let subRegion = document.querySelector(
  ".main-data .sub-region>span"
) as HTMLSpanElement;
let capital = document.querySelector(
  ".main-data .capital>span"
) as HTMLSpanElement;
let topLevelDomain = document.querySelector(
  ".more-data .tld> span "
) as HTMLSpanElement;
let currencies = document.querySelector(
  ".more-data .currencies>span"
) as HTMLSpanElement;
let languages = document.querySelector(
  ".more-data .languages>span"
) as HTMLSpanElement;
let borderCountryDiv = document.querySelector(
  ".border-country"
) as HTMLDivElement;
let borderCountryValuesDiv = document.querySelector(
  ".border-country .values"
) as HTMLDivElement;
//#endregion
//#endregion
//#region  Functions
//#region  General Functions
function addToLocalStorage(key: string, value: any | string) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getFromLocalStorage(key: string) {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || "")
    : null;
}
function loadPreferedTheme() {
  if (getFromLocalStorage("theme")) {
    themeDiv.setAttribute("data-theme", getFromLocalStorage("theme"));
  } else {
    themeDiv.setAttribute("data-theme", "light");
  }
  setPreferedTheme(themeDiv.dataset.theme);
}
function setPreferedTheme(themeName: any | string) {
  rootElement.style.setProperty("--bg-color", THEMES[themeName]["--bg-color"]);
  rootElement.style.setProperty(
    "--elements-bgcolor",
    THEMES[themeName]["--elements-bgcolor"]
  );
  rootElement.style.setProperty(
    "--txt-color",
    THEMES[themeName]["--txt-color"]
  );
  rootElement.style.setProperty("--filter", THEMES[themeName]["--filter"]);
}
function toggleTheme() {
  themeDiv.addEventListener("click", () => {
    themeDiv.dataset.theme === "light"
      ? themeDiv.setAttribute("data-theme", "dark")
      : themeDiv.setAttribute("data-theme", "light");
    addToLocalStorage("theme", themeDiv.dataset.theme);
    setPreferedTheme(themeDiv.dataset.theme);
  });
}
function backToList() {
  backBtn?.addEventListener("click", () => {
    listDiv.style.display = "block";
    detailesDiv.style.display = "none";
  });
}
//#endregion
//#region Countries Functions
async function getCountries() {
  if (
    getFromLocalStorage("countries-list") == undefined ||
    getFromLocalStorage("countries-list") == null
  ) {
    let data = (await fetch(countriesApi)).json();
    let list = await data;
    list = list.filter((item: Countries) => item.name.common !== "Israel");
    // list.sort((a, b) => a.name.common.localeCompare(b.name.common));
    addToLocalStorage("countries-list", list);
  }
  countriesList = getFromLocalStorage("countries-list");
  loadCountries();
  loadRegions();
  regionsOptions = document.querySelectorAll("#regions-list > option");
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
    flagImg.alt = "flag";
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
      loadCountryDetails(country);
    });
    countriesDiv.appendChild(countryDiv);
  });
}
function loadCountryDetails(country: Countries) {
  listDiv.style.display = "none";
  detailesDiv.style.display = "block";
  borderCountryValuesDiv.innerHTML = "";
  detailesFlag.src = country.flags.svg;
  detailsCountryName.innerText = country.name.common;
  nativeName.innerText = country.name.official;
  population.innerText = country.population.toString();
  region.innerText = country.region;
  subRegion.innerText = country.subregion;
  capital.innerText =
    country.capital !== undefined ? country.capital.join(",") : "---";
  topLevelDomain.innerText = country.tld.join(", ");
  currencies.innerText =
    country.currencies !== undefined
      ? country.currencies[Object.keys(country.currencies)[0]].name
      : "---";
  let langs: string[] = [];
  if (country.languages !== undefined) {
    for (let key in country.languages) {
      langs.push(country.languages[key]);
    }
    languages.innerText = langs.join(", ");
  } else {
    languages.innerText = "---";
  }
  if (country.borders !== undefined) {
    borderCountryDiv.style.display = "inline-block";
    country.borders.forEach((border) => {
      let borderCountrySpan = document.createElement("span");
      borderCountrySpan.innerText = border;
      borderCountrySpan.addEventListener("click", () => {
        loadCountryDetails(
          countriesList.filter((c) => c.cca3 === borderCountrySpan.innerText)[0]
        );
      });
      borderCountryValuesDiv.appendChild(borderCountrySpan);
    });
  } else {
    borderCountryDiv.style.display = "none";
  }
}
function searchByCountry() {
  searchInput.addEventListener("keyup", () => {
    if (searchInput.value.trim() == "") {
      countriesList = getFromLocalStorage("countries-list");
    }
    countriesList = countriesList.filter((country) =>
      country.name.common.includes(searchInput.value.trim())
    );
    loadCountries();
  });
}
//#endregion
//#region  Regions Functions
function openRegionList() {
  regionInput.addEventListener("click", () => {
    if (regionDdl.style.display === "block") {
      regionDdl.style.display = "none";
      arrowImg.src = "dist/images/down-arrow.svg";
    } else {
      regionDdl.style.display = "block";
      arrowImg.src = "dist/images/up-arrow.svg";
    }
    countriesList = getFromLocalStorage("countries-list");
  });
}
function loadRegions() {
  let regions = [...new Set(countriesList.map((r) => r.region).sort())];
  regions.unshift("All");
  regionsList.innerHTML = "";
  regions.forEach((region) => {
    let option = document.createElement("option");
    option.value = region;
    option.innerHTML = region;
    option.addEventListener("click", () => {
      filterByRegion(option.innerHTML);
    });
    regionsList.appendChild(option);
  });
}
function filterByRegion(regionName: string) {
  if (regionName === "All") {
    countriesList = getFromLocalStorage("countries-list");
    regionInput.value = "Filter by region";
  } else {
    countriesList = countriesList.filter(
      (country) => country.region === regionName
    );
    regionInput.value = regionName;
    arrowImg.src = "dist/images/down-arrow.svg";
  }
  loadCountries();
  regionDdl.style.display = "none";
}
//#endregion
//#endregion
//#region  Calls
getCountries();
backToList();
loadPreferedTheme();
toggleTheme();
openRegionList();
searchByCountry();
//#endregion
