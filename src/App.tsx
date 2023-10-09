/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import './App.css';
import {IAPICountry} from './Interface';
import { useDebounce } from './hooks/useDebounce';
import { Grid, Stack } from '@mui/joy';
import { Typography } from '@mui/joy';
import { Switch } from '@mui/joy';
import CountryCard from './Components/CountryCard'
import Filtres from './Components/Filtres'
import CountryRow from './Components/CountryRow'
import Table from '@mui/joy/Table';
import CircularProgress from '@mui/joy/CircularProgress';

/**Fonction permettant de mettre à jour notre site après que toutes les données aient été traitées. */
function Countries() {

  const [getCountry, setCountry] = useState<IAPICountry[]>([]);
  const [searchBar, setSearchBar] = useState("");
  const debouncedValue = useDebounce<string>(searchBar, 500);
  const [filter, setFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

    /** Récupération des données de l'API sous la forme json */
  const callApi = async () => {
    setLoading(true);
    const response = await fetch("https://restcountries.com/v3.1/all")
    const jsonResponse = await response.json();
    setLoading(false)
    // console.log(jsonResponse);
    return jsonResponse;
  };

  const callApiFiltreRegion = async (filtre) => {
    setLoading(true);
    const response = await fetch(`https://restcountries.com/v3.1/${filtre}`)
    const jsonResponse = await response.json();
    setLoading(false)
    // console.log(jsonResponse);
    return jsonResponse;
  };

  const callApiFiltreCurrency = async (filtre) => {
    setLoading(true);
    let apiUrl = "https://restcountries.com/v3.1/all";
    if (filtre) {
        apiUrl = `https://restcountries.com/v3.1/currency/${filtre}`;
    }
    fetch(apiUrl).then(async (res) => {
      setLoading(false);
      setCountry(await res.json());
      // return res.json();
    })
    // const response = await fetch(apiUrl);
    // const jsonResponse = await response.json();
    // setLoading(false)
    
    // return jsonResponse;
  };

  /** Récupération des données de l'API selon la propriété name en la comparant avec ce qui est saisi dans la barre de recherche */
  const callApiName = async () => {
    setLoading(true);
    const responseName = await fetch(`https://restcountries.com/v3.1/name/${searchBar}`);
    const jsonResponseName = await responseName.json();
    setLoading(false)
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
        callApiFiltreCurrency(currencyFilter);
    } else {
        // Handle the case when no currency filter is selected, maybe reset to all countries
        callApi().then((result) => setCountry(result));
    }
  }, [currencyFilter]);

  if(checked) {
    return(
      <Stack>
      <Switch 
        startDecorator={<div style={{fontWeight:"700", color: '#00C674' }}>Card</div>}
        endDecorator={<div style={{fontWeight:"900", color: '#1F62F2' }}>Table</div>} checked={checked} onChange={(event) => setChecked(event.target.checked)} />
      <Typography level='h1' sx={{fontSize: "3.5rem", mb: 3, textDecoration: "underline solid"}}>Liste des pays</Typography>
      <Stack>
        <Stack>
          <Filtres searchBar={searchBar} setSearchBar={setSearchBar} filter={filter} setFilter={setFilter} currencyFilter={currencyFilter} setCurrencyFilter={setCurrencyFilter}/>
        </Stack>
        {loading ? (
        <Stack alignItems={'center'} mb={'30px'} mt={'150px'}>{<CircularProgress size="lg" variant="solid" />}</Stack> ) : (
        <Stack>
          <Table aria-label="basic table" sx={{textAlign:'left'}}>
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Native name</th>
                  <th>Capital</th>
                  <th>Region</th>
                  <th>Monnaie</th>
                  <th>Symbole</th>
                  <th>Gentilé</th>
                  <th>Language</th>
                  <th>Drapeau</th>
                  <th></th>
              </tr>
            </thead>
            <tbody>
              {getCountry.map((country: IAPICountry) => (
                <CountryRow key={country.name.common} m={country} />
              ))}
            </tbody>
          </Table>
        </Stack> )}
      </Stack>
    </Stack>
    )
  } else {
    return(
      <Stack>
      <Switch color={checked ? 'success' : 'success'}
    startDecorator={<div style={{fontWeight:"900", color: '#008E6F' }}>Card</div>}
    endDecorator={<div style={{fontWeight:"700", color: '#70C9E7' }}>Table</div>}
    checked={checked} onChange={(event) => setChecked(event.target.checked)} />
      <Typography level='h1' sx={{fontSize: "3.5rem", mb: 3, textDecoration: "underline solid"}}>Liste des pays</Typography>
      <Stack>
        <Stack>
          <Filtres searchBar={searchBar} setSearchBar={setSearchBar} filter={filter} setFilter={setFilter} currencyFilter={currencyFilter} setCurrencyFilter={setCurrencyFilter}/>
        </Stack>
        {loading ? (
        <Stack alignItems={'center'} mb={'30px'} mt={'150px'}>{<CircularProgress size="lg" variant="solid" />}</Stack> ) : (
        <Grid container spacing={2}>
          {getCountry.map((country: IAPICountry) => (
            <Grid key={country.name.common} xs={12} md={6}>
              <CountryCard  m={country} /> 
            </Grid>
          ))}
        </Grid > )}
      </Stack>
    </Stack>
    )
  }
}

export default Countries 

