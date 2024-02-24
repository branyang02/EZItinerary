import { ItinDetails } from "../types/ItinDetails";
import data from "../mock/mock";

async function getItinDetails(url: string): Promise<ItinDetails> {
  try {
    // const response = await fetch(url);
    // const data: ItinDetails = await response.json();
    // const data: ItinDetails =
    // mock delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function geoCode(address: string): Promise<google.maps.LatLngLiteral> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }`
  );
  const data = await response.json();
  return data.results[0].geometry.location;
}

export { getItinDetails, geoCode };
