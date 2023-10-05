/* eslint-disable @typescript-eslint/no-unused-vars */
export interface Country {
    name: string;
    flag: string;
    alt: string;
    capital: string;
    region: string;
}

export interface IAPIRegion {
    region: string;
}

export interface IAPICurrency {
    currencies: string;
}

interface IAPIDem {
    f: string;
    m: string;
}

// Interface des langues
export interface IAPILanguage {
    official: string;
    common: string;
}

// Interface face des noms natifs
export interface IAPINativeName {
    [key: string]: IAPILanguage;
}

// Interface des noms (commun ou officiel)
interface IAPIName {
    common: string;
    official: string;
    nativeName?: IAPINativeName;
}

// Interface des drapeaux
interface IAPIFlags {
    png: string;
    svg: string;
    alt: string;
}


// Interface des demonyms
interface IAPIDemonyms {
    eng: IAPIDem;
}

// Interface des symboles des monnaies 
interface IAPISymbol {
    name: string;
    symbol: string;
}

// Interface des monnaies
export interface IAPICurrencies {
    [key: string]: IAPISymbol
}

// Interface des langues
interface IAPILang {
    languages: string;
}

// Interface des langues
interface IAPILangues {
    [key: string]: IAPILang
}

// Interface d'un pays
export interface IAPICountry {
    name: IAPIName;
    capital: string;
    flags: IAPIFlags;
    region: string;
    demonyms?: IAPIDemonyms;
    currencies?: IAPICurrencies;
    languages?: IAPILangues;
}

// const test: IAPICountry = {
//     name: {
//         common: "France",
//         official: "France",
//         nativeName: {
//             "fra": {
//                 official: "France",
//                 common: "France",
//             }
//         }
//     },
//     capital: "Paris",
//     flags: {
//         png: "afafzafza.png",
//         svg: "agaafaaaa.svg",
//         alt: "Drapeau de la France",
//     },
//     region: "Europe",
//     demonyms: {
//         eng: {  
//             f: "French",
//             m: "French",
//         },
//         // fra: {
//         //     f: "Française",
//         //     m: "Français",
//         // }
//     },

// }
// console.log(test)