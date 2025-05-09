import axios from "axios";

export interface CountryInfo {
  name: string;
  region: string;
  flag: string;
}

export const fetchCountries = async (): Promise<CountryInfo[]> => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,continent,flag"
    );
    const countryData = response.data;
    const countryList: CountryInfo[] = countryData.map((entry: any) => ({
      name: entry.name?.common ?? "Unknown",
      region: entry.continents?.[0] ?? "Unknown",
      flag: entry.flag ?? "🏳️",
    }));

    return countryList;
  } catch (error) {
    console.error("Failed to fetch countries: ", error);
    return [];
  }
};
