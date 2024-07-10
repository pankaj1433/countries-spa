import { useMemo, useContext, useCallback } from 'react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact } from '@ag-grid-community/react';
import { ColDef, ModuleRegistry, RowClickedEvent, RowSelectedEvent, FirstDataRenderedEvent, IRowNode } from '@ag-grid-community/core';

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
      headerClass: 'no-header',
      valueFormatter: "data.flag",
      cellRenderer: SingleValueCell,
    },
    {
      headerName: 'Country Name',
      field: 'name',
      pinned: 'left',
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
      headerCheckboxSelection: false,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
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
    console.log(event)
  }, [setCurrentCountry, setIsOpen]);


  const toggleFavorites = useCallback((event: RowSelectedEvent<ICountry>) => {
    if (event.source !== "checkboxSelected")
      return;
    const country = event.data?.name.common;
    const currentFavorites = localStorage.getItem("favorites");
    const favoritesCountries = currentFavorites
      ? new Set(JSON.parse(currentFavorites)) : new Set();

    if (country && favoritesCountries.has(country)) {
      favoritesCountries.delete(country);
    } else {
      favoritesCountries.add(country);
    }
    localStorage.setItem("favorites", JSON.stringify(Array.from(favoritesCountries)));
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent<ICountry>) => {
    const nodesToSelect: IRowNode<ICountry>[] = [];
    const currentFavorites = localStorage.getItem("favorites");
    const favoritesCountries = currentFavorites ? JSON.parse(currentFavorites) : [];

    params.api.forEachNode((node: IRowNode<ICountry>) => {
      if (favoritesCountries.includes(node.data?.name.common)) {
        nodesToSelect.push(node)
      }
    })

    params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact<ICountry>
        rowData={data}
        loading={loading}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={"multiple"}
        onRowClicked={handleRowClick}
        onRowSelected={toggleFavorites}
        onFirstDataRendered={onFirstDataRendered}
        suppressRowClickSelection={true}
        suppressRowDeselection={true}
        suppressCellFocus={true}
      />
    </div>
  );
};

export default AllCountries;
