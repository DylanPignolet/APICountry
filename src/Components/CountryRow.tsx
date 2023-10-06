import { IAPICountry} from '../Interface';
import DrawerCountry from './DrawerCountry';
import { Button } from '@mui/joy';
import { useState } from 'react';


function CountryTable({ m }: {m: IAPICountry}) {


    const nativeName = m.name.nativeName ? m.name.nativeName : "Inconnu";
    const natMap = Object.values(nativeName);
    const currencies = m.currencies ? m.currencies : "Inconnu";
    const currMap = Object.values(currencies);
    const languages = m.languages ? m.languages : "Inconnu";
    const langMap = Object.values(languages);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

        const openDrawer = () => {
            setIsDrawerOpen(true);
        };
        const closeDrawer = () => {
            setIsDrawerOpen(false);
        };

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
    },
    population: m.population,
    fifa: m.fifa,
    car: {
        signs: m.car.signs,
        side: m.car.side,
    },
    timezones: m.timezones,
    subregion: m.subregion,
    };

    return (
                <tr key={country.name?.common}>
                    <td>{country.name.common}</td>
                    <td>{m.name.nativeName ? natMap[0].common : <i>Inconnu</i>}</td>
                    <td>{country.capital ? country.capital : <i>Inconnu</i>}</td>
                    <td>{country.region}</td>
                    <td>{m.currencies ? currMap[0].name : <i>Inconnu</i>}</td>
                    <td>{m.currencies ? currMap[0].symbol : <i>Inconnu</i>}</td>
                    <td>{m.demonyms ? m.demonyms.eng.f : <i>Inconnu</i>}</td>
                    <td>{m.languages ? langMap[0]: <i>Inconnu</i>}</td>
                    <td><img
                        key="img"
                        src={String(country.flags?.svg) || ''}
                        alt={String(country.flags?.alt) || ''}
                        className="flagImgTable"
                    />
                    </td>
                    <td><Button onClick={openDrawer} sx={{width:'100%', borderRadius:'0', backgroundColor:'#70C9E7' }}>More</Button>
                        {isDrawerOpen && <DrawerCountry isOpen={isDrawerOpen} onClose={closeDrawer} m={m}/>}</td>
                </tr>
    )
}

export default CountryTable;
