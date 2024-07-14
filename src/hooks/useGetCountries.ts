import { useEffect, useState } from "react";

import { APIService } from "../utils/APIService";
import { ICountry, ICountryTable } from "../types/country";

interface IUseGetCountries {
  countries: ICountryTable[];
  loading: boolean;
}

const useGetCountries = (): IUseGetCountries => {
  const [countries, setCountries] = useState<ICountryTable[]>([]);
  const [loading, setLoading] = useState(true);

  const getCountriesData = async () => {
    const countries: { data: ICountry[] } =
      await APIService.getInstance().get("all");
    const countriesData: ICountry[] = countries.data;
    const savedFavorites = JSON.parse(
      localStorage.getItem("favourites") || "[]",
    ) as string[];

    const updatedCountries: ICountryTable[] = countriesData.map(
      (country: ICountry) => ({
        ...country,
        favourite: savedFavorites.includes(country.name.common),
      }),
    );

    setCountries(updatedCountries);
    setLoading(false);
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  return { countries, loading };
};

export default useGetCountries;
