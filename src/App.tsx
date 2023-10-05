/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import './App.css';
import Card from '@mui/material/Card';
import {IAPICountry, IAPIRegion} from './Interface';
import { useDebounce } from './hooks/useDebounce';
import Button from '@mui/joy/Button';
import { Stack } from '@mui/joy';


/**Fonction permettant de mettre à jour notre site après que toutes les données aient été traitées. */
function Countries() {

  const [getCountry, setCountry] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const debouncedValue = useDebounce<string>(searchBar, 500);
  const [filter, setFilter] = useState("all");
  const [getRegions, setRegions] = useState([]);
  const [currencyFilter, setCurrencyFilter] = useState<string>("");
  const [currenciesArray, setCurrenciesArray] = useState<string[]>([]);


    /** Récupération des données de l'API sous la forme json */
  const callApi = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  };

const callApiFiltreRegion = async (filtre) => {
  const response = await fetch(`https://restcountries.com/v3.1/${filtre}`)
  const jsonResponse = await response.json();
  // console.log(jsonResponse);
  return jsonResponse;
};

const callApiFiltreCurrency = async (filtre) => {
  let apiUrl = "https://restcountries.com/v3.1/all";
  if (filtre) {
    apiUrl = `https://restcountries.com/v3.1/currency/${filtre}`;
  }
  const response = await fetch(apiUrl);
  const jsonResponse = await response.json();
  return jsonResponse;
};

  /** Récupération des données de l'API selon la propriété name en la comparant avec ce qui est saisi dans la barre de recherche */
  const callApiName = async () => {
    const responseName = await fetch(`https://restcountries.com/v3.1/name/${searchBar}`);
    const jsonResponseName = await responseName.json();
    // console.log(jsonResponseName);
    return jsonResponseName;
  }

  /* Récupération filtres régions */

  const callApiRegion = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=region`)
    const jsonResponse = await response.json();
    // console.log(jsonResponse);
    return jsonResponse;
  };

  const callApiCurrencies = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=currencies`)
    const jsonResponse = await response.json();
    // console.log(jsonResponse);
    return jsonResponse;
  };

  function handleChange(e) {
    setSearchBar(e.target.value);
  }

  useEffect(() => {
    /** Si la saisie effectuée est constituée de moins de 3 charactères
     *  Je retourne toutes les données de l'API*/
    if(searchBar.length < 3 || filter === "") {
      callApi().then(
        (result) => setCountry(result)
      ) 
    }
    /** Si une saisie est effectuée dans la barre de recherche
     *  Je retourne seulement les données des pays dont la propriété nom contient la même chaîne de caractères que la saisie
     */
    else if (searchBar.length >= 3) {
      setFilter("all");
      setCurrencyFilter("");
      callApiName().then(
        (result) => setCountry(result)
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, searchBar, filter]);

  const handleClick = (regionName) => {
    setFilter(regionName);
    setCurrencyFilter("");
    setSearchBar("");
  }

// Call API filtré au clic sur un bouton

useEffect(() => {
  callApiFiltreRegion(filter).then((countries) => setCountry(countries))
}, [filter]);


useEffect(() => {
  callApiRegion().then((result) => setRegions(result));
}, []);

const regionArray = getRegions;
const flatRegionArray = regionArray.map((item: IAPIRegion) => item.region).flat();
const newRegionArray = flatRegionArray.filter((value, index, self) => self.indexOf(value) === index);

const regionButtons = newRegionArray.map((region, index) => {
  const isDisabled = filter === `region/${region}`;
  return <Button name={`region/${region}`} key={index} onClick={() => handleClick(`region/${region}`)} disabled={isDisabled} sx={{color: (isDisabled ? "#70C9E7 !important" : "#FFF" ), backgroundColor: (isDisabled ? "#C9FCD3 !important" : "#70C9E7") , width: "7rem", fontSize: "1rem", mr:"4rem"}}>{region}</Button>
});
const isDisabled = filter === "all";
useEffect(() => {
  callApiCurrencies().then((result) => {
    if (Array.isArray(result)) {
      const currencyKeysArray = result
        .filter((item) => item.currencies && Object.keys(item.currencies).length > 0)
        .map((item) => Object.keys(item.currencies)[0])
        .filter((currencyCode, index, array) => array.indexOf(currencyCode) === index);

      setCurrenciesArray(currencyKeysArray);
    }
  });
}, []);

const handleCurrencyFilterChange = (event) => {
  setCurrencyFilter(event.target.value);
  setFilter("all");
  setSearchBar("");
};
const currencyOptions = currenciesArray.map((currency, index) => (
  <option key={index} value={currency}>{currency}</option>
));

useEffect(() => {
  callApiFiltreCurrency(currencyFilter).then((countries) => setCountry(countries))
}, [currencyFilter]);

return(
  <div>
    <h1>Liste des pays</h1>
    <div>
      <Stack>
      <input type="text" id='searchBar' onChange={handleChange} placeholder="Country..." value={searchBar}></input>
      </Stack>
      <Stack direction="row" spacing={2} mt={2} mb={2} ml={5}>
        <Button name='all' className='allButton' onClick={() => handleClick('all')} disabled={isDisabled} sx={{color: (isDisabled ? "#70C9E7 !important" : "#FFF" ), backgroundColor: (isDisabled ? "#C9FCD3 !important" : "#70C9E7") , width: "7rem", fontSize: "1rem", m:2}}>All</Button>
        <Stack>
          <Stack direction="row" justifyContent={'space-evenly'}>
            {regionButtons}
          </Stack>
          <Stack direction="row" justifyContent={"center"} mt={2} mr={30}>
            <select name={`currencies/${currencyFilter}`} value={currencyFilter} onChange={handleCurrencyFilterChange}><option value="">Sélectionnez une devise</option>{currencyOptions}</select>
          </Stack>
        </Stack>
      </Stack>
      
      <div className='cardStack'>{getCountry.map((m:IAPICountry)=>{

        /** Objet NativeName */
        const nativeName = m.name.nativeName ? m.name.nativeName : "Inconnu";
        /** Clés de l'objet NativeName */

        /**
         * Pour chaque clé de la propriété nativeName,
         * on récupère la valeur appartenant à la clef
         */
        const natMap = Object.values(nativeName);

        /** Objet Currencies */
        const currencies = m.currencies ? m.currencies : "Inconnu";
        /** Clés de l'objet NativeName */

        /**
         * Pour chaque clé de la propriété nativeName,
         * on récupère la valeur appartenant à la clef
         */
        const currMap = Object.values(currencies);

        /** Objet NativeName */
        const languages = m.languages ? m.languages : "Inconnu";
        /** Clés de l'objet NativeName */

        /**
         * Pour chaque clé de la propriété nativeName,
         * on récupère la valeur appartenant à la clef
         */
        const langMap = Object.values(languages);

        // if(m.demonyms === undefined || ! m.demonyms.eng.f) console.warn(`Demonyms absent pour ${m.name.common}`);

        /** Création de l'objet country qui va regrouper toutes les données récupérées dans l'API qui nous intéressent */
        const country: IAPICountry = {
          name: {
            common: m.name.common,
            official: m.name.official,
            nativeName: {
              natMapKey0: { 
                  official: m.name.nativeName ? natMap[0].official : "",
                  common: m.name.nativeName ? natMap[0].common : "" ,
              }
            }
          },
          flags: {
            png: m.flags.png,
            svg: m.flags.svg,
            alt: m.flags.alt
          },
          capital: m.capital,
          region: m.region,
          demonyms: {
            eng: {
              f: m.demonyms ? m.demonyms.eng.f : "",
              m: m.demonyms ? m.demonyms.eng.m : "",
            },
          },
          currencies: {
            currenciesKey: {
              name: m.currencies ? currMap[0].name : "",
              symbol: m.currencies ? currMap[0].symbol : "",
            },
          },
          languages: {
            languagesKey: m.languages ? langMap[0] : "",
          }
        };

        //console.log(`Pays ${country.name.common} - Gentillé ${country.demonyms?.eng.f}`);
        

        /** Création d'une div pour chaque élément d'information
         * Récupération de la donnée correspondant à l'information pour chaque div
         */
        return (
          <Card className='countryCard' key={country.name.common}>
            <div className='infoDiv'>
              <p className='infoName'>
                <b>Name:</b> {country.name.common}
              </p>
              <p className='info'>
                <b>Native name:</b> {m.name.nativeName ? natMap[0].common : <i>Inconnu</i>}
              </p>
              <p className='info'>
                <b>Capital:</b> {country.capital ? country.capital : <i>Inconnu</i>}
              </p>
              <p className='info'>
                <b>Region:</b> {country.region}
              </p>
              <p className='info'>
                <b>Monnaie:</b> {m.currencies ? currMap[0].name : <i>Inconnu</i>} 
              </p>
              <p className='info'>
                <b>Symbole : </b>{m.currencies ? currMap[0].symbol : <i>Inconnu</i>}
              </p>
              <p className='info'>
                <b>Gentilé : </b>{m.demonyms ? m.demonyms.eng.f : <i>Inconnu</i>}
              </p>
              <p className='info'>
                <b>Language : </b>{m.languages ? langMap[0]: <i>Inconnu</i>}
              </p>
            </div>
            <img key="img"
            src={country.flags.svg} 
            alt={country.flags.alt}
            className="flagImg" 
          />
          </Card>
        )
        })}</div>
    </div>
  </div>
);
}

export default Countries 

