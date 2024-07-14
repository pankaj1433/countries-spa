import { useState } from "react";

import Header from "./Header";
import AllCountries from "./AllCountries";
import SingleCountryDrawer from "./SingleCountryDrawer";
import AppContext from "../context/AppContext";

import { ICountryTable } from "../types/country";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnlyFavouritesVisible, setIsOnlyFavouritesVisible] = useState(false);
  const [seachText, setSeachText] = useState<string>();

  const [currentCountry, setCurrentCountry] = useState<
    ICountryTable | undefined
  >();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toggleDrawer,
        setCurrentCountry,
        currentCountry,
        isOnlyFavouritesVisible,
        setIsOnlyFavouritesVisible,
        seachText,
        setSeachText,
      }}
    >
      <Header />
      <AllCountries />
      <SingleCountryDrawer />
    </AppContext.Provider>
  );
};

export default App;
