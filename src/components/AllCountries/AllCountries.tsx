import { useMemo, useContext, useCallback, useRef, useEffect } from "react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { AgGridReact } from "@ag-grid-community/react";
import {
  ColDef,
  ModuleRegistry,
  CellClickedEvent,
  GetRowIdParams,
  GetQuickFilterTextParams,
} from "@ag-grid-community/core";

import useGetCountries from "../../hooks/useGetCountries";
import { ICountryTable } from "../../types/country";
import {
  MultiValueCell,
  SingleValueCell,
  FavouriteCell,
} from "./CellFormatters";
import AppContext from "../../context/AppContext";

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./allCountries.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AllCountries = () => {
  const gridRef = useRef<AgGridReact<ICountryTable>>(null);
  const { countries, loading } = useGetCountries();
  const { setCurrentCountry, setIsOpen, isOnlyFavouritesVisible, seachText } =
    useContext(AppContext);

  const columnDefs = useMemo<ColDef<ICountryTable>[]>(
    () => [
      {
        field: "flag",
        pinned: "left",
        minWidth: 50,
        width: 50,
        headerClass: "no-header",
        valueFormatter: "data.flag",
        cellRenderer: SingleValueCell,
      },
      {
        field: "favourite",
        cellRenderer: FavouriteCell,
        pinned: "left",
        minWidth: 50,
        width: 50,
        headerClass: "no-header",
        enableCellChangeFlash: true,
        filter: true,
        getQuickFilterText: (
          params: GetQuickFilterTextParams<ICountryTable>,
        ) => {
          return params.value ? "favourite" : "";
        },
      },
      {
        headerName: "Country Name",
        field: "name",
        pinned: "left",
        valueGetter: "data.name.common",
        valueFormatter: "data.name.common",
        sortable: true,
        filter: true,
        floatingFilter: true,
        filterParams: {
          filterOptions: ["contains"],
        },
        wrapText: true,
        cellRenderer: SingleValueCell,
      },
      {
        field: "population",
        sortable: true,
        cellRenderer: SingleValueCell,
      },
      {
        field: "currencies",
        valueFormatter:
          "data.currencies&&Object.values(data.currencies).map((cur) => cur.name).join(',')",
        filter: true,
        floatingFilter: true,
        cellRenderer: MultiValueCell,
        minWidth: 300,
        getQuickFilterText: (
          params: GetQuickFilterTextParams<ICountryTable>,
        ) => {
          return (
            params.data.currencies &&
            Object.values(params.data.currencies)
              .map((cur) => `${cur.name} ${cur.symbol}`)
              .join(",")
          );
        },
      },
      {
        field: "capital",
        valueFormatter: "data.capital&&data.capital.join(',')",
        valueGetter: "data.capital&&data.capital.join(',')",
        sortable: true,
        cellRenderer: MultiValueCell,
        cellRendererParams: {
          hideBorder: true,
        },
      },
      {
        field: "languages",
        valueFormatter:
          "data.languages&&Object.values(data.languages).join(',')",
        cellRenderer: MultiValueCell,
        filter: true,
        floatingFilter: true,
        minWidth: 300,
        flex: 1,
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      minWidth: 200,
      sortable: false,
      filter: false,
      autoHeight: true,
    }),
    [],
  );

  const saveFavouritesToLocalStorage = useCallback((favourites: string[]) => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, []);

  const handleCellClicked = useCallback(
    (event: CellClickedEvent<ICountryTable>) => {
      if (event.column.getColId() === "favourite") {
        const country = event.data?.name.common ?? "";
        const rowNode = event.api.getRowNode(country);
        const favouritesCountries = new Set(
          JSON.parse(localStorage.getItem("favourites") || "[]"),
        );

        if (country && favouritesCountries.has(country)) {
          favouritesCountries.delete(country);
          rowNode?.setDataValue("favourite", false);
        } else {
          favouritesCountries.add(country);
          rowNode?.setDataValue("favourite", true);
        }
        saveFavouritesToLocalStorage(
          Array.from(favouritesCountries) as string[],
        );
        return;
      }
      //This opens drawer
      setCurrentCountry(event.data);
      setIsOpen(true);
    },
    [setCurrentCountry, setIsOpen, saveFavouritesToLocalStorage],
  );

  const getRowId = useCallback((params: GetRowIdParams<ICountryTable>) => {
    return params.data.name.common;
  }, []);

  useEffect(() => {
    if (!isOnlyFavouritesVisible) {
      gridRef.current?.api?.setFilterModel(null);
    } else {
      gridRef.current?.api?.setFilterModel({
        favourite: { filterType: "text", type: "true" },
      });
    }
  }, [gridRef, isOnlyFavouritesVisible]);

  return (
    <div className="ag-theme-quartz table-wrapper">
      <AgGridReact<ICountryTable>
        quickFilterText={seachText}
        ref={gridRef}
        rowData={countries}
        loading={loading}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onCellClicked={handleCellClicked}
        suppressCellFocus={true}
        getRowId={getRowId}
        paginationAutoPageSize={true}
        pagination={true}
      />
    </div>
  );
};

export default AllCountries;
