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

interface ItinDetails {
  result: ItineraryResult;
}

export type { ItinDetails };
