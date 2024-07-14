import Favourites from "./Favourites";
import SearchBox from "./SearchBox";

import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Countires</h1>
      <SearchBox />
      <Favourites />
    </header>
  );
};

export default Header;
