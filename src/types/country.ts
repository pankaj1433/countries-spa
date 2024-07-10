export interface ICountryName {
  common: string;
  nativeName: string;
}

export interface ICountryLanguages {
  [key: string]: string
}

export interface ICurrency {
  [key: string]: {
    name: string;
    symbol: string;
  }
}

interface IFlags {
  png: string;
  svg: string;
}

interface IMaps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface ICountry {
  area: number;
  name: ICountryName;
  flag: string;
  flags: IFlags;
  languages: ICountryLanguages;
  independent: boolean;
  currencies: ICurrency;
  continents: string[];
  altSpellings: string[];
  capital: string[];
  borders: string[];
  timezones: string[];
  population: number;
  maps: IMaps
}
