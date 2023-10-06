import Card from '@mui/material/Card';
import { Button, Stack } from '@mui/joy';
import { Typography } from '@mui/joy';
import { IAPICountry } from '../Interface';
import DrawerCountry from './DrawerCountry';
import { useState } from 'react';


function CountryCard({ m }: {m: IAPICountry}) {
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

        const [isDrawerOpen, setIsDrawerOpen] = useState(false);

        const openDrawer = () => {
            setIsDrawerOpen(true);
        };
        const closeDrawer = () => {
            setIsDrawerOpen(false);
        };
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

            //console.log(`Pays ${country.name.common} - Gentillé ${country.demonyms?.eng.f}`);
            

            /** Création d'une div pour chaque élément d'information
             * Récupération de la donnée correspondant à l'information pour chaque div
             */
            console.log('Alerte')
            return (
                <Card className='countryCard' key={country.name.common} sx={{ width: 600 }}>
                    <Stack sx={{justifyContent:'space-between'}}>
                        <Stack sx={{flexDirection:'row', justifyContent:'space-between', width:'100%', height:'100%'}}>
                            <Stack className='infoDiv' sx={{flexDirection:'column'}}>
                                <Typography className='infoName'>
                                    <b>Name:</b> {country.name.common}
                                </Typography>
                                <Typography className='info'>
                                    <b>Native name:</b> {m.name.nativeName ? natMap[0].common : <i>Inconnu</i>}
                                </Typography>
                                <Typography className='info'>
                                    <b>Capital:</b> {country.capital ? country.capital : <i>Inconnu</i>}
                                </Typography>
                                <Typography className='info'>
                                    <b>Region:</b> {country.region}
                                </Typography>
                                <Typography className='info'>
                                    <b>Monnaie:</b> {m.currencies ? currMap[0].name : <i>Inconnu</i>}
                                </Typography>
                                <Typography className='info'>
                                    <b>Symbole:</b> {m.currencies ? currMap[0].symbol : <i>Inconnu</i>}
                                </Typography>
                                <Typography className='info'>
                                    <b>Gentilé:</b> {m.demonyms ? m.demonyms.eng.f : <i>Inconnu</i>}
                                </Typography>
                                <Typography className='info'>
                                    <b>Language:</b> {m.languages ? langMap[0] : <i>Inconnu</i>}
                                </Typography>
                            </Stack>
                            <img
                                    key="img"
                                    src={country.flags.svg}
                                    alt={country.flags.alt}
                                    className="flagImg"
                                />
                        </Stack>
                        <Button onClick={openDrawer} sx={{width:'100%', borderRadius:'0', backgroundColor:'#70C9E7' }}>More</Button>
                        {isDrawerOpen && <DrawerCountry isOpen={isDrawerOpen} onClose={closeDrawer} m={m}/>}
                </Stack>
            </Card>
        )
}

export default CountryCard;