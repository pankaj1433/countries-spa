import { createContext } from "react";
import { ICountry } from "../types/country"

type SingleCountryContextType = {
  currentCountry?: ICountry;
  setCurrentCountry: (country?: ICountry) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleDrawer: () => void
}

const SingleCountryContext = createContext<SingleCountryContextType>({
  setCurrentCountry: () => { },
  isOpen: false,
  setIsOpen: () => { },
  toggleDrawer: () => { },
});

export default SingleCountryContext;
