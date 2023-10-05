/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import './App.css';
import {IAPICountry} from './Interface';
import { useDebounce } from './hooks/useDebounce';
import { Stack } from '@mui/joy';
import { Typography } from '@mui/joy';
import { Switch } from '@mui/joy';
import CountryCard from './Components/CountryCard'
import Filtres from './Components/Filtres'

/**Fonction permettant de mettre à jour notre site après que toutes les données aient été traitées. */
function Countries() {

  const [getCountry, setCountry] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const debouncedValue = useDebounce<string>(searchBar, 500);
  const [filter, setFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState<string>("");

    /** Récupération des données de l'API sous la forme json */
  const callApi = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const jsonResponse = await response.json();
    // console.log(jsonResponse);
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
      callApiName().then((result) => {
        // Vérifiez si la réponse contient des données
        if (result && result.length > 0) {
          setCountry(result);
        } else {
          setCountry([])
        }
    })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, searchBar, filter]);

  

// Call API filtré au clic sur un bouton

useEffect(() => {
  callApiFiltreRegion(filter).then((countries) => setCountry(countries))
}, [filter]);

useEffect(() => {
  if (currencyFilter) {
      callApiFiltreCurrency(currencyFilter).then((countries) => setCountry(countries));
  } else {
      // Handle the case when no currency filter is selected, maybe reset to all countries
      callApi().then((result) => setCountry(result));
  }
}, [currencyFilter]);

return(
  <Stack>
    <Switch startDecorator="Card" endDecorator="Table" />
    <Typography level='h1' sx={{fontSize: "3.5rem", mb: 3, textDecoration: "underline solid"}}>Liste des pays</Typography>
    <Stack>
      <Stack>
        <Filtres searchBar={searchBar} setSearchBar={setSearchBar} filter={filter} setFilter={setFilter} currencyFilter={currencyFilter} setCurrencyFilter={setCurrencyFilter}/>
      </Stack>
      <Stack direction="row" className='cardStack'>
        {getCountry.map((country: IAPICountry) => (
          <CountryCard key={country.name.common} m={country} />
        ))}
      </Stack >
    </Stack>
  </Stack>
);
}

export default Countries 

