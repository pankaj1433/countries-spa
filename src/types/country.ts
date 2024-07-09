interface ICountryName {
  common: string;
  nativeName: string;
}

interface ICountryLanguages {
  [key: string]: string
}

interface ICurrency {
  [key: string]: {
    name: string;
    symbol: string;
  }
}

export interface ICountry {
  area: number;
  name: ICountryName;
  flag: string;
  languages: ICountryLanguages;
  independent: boolean;
  currencies: ICurrency;
  continents: string[];
  altSpellings: string[];
  capital: string[];
  timezones: string[];
  population: number;
}
