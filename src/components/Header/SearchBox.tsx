import { useContext, ChangeEvent, useCallback } from "react";

import AppContext from "../../context/AppContext";

const SearchBox = () => {
  const { setSeachText } = useContext(AppContext);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSeachText(event.target.value);
    },
    [setSeachText],
  );

  return (
    <input
      className="search-box"
      type="text"
      id="filter-text-box"
      placeholder="Search by Name, Language, Currency or Capital..."
      onInput={handleChange}
    />
  );
};

export default SearchBox;
