import { useCallback, useContext } from "react";
import Drawer from "react-modern-drawer";

import AppContext from "../../context/AppContext";
import MultiFieldChips from "./MultiFieldChips";

import "react-modern-drawer/dist/index.css";
import "./singleCountryDrawer.css";

const SingleCountryDrawer = () => {
  const { isOpen, currentCountry, setCurrentCountry, toggleDrawer } =
    useContext(AppContext);

  const handleClose = useCallback(() => {
    setCurrentCountry();
    toggleDrawer();
  }, [toggleDrawer, setCurrentCountry]);

  const currentFavorites = localStorage.getItem("favourites");

  const favouriteClass = currentFavorites?.includes(
    currentCountry?.name?.common ?? "",
  )
    ? "fav-active"
    : "";

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        className="single-country-wrapper"
        direction="right"
        size="40%"
        lockBackgroundScroll
      >
        {!currentCountry ? null : (
          <>
            <div className="drawer-header">
              <div className="flag-wrapper">
                <img
                  alt={currentCountry.name.common}
                  src={currentCountry.flags.svg}
                />
              </div>
              <div className="title-and-fav">
                <h2>{currentCountry.name.common}</h2>
                <button className={`${favouriteClass} fav-btn`}>&#9829;</button>
              </div>
              <div className="line-break" />
            </div>
            <div className="drawer-body">
              {!!currentCountry.languages && (
                <MultiFieldChips
                  title="Languages Spoken"
                  items={Object.values(currentCountry.languages)}
                />
              )}
              {!!currentCountry.population && (
                <MultiFieldChips
                  title="Population"
                  items={[currentCountry.population]}
                />
              )}
              {!!currentCountry.capital && (
                <MultiFieldChips
                  title="Capital"
                  items={currentCountry.capital}
                />
              )}
              {!!currentCountry.continents && (
                <MultiFieldChips
                  title="Continents"
                  items={currentCountry.continents}
                />
              )}
              {!!currentCountry?.borders && (
                <MultiFieldChips
                  title="Shares borders with"
                  items={currentCountry.borders}
                />
              )}
              {currentCountry.currencies &&
                !!Object.values(currentCountry.currencies) && (
                  <MultiFieldChips
                    title="Currencies"
                    items={Object.values(currentCountry.currencies).map(
                      (cur) => cur.name,
                    )}
                  />
                )}
              {!!currentCountry.timezones && (
                <MultiFieldChips
                  title="Timezones"
                  items={currentCountry.timezones}
                />
              )}
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};

export default SingleCountryDrawer;
