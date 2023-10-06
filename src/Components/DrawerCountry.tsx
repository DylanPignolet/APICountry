import Drawer from '@mui/joy/Drawer';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import { IAPICountry } from '../Interface';
import { Typography } from '@mui/joy';

interface DrawerCountryProps {
    isOpen: boolean;
    onClose: () => void;
    m: IAPICountry
}

function DrawerCountry({ isOpen, onClose, m}: DrawerCountryProps) {

    const nativeName = m.name.nativeName ? m.name.nativeName : "Inconnu";
    const natMap = Object.values(nativeName);
    const currencies = m.currencies ? m.currencies : "Inconnu";
    const currMap = Object.values(currencies);
    const languages = m.languages ? m.languages : "Inconnu";
    const langMap = Object.values(languages);

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
        <Box sx={{ display: 'flex' }}>
            <Button variant="outlined" color="neutral" onClick={onClose}>
                More
            </Button>
            <Drawer open={isOpen} onClose={onClose} anchor="right">
                <Box
                    role="presentation"
                    onClick={onClose}
                    onKeyDown={onClose}
                >
                    <List>
                        <ListItem>
                            <h2>{country.name.common}</h2> ({m.name.nativeName ? natMap[0].common : <i>Inconnu</i>} )
                        </ListItem>
                        <ListItem sx={{justifyContent: 'space-around'}}>
                            <Typography>
                                <b>Region: </b> {country.region}
                            </Typography>
                            <Divider orientation="vertical" sx={{ml:"1rem", mr:"1rem"}}/>
                            <Typography>
                                <b>Subregion: </b> {country.subregion}
                            </Typography>
                            <Divider orientation="vertical" sx={{ml:"1rem", mr:"1rem"}}/>
                            <Typography>
                                <b>Capital: </b>{country.capital ? country.capital : "Inconnu"}
                            </Typography>
                        </ListItem>
                        <Divider/>
                        <ListItem sx={{justifyContent: 'space-around'}}>
                            <Typography>
                                <b>Monnaie: </b>{m.currencies ? currMap[0].name : <i>Inconnu</i>}
                            </Typography>
                            <Divider orientation="vertical" sx={{ml:"1rem", mr:"1rem"}}/>
                            <Typography>
                                <b>Symbole: </b>{m.currencies ? currMap[0].symbol : <i>Inconnu</i>}
                            </Typography>
                        </ListItem>
                        <Divider/>
                        <ListItem sx={{justifyContent: 'space-around'}}>
                            <Typography>
                                <b>Gentilé: </b>{country.demonyms ? country.demonyms.eng.f : <i>Inconnu</i>}
                            </Typography>
                            <Divider orientation="vertical" sx={{ml:"1rem", mr:"1rem"}}/>
                            <Typography>
                                <b>Language: </b>{m.languages ? langMap[0]: <i>Inconnu</i>}
                            </Typography>
                        </ListItem>
                        <Divider/>
                        <ListItem sx={{justifyContent: 'space-around'}}>
                            <Typography>
                                <b>Population: </b>{m.population}
                            </Typography>
                            <Divider orientation="vertical" sx={{ml:"1rem", mr:"1rem"}}/>
                            <Typography>
                                <b>Fifa:</b> {m.fifa}
                            </Typography>
                        </ListItem>
                        <Divider/>
                        <ListItem sx={{justifyContent: 'space-around'}}>
                            <Typography>
                                <b>Signs: </b>{m.car.signs}
                            </Typography>
                            <Divider orientation="vertical" sx={{ml:"1rem", mr:"1rem"}}/>
                            <Typography>
                                <b>Side:</b> {m.car.side}
                            </Typography>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Typography>
                                <b>Timezones: </b>{m.timezones}
                            </Typography>
                        </ListItem>
                        <Divider/>
                        <ListItem sx={{justifyContent: 'space-around'}}>
                            <img
                                key="img"
                                src={String(country.flags?.svg) || ''}
                                alt={String(country.flags?.alt) || ''}
                                className="flagImgTable"
                            />
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </Box>
    );
}

export default DrawerCountry;