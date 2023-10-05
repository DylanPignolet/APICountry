import { useState, useEffect } from 'react';
import { Stack } from '@mui/joy';
import { TextField } from '@mui/material';
import Button from '@mui/joy/Button';
import { IAPIRegion } from '../Interface';

function Filtres({ searchBar, setSearchBar, filter, setFilter, currencyFilter, setCurrencyFilter }) {
    const [getRegions, setRegions] = useState([]);
    const [currenciesArray, setCurrenciesArray] = useState<string[]>([]);
    const regionArray = getRegions;
    const flatRegionArray = regionArray.map((item: IAPIRegion) => item.region).flat();
    const newRegionArray = flatRegionArray.filter((value, index, self) => self.indexOf(value) === index);
    
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

    const handleChange = (e) => {
        setSearchBar(e.target.value);
    }

    const handleClick = (regionName) => {
        setFilter(regionName);
        setCurrencyFilter("");
        setSearchBar("");
    }

    const regionButtons = newRegionArray.map((region, index) => {
        const isDisabled = filter === `region/${region}`;
        return (
            <Button
                name={`region/${region}`}
                key={index}
                onClick={() => handleClick(`region/${region}`)}
                disabled={isDisabled}
                sx={{
                    color: isDisabled ? "#70C9E7 !important" : "#FFF",
                    backgroundColor: isDisabled ? "#C9FCD3 !important" : "#70C9E7",
                    width: "7rem",
                    fontSize: "1rem",
                    mr: "4rem",
                }}
            >
                {region}
            </Button>
        );
    });

    const isDisabled = filter === "all";

    const handleCurrencyFilterChange = (event) => {
        const selectedCurrency = event.target.value;
        setCurrencyFilter(selectedCurrency);
        setFilter("all"); // Reset the region filter when selecting a currency
        setSearchBar(""); // Clear the search bar
    };

    const currencyOptions = currenciesArray.map((currency, index) => (
        <option key={index} value={currency}>
            {currency}
        </option>
    ));

    useEffect(() => {
        callApiRegion().then((result) => setRegions(result));
    }, []);

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

    return (
        <Stack>
            <Stack>
                <TextField type="text" id='searchBar' onChange={handleChange} placeholder="Country..." value={searchBar} />
            </Stack>
            <Stack direction="row" spacing={2} mt={2} mb={2} ml={5}>
                <Button
                    name='all'
                    className='allButton'
                    onClick={() => handleClick('all')}
                    disabled={isDisabled}
                    sx={{
                        color: isDisabled ? "#70C9E7 !important" : "#FFF",
                        backgroundColor: isDisabled ? "#C9FCD3 !important" : "#70C9E7",
                        width: "7rem",
                        fontSize: "1rem",
                        m: 2,
                    }}
                >
                    All
                </Button>
                <Stack>
                    <Stack direction="row" justifyContent={'space-evenly'}>
                        {regionButtons}
                    </Stack>
                    <Stack direction="row" justifyContent={"center"} mt={2} mr={30}>
                        <select name={`currencies/${currencyFilter}`} value={currencyFilter} onChange={handleCurrencyFilterChange}>
                            <option value="">Sélectionnez une devise</option>
                            {currencyOptions}
                        </select>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Filtres;