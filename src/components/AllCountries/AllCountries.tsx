import { useMemo, useContext, useCallback } from 'react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact } from '@ag-grid-community/react';
import { ColDef, ModuleRegistry, RowClickedEvent } from '@ag-grid-community/core';

import useGetCountries from "../../hooks/useGetCountries";
import { ICountry } from "../../types/country";
import {
  MultiValueCell,
  SingleValueCell
} from "./CellFormatters";
import SingleCountryContext from '../../context/SingleCountryContext'

import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import './allCountries.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AllCountries = () => {
  const { data, loading } = useGetCountries();
  const { setCurrentCountry, setIsOpen } = useContext(SingleCountryContext);

  const columnDefs = useMemo<ColDef<ICountry>[]>(() => ([
    {
      field: 'flag',
      pinned: 'left',
      minWidth: 50,
      width: 50,
      headerClass: 'flag-header',
      valueFormatter: "data.flag",
      cellRenderer: SingleValueCell,
    },
    {
      headerName: 'Country Name',
      field: 'name',
      valueGetter: "data.name.common",
      valueFormatter: "data.name.common",
      sortable: true,
      filter: true,
      floatingFilter: true,
      filterParams: {
        filterOptions: ['contains']
      },
      wrapText: true,
      cellRenderer: SingleValueCell,
    },
    {
      field: 'population',
      sortable: true,
      cellRenderer: SingleValueCell
    },
    {
      field: 'currencies',
      valueFormatter: "data.currencies&&Object.values(data.currencies).map((cur) => cur.name).join(',')",
      filter: true,
      floatingFilter: true,
      cellRenderer: MultiValueCell,
      minWidth: 300,
    },
    {
      field: 'capital',
      valueFormatter: "data.capital&&data.capital.join(',')",
      valueGetter: "data.capital&&data.capital.join(',')",
      sortable: true,
      cellRenderer: MultiValueCell,
      cellRendererParams: {
        hideBorder: true
      },
    },
    {
      field: 'languages',
      valueFormatter: "data.languages&&Object.values(data.languages).join(',')",
      cellRenderer: MultiValueCell,
      minWidth: 300,
      flex: 1
    },

  ]), []);

  const defaultColDef = useMemo<ColDef>(() => ({
    minWidth: 200,
    sortable: false,
    filter: false,
    autoHeight: true
  }), []);

  const handleRowClick = useCallback((event: RowClickedEvent<ICountry>) => {
    setCurrentCountry(event.data);
    setIsOpen(true);
  }, [setCurrentCountry, setIsOpen])

  return (
    <div className="ag-theme-quartz" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact<ICountry>
        rowData={data}
        loading={loading}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onRowClicked={handleRowClick}
      />
    </div>
  );
};

export default AllCountries;
