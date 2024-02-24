import { ItinDetails } from "../types/ItinDetails";
import data from "../mock/mock";

async function getItinDetails(url: string): Promise<ItinDetails> {
  try {
    // Assuming you want to fetch data from your own server which then fetches data from the provided `url`
    // Correctly use template literals for URL
    const response = await fetch(
      `http://127.0.0.1:5000/?url=${encodeURIComponent(url)}`
    );
    // Mock delay for testing purposes
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data: ItinDetails = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error after logging it
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
