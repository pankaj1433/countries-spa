import React from "react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import AllCountries from "./AllCountries";

const App = () => {

  return (
    <AllCountries />
  );
};

export default App;
