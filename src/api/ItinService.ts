import { ItinDetails } from "../types/ItinDetails";
import data from "../mock/mock";

async function getItinDetails(url: string): Promise<ItinDetails> {
  try {
    // const response = await fetch(url);
    // const data: ItinDetails = await response.json();
    // const data: ItinDetails =
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { getItinDetails };
