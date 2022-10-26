"use strict";var __awaiter=this&&this.__awaiter||function(e,a,l,c){return new(l=l||Promise)(function(n,t){function o(e){try{i(c.next(e))}catch(e){t(e)}}function r(e){try{i(c.throw(e))}catch(e){t(e)}}function i(e){var t;e.done?n(e.value):((t=e.value)instanceof l?t:new l(function(e){e(t)})).then(o,r)}i((c=c.apply(e,a||[])).next())})};const countriesApi="https://restcountries.com/v3.1/all",countriesDiv=document.querySelector(".countries"),rootElement=document.documentElement;let themeDiv=document.querySelector(".theme"),regionsOptions,regionInput=document.querySelector(".by-region > input"),arrowImg=document.querySelector(".by-region >img"),regionDdl=document.querySelector("#regions-list"),searchInput=document.querySelector(".by-country>input"),countriesList,regionsList=document.querySelector("#regions-list"),listDiv=document.querySelector(".list"),detailesDiv=document.querySelector(".details"),backBtn=document.querySelector(".back-btn>button");const THEMES={dark:{"--bg-color":"hsl(207, 26%, 17%)","--txt-color":"hsl(0, 0%, 98%)","--elements-bgcolor":"hsl(209, 23%, 22%)","--filter":"invert(100%) grayscale(1)"},light:{"--bg-color":"hsl(0, 0%, 98%)","--txt-color":"hsl(200, 15%, 8%)","--elements-bgcolor":"hsl(0, 0%, 100%)","--filter":"none"}};let detailesFlag=document.querySelector(".content  .flag > img"),detailsCountryName=document.querySelector(".data .main-data > h3"),nativeName=document.querySelector(".main-data  .native-name > span"),population=document.querySelector(".main-data  .population > span"),region=document.querySelector(".main-data  .region > span"),subRegion=document.querySelector(".main-data .sub-region>span"),capital=document.querySelector(".main-data .capital>span"),topLevelDomain=document.querySelector(".more-data .tld> span "),currencies=document.querySelector(".more-data .currencies>span"),languages=document.querySelector(".more-data .languages>span"),borderCountryDiv=document.querySelector(".border-country"),borderCountryValuesDiv=document.querySelector(".border-country .values");function addToLocalStorage(e,t){localStorage.setItem(e,JSON.stringify(t))}function getFromLocalStorage(e){return localStorage.getItem(e)?JSON.parse(localStorage.getItem(e)||""):null}function loadPreferedTheme(){getFromLocalStorage("theme")?themeDiv.setAttribute("data-theme",getFromLocalStorage("theme")):themeDiv.setAttribute("data-theme","light"),setPreferedTheme(themeDiv.dataset.theme)}function setPreferedTheme(e){rootElement.style.setProperty("--bg-color",THEMES[e]["--bg-color"]),rootElement.style.setProperty("--elements-bgcolor",THEMES[e]["--elements-bgcolor"]),rootElement.style.setProperty("--txt-color",THEMES[e]["--txt-color"]),rootElement.style.setProperty("--filter",THEMES[e]["--filter"])}function toggleTheme(){themeDiv.addEventListener("click",()=>{"light"===themeDiv.dataset.theme?themeDiv.setAttribute("data-theme","dark"):themeDiv.setAttribute("data-theme","light"),addToLocalStorage("theme",themeDiv.dataset.theme),setPreferedTheme(themeDiv.dataset.theme)})}function backToList(){null!==backBtn&&void 0!==backBtn&&backBtn.addEventListener("click",()=>{listDiv.style.display="block",detailesDiv.style.display="none"})}function getCountries(){return __awaiter(this,void 0,void 0,function*(){if(null==getFromLocalStorage("countries-list")||null==getFromLocalStorage("countries-list")){let e=yield(yield fetch(countriesApi)).json();addToLocalStorage("countries-list",e=e.filter(e=>"Israel"!==e.name.common))}countriesList=getFromLocalStorage("countries-list"),loadCountries(),loadRegions(),regionsOptions=document.querySelectorAll("#regions-list > option")})}function loadCountries(){countriesDiv.innerHTML="",countriesList.forEach(e=>{var t=document.createElement("div"),n=(t.className="country",document.createElement("div")),o=(n.className="flag",document.createElement("img")),o=(o.src=e.flags.svg,n.appendChild(o),t.appendChild(n),document.createElement("div")),n=(o.className="data",document.createElement("h2")),n=(n.innerHTML=e.name.common,o.appendChild(n),document.createElement("div")),r=(n.className="population",document.createElement("label")),i=(r.innerHTML="Population: ",document.createElement("span")),r=(i.innerHTML=e.population.toString(),n.appendChild(r),n.appendChild(i),o.appendChild(n),document.createElement("div")),i=(r.className="region",document.createElement("label")),n=(i.innerHTML="Region: ",document.createElement("span"));n.innerHTML=e.region,r.appendChild(i),r.appendChild(n),o.appendChild(r),void 0!==e.capital&&((i=document.createElement("div")).className="capital",(n=document.createElement("label")).innerHTML="Capital: ",(r=document.createElement("span")).innerHTML=e.capital.join(", "),i.appendChild(n),i.appendChild(r),o.appendChild(i)),t.appendChild(o),t.addEventListener("click",()=>{loadCountryDetails(e)}),countriesDiv.appendChild(t)})}function loadCountryDetails(e){listDiv.style.display="none",detailesDiv.style.display="block",borderCountryValuesDiv.innerHTML="",console.log(e),detailesFlag.src=e.flags.svg,detailsCountryName.innerText=e.name.common,nativeName.innerText=e.name.official,population.innerText=e.population.toString(),region.innerText=e.region,subRegion.innerText=e.subregion,capital.innerText=void 0!==e.capital?e.capital.join(","):"---",topLevelDomain.innerText=e.tld.join(", "),currencies.innerText=void 0!==e.currencies?e.currencies[Object.keys(e.currencies)[0]].name:"---";var t=[];if(void 0!==e.languages){for(var n in e.languages)t.push(e.languages[n]);languages.innerText=t.join(", ")}else languages.innerText="---";void 0!==e.borders?(borderCountryDiv.style.display="inline-block",e.borders.forEach(e=>{let t=document.createElement("span");t.innerText=e,t.addEventListener("click",()=>{loadCountryDetails(countriesList.filter(e=>e.cca3===t.innerText)[0])}),borderCountryValuesDiv.appendChild(t)})):borderCountryDiv.innerHTML="---"}function searchByCountry(){searchInput.addEventListener("keyup",()=>{countriesList=(countriesList=""==searchInput.value.trim()?getFromLocalStorage("countries-list"):countriesList).filter(e=>e.name.common.includes(searchInput.value.trim())),loadCountries()})}function openRegionList(){regionInput.addEventListener("click",()=>{"block"===regionDdl.style.display?(regionDdl.style.display="none",arrowImg.src="dist/images/down-arrow.svg"):(regionDdl.style.display="block",arrowImg.src="dist/images/up-arrow.svg"),countriesList=getFromLocalStorage("countries-list")})}function loadRegions(){var e=[...new Set(countriesList.map(e=>e.region).sort())];e.unshift("All"),regionsList.innerHTML="",e.forEach(e=>{let t=document.createElement("option");t.value=e,t.innerHTML=e,t.addEventListener("click",()=>{filterByRegion(t.innerHTML)}),regionsList.appendChild(t)})}function filterByRegion(t){"All"===t?(countriesList=getFromLocalStorage("countries-list"),regionInput.value="Filter by region"):(countriesList=countriesList.filter(e=>e.region===t),regionInput.value=t,arrowImg.src="dist/images/down-arrow.svg"),loadCountries(),regionDdl.style.display="none"}getCountries(),backToList(),loadPreferedTheme(),toggleTheme(),openRegionList(),searchByCountry();
//# sourceMappingURL=main.js.map
