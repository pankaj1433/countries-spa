import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import useGetCountries from "../../hooks/useGetCountries"

const AllCountries = () => {
  useGetCountries();

  return <div className="App">Countries</div>;
};

export default AllCountries;
