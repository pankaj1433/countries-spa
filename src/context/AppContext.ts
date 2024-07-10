import { createContext } from "react";
import { ICountryTable } from "../types/country"

interface IAppContext {
  currentCountry?: ICountryTable;
  setCurrentCountry: (country?: ICountryTable) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleDrawer: () => void;
  setIsOnlyFavouritesVisible: (favourites: boolean) => void;
  isOnlyFavouritesVisible: boolean;
}

const AppContext = createContext<IAppContext>({
  setCurrentCountry: () => { },
  isOpen: false,
  setIsOpen: () => { },
  toggleDrawer: () => { },
  setIsOnlyFavouritesVisible: () => { },
  isOnlyFavouritesVisible: false
});

export default AppContext;
