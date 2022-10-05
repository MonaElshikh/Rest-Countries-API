//#region  Declaration
const countriesApi = "https://restcountries.com/v3.1/all";
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
let result: Countries[];
//#endregion
//#region  Functions
async function getCountries() {
  let data = (await fetch(countriesApi)).json();
  result = await data;
  console.log("countries", result);
}
//#endregion
//#region  Calls
getCountries();
//#endregion
