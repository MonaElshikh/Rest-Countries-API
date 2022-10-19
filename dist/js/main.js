"use strict";var __awaiter=this&&this.__awaiter||function(e,l,c,r){return new(c=c||Promise)(function(n,t){function i(e){try{a(r.next(e))}catch(e){t(e)}}function o(e){try{a(r.throw(e))}catch(e){t(e)}}function a(e){var t;e.done?n(e.value):((t=e.value)instanceof c?t:new c(function(e){e(t)})).then(i,o)}a((r=r.apply(e,l||[])).next())})};const countriesApi="https://restcountries.com/v3.1/all",countriesDiv=document.querySelector(".countries");let countriesList,regionsList=document.querySelector("#regions-list"),listDiv=document.querySelector(".list"),detailesDiv=document.querySelector(".details"),backBtn=document.querySelector(".back-btn>button");function addToLocalStorage(e,t){localStorage.setItem(t,JSON.stringify(e))}function getFromLocalStorage(e){return localStorage.getItem(e)?JSON.parse(localStorage.getItem(e)||""):null}function getCountries(){return __awaiter(this,void 0,void 0,function*(){if(null==getFromLocalStorage("countries-list")||null==getFromLocalStorage("countries-list")){let e=yield(yield fetch(countriesApi)).json();addToLocalStorage(e=e.filter(e=>"Israel"!==e.name.common),"countries-list")}countriesList=getFromLocalStorage("countries-list"),loadCountries(),loadRegions()})}function loadCountries(){countriesDiv.innerHTML="",countriesList.forEach(e=>{var t=document.createElement("div"),n=(t.className="country",document.createElement("div")),i=(n.className="flag",document.createElement("img")),i=(i.src=e.flags.svg,n.appendChild(i),t.appendChild(n),document.createElement("div")),n=(i.className="data",document.createElement("h2")),n=(n.innerHTML=e.name.common,i.appendChild(n),document.createElement("div")),o=(n.className="population",document.createElement("label")),a=(o.innerHTML="Population: ",document.createElement("span")),o=(a.innerHTML=e.population.toString(),n.appendChild(o),n.appendChild(a),i.appendChild(n),document.createElement("div")),a=(o.className="region",document.createElement("label")),n=(a.innerHTML="Region: ",document.createElement("span"));n.innerHTML=e.region,o.appendChild(a),o.appendChild(n),i.appendChild(o),void 0!==e.capital&&((a=document.createElement("div")).className="capital",(n=document.createElement("label")).innerHTML="Capital: ",(o=document.createElement("span")).innerHTML=e.capital.join(", "),a.appendChild(n),a.appendChild(o),i.appendChild(a)),t.appendChild(i),t.addEventListener("click",()=>{loadCountryDetails()}),countriesDiv.appendChild(t)})}function loadRegions(){var e=[...new Set(countriesList.map(e=>e.region).sort())];regionsList.innerHTML="",e.forEach(e=>{var t=document.createElement("option");t.value=e,t.innerHTML=e,regionsList.appendChild(t)})}function loadCountryDetails(){listDiv.style.display="none",detailesDiv.style.display="block"}function backToList(){null!==backBtn&&void 0!==backBtn&&backBtn.addEventListener("click",()=>{listDiv.style.display="block",detailesDiv.style.display="none"})}getCountries(),backToList();
//# sourceMappingURL=main.js.map