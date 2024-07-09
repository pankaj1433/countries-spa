"use strict";

import { useMemo } from 'react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact } from '@ag-grid-community/react';
import { ColDef, ModuleRegistry, ValueFormatterParams } from '@ag-grid-community/core';

import useGetCountries from "../../hooks/useGetCountries"
import { ICountry } from "../../types/country";
import {
  LanguagesCell,
  CurrenciesCell
} from "./CellFormatters";
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import './allCountries.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AllCountries = () => {
  const { data, loading } = useGetCountries();
  const columnDefs = useMemo<ColDef<ICountry>[]>(() => ([
    { field: 'flag', pinned: 'left', minWidth: 50, width: 50, headerClass: 'flag-header' },
    {
      headerName: 'Country Name',
      field: 'name',
      sortable: true,
      filter: true,
      valueFormatter: (params: ValueFormatterParams) => params.value.common,
    },
    { field: 'population', sortable: true },
    {
      field: 'currencies',
      cellRenderer: CurrenciesCell,
      minWidth: 300
    },
    {
      field: 'languages',
      cellRenderer: LanguagesCell,
      minWidth: 500,
    },
  ]), []);

  const defaultColDef = useMemo<ColDef>(() => ({
    minWidth: 200,
    sortable: false,
    filter: false,
  }), []);

  return (
    <div className="ag-theme-quartz" style={{ height: '100vh', width: '100%' }}>
      <AgGridReact<ICountry>
        rowData={data}
        loading={loading}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={80}
      />
    </div>
  );
};

export default AllCountries;
