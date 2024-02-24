import { ItinDetails } from "../types/ItinDetails";
import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

const interfaceString: string = `
interface Activity {
  activity: string;
  description: string;
  location: string;
}

interface DayItinerary {
  activities: Activity[];
  day: number;
}

interface ItineraryResult {
  itinerary: DayItinerary[];
  travel_location: string;
}
`;

async function makeString(url: string): Promise<string> {
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/?url=" + encodeURIComponent(url)
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // Rethrowing the error to be handled by the caller
  }
}

async function getItinDetails(url: string): Promise<ItinDetails> {
  try {
    const webString = await makeString(url);
    console.log("webString:", webString);
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `here is the full blog post of a travel itinerary: ${webString}. Process the detailed travel itinerary provided in the blog post and output a structured JSON object based on the interface ${interfaceString}.`,
        },
      ],
      model: "gpt-4-0125-preview",
    });

    const response = chatCompletion.choices[0].message.content;
    if (!response) {
      throw new Error("No response from OpenAI");
    }

    const data: ItinDetails = JSON.parse(response);
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
