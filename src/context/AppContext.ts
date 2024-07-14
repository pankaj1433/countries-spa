import { createContext } from "react";
import { ICountryTable } from "../types/country";

interface IAppContext {
  currentCountry?: ICountryTable;
  setCurrentCountry: (country?: ICountryTable) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleDrawer: () => void;
  setIsOnlyFavouritesVisible: (favourites: boolean) => void;
  isOnlyFavouritesVisible: boolean;
  seachText: string | undefined;
  setSeachText: (seachText: string) => void;
}

const AppContext = createContext<IAppContext>({
  setCurrentCountry: () => {},
  isOpen: false,
  setIsOpen: () => {},
  toggleDrawer: () => {},
  setIsOnlyFavouritesVisible: () => {},
  isOnlyFavouritesVisible: false,
  seachText: undefined,
  setSeachText: () => {},
});

export default AppContext;
