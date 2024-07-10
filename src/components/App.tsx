import { useState } from "react";
import AllCountries from "./AllCountries";
import SingleCountryDrawer from "./SingleCountryDrawer";
import SingleCountryContext from "../context/SingleCountryContext";
import { ICountry } from '../types/country'

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<ICountry | undefined>();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <SingleCountryContext.Provider value={{
      isOpen, setIsOpen, toggleDrawer, setCurrentCountry, currentCountry
    }}>
      <AllCountries />
      <SingleCountryDrawer />
    </SingleCountryContext.Provider>
  );
};

export default App;
