
import { useEffect, useState } from "react";

import { APIService } from "../utils/APIService";

interface Country {
  id: number;
  name: string;
  email: string;
}

const useGetCountries = (): Country[] => {
  const [allCountries, setAllCountries] = useState([]);

  const getCountriesData = async () => {
    const countries = await APIService.getInstance().get("all");
    setAllCountries(countries?.data);
  }

  useEffect(() => {
    getCountriesData();
  }, []);

  return allCountries;
};

export default useGetCountries;