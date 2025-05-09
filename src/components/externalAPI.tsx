import axios from "axios";

const fetchCountries = async (): Promise<string[]> => {
  try {
    const response = await axios.get("https://api.first.org/data/v1/countries");
    const countryData = response.data.data;
    const countryNames = Object.values(countryData).map(
      (entry: any) => entry.country
    );
    return countryNames;
  } catch (error) {
    console.error("Failed to fetch countries: ", error);
    return [];
  }
};

export default fetchCountries;
