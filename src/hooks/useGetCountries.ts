
import { useEffect, useState } from "react";

import { APIService } from "../utils/APIService";
import { ICountry } from "../types/country";

interface IUseGetCountries {
  data: ICountry[],
  loading: boolean
}

const useGetCountries = (): IUseGetCountries => {
  const [loading, setLoading] = useState(true);
  const [allCountries, setAllCountries] = useState<ICountry[]>([]);

  const getCountriesData = async () => {
    const countries = await APIService.getInstance().get("all");
    setAllCountries(countries?.data);
    setLoading(false);
  }

  useEffect(() => {
    getCountriesData();
  }, []);

  return { data: allCountries, loading };
};

export default useGetCountries;