import { useContext, useCallback } from "react";
import { Tooltip } from "react-tooltip";
import AppContext from "../../context/AppContext";

const Favourites = () => {
  const { setIsOnlyFavouritesVisible, isOnlyFavouritesVisible } =
    useContext(AppContext);

  const showFavourites = useCallback(() => {
    setIsOnlyFavouritesVisible(!isOnlyFavouritesVisible);
  }, [setIsOnlyFavouritesVisible, isOnlyFavouritesVisible]);

  return (
    <div>
      <Tooltip id="fav-tooltip" place="bottom-end" className="tooltip-custom" />
      <button
        onClick={showFavourites}
        data-tooltip-id="fav-tooltip"
        data-tooltip-content={
          !isOnlyFavouritesVisible
            ? "View Favourite Countries"
            : "View All Countries"
        }
      >
        {!isOnlyFavouritesVisible ? (
          <i className="fa fa-heart" />
        ) : (
          <i className="fa fa-globe" />
        )}
      </button>
    </div>
  );
};

export default Favourites;
