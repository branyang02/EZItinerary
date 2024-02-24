import { ItinDetails } from "../types/ItinDetails";

const data: ItinDetails = {
  result: {
    itinerary: [
      {
        activities: [
          {
            activity: "Visit the Ferry Building",
            description:
              "Explore local businesses and farmers market at the Ferry Building.",
            location: "Ferry Building, San Francisco",
          },
          {
            activity: "Explore North Beach and Chinatown",
            description:
              "Stroll through North Beach and Chinatown, experiencing the cultural and historical sites.",
            location: "North Beach and Chinatown, San Francisco",
          },
          {
            activity: "Visit Alcatraz at Night",
            description:
              "Take a night tour of the former federal prison, Alcatraz Island.",
            location: "Alcatraz Island, San Francisco",
          },
        ],
        day: 1,
      },
      {
        activities: [
          {
            activity: "Brunch at Zazie",
            description: "Enjoy brunch at Zazie in the NoPa neighborhood.",
            location: "Zazie, San Francisco",
          },
          {
            activity: "Visit Golden Gate Park",
            description:
              "Explore the attractions within Golden Gate Park like the Japanese Tea Garden and The De Young Museum.",
            location: "Golden Gate Park, San Francisco",
          },
          {
            activity:
              "Lands End Trail Hike and Sunset at the Golden Gate Bridge",
            description:
              "Hike the Lands End Trail for coastal views ending with a sunset at the Golden Gate Bridge.",
            location: "Lands End Trail to Golden Gate Bridge, San Francisco",
          },
        ],
        day: 2,
      },
      {
        activities: [
          {
            activity: "Breakfast + Coffee in NoPa",
            description:
              "Start the day with breakfast and coffee in the NoPa neighborhood.",
            location: "NoPa, San Francisco",
          },
          {
            activity: "Explore the Mission District",
            description:
              "Spend the day walking through the Mission District, enjoying its food, drinks, and Dolores Park.",
            location: "Mission District, San Francisco",
          },
        ],
        day: 3,
      },
      {
        activities: [
          {
            activity: "Choose Your Adventure - Wine Tasting or Hike in Marin",
            description:
              "Option to go wine tasting in Sonoma or hiking in Marin County plus Muir Woods.",
            location: "Sonoma or Marin County, San Francisco",
          },
        ],
        day: 4,
      },
    ],
    travel_location: "San Francisco",
  },
};

export default data;
