import { ItinDetails } from "../types/ItinDetails";
// import data from "../mock/mock";

async function getItinDetails(url: string): Promise<ItinDetails> {
  try {
    // Use the fetch API to POST the data
    const response = await fetch("http://127.0.0.1:5000/", {
      method: "POST", // Change the method to POST
      headers: {
        "Content-Type": "application/json", // Specify the content type in the headers
      },
      body: JSON.stringify({ url }), // Send the URL in the body as a JSON object
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }

    const data: ItinDetails = await response.json(); // Parse the JSON response into a TypeScript object
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

async function geoCode(address: string): Promise<google.maps.LatLngLiteral> {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to geocode address. HTTP status: ${response.status}`
      );
    }
    const data = await response.json();
    if (data.status !== "OK" || !data.results || data.results.length === 0) {
      throw new Error(
        `Failed to geocode address. Response status: ${data.status}`
      );
    }
    return data.results[0].geometry.location;
  } catch (error) {
    console.error("GeoCoding error:", error);
    throw error;
  }
}

export { getItinDetails, geoCode };
