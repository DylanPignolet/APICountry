import { IAPICountry} from '../Interface';

function CountryTable({ m }: {m: IAPICountry}) {


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
                </tr>
    )
}

export default CountryTable;
