import { Alert, Pane, Spinner } from "evergreen-ui";
import { useEffect, useState } from "react";
import { getItinDetails } from "../api/ItinService";
import TimeLine from "../components/TimeLine";
import { MapComponent } from "../components/Maps";
import { ItinDetails } from "../types/ItinDetails";
import { geoCode } from "../api/ItinService";

interface Locations {
  day: number;
  coordinates: google.maps.LatLngLiteral[];
}

const fetchCoordinatesByDay = async (
  itineraryDetails: ItinDetails
): Promise<Locations[]> => {
  const dayCoordinatesPromises = itineraryDetails.result.itinerary.map(
    async (dayItinerary) => {
      const activitiesCoordinates = await Promise.all(
        dayItinerary.activities.map((activity) => geoCode(activity.location))
      );
      return {
        day: dayItinerary.day,
        coordinates: activitiesCoordinates,
      };
    }
  );

  return Promise.all(dayCoordinatesPromises);
};

const Itinerary = ({ itineraryURL }: { itineraryURL: string }) => {
  const [itineraryDetails, setItineraryDetails] = useState<ItinDetails | null>(
    null
  );
  const [dayCoordinates, setDayCoordinates] = useState<Locations[] | null>(
    null
  );
  const [currentCoordinates, setCurrentCoordinates] = useState<
    google.maps.LatLngLiteral[]
  >([]);
  const [cityCoordinates, setCityCoordinates] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [error, setError] = useState<string | null>(null); // Error state

  const handleHighlightChange = (dayIndex: number | null) => {
    console.log("highlighted day:", dayIndex);

    if (dayIndex !== null && dayCoordinates) {
      const selectedDayCoordinates = dayCoordinates[dayIndex]?.coordinates;

      if (selectedDayCoordinates) {
        setCurrentCoordinates(selectedDayCoordinates);
        console.log("selectedDayCoordinates:", selectedDayCoordinates);
      } else {
        setCurrentCoordinates([]);
      }
    }
  };

  useEffect(() => {
    setError(null);
    setCurrentCoordinates([]);
    setItineraryDetails(null);
    setDayCoordinates(null);
    const fetchItineraryAndCoordinates = async () => {
      if (!itineraryURL) return;

      try {
        // 1. Fetch itinerary details
        const details = await getItinDetails(itineraryURL);
        setItineraryDetails(details);

        // 2. Fetch Destination City Coordinates
        const cityCoordinates = await geoCode(details.result.travel_location);
        setCityCoordinates(cityCoordinates);
        console.log("cityCoordinates:", cityCoordinates);

        console.log("itineraryDetails:", details);
        // 3. Fetch coordinates for each day
        const coordsByDay = await fetchCoordinatesByDay(details);
        setDayCoordinates(coordsByDay);
      } catch (error) {
        console.error("Failed to fetch itinerary or coordinates:", error);
        setError("Failed to fetch itinerary details. Please try again later.");
      }
    };

    fetchItineraryAndCoordinates();
  }, [itineraryURL]);

  if (error) {
    // Render error page or component when in error state
    return (
      <Pane
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert intent="danger" title={error} />
      </Pane>
    );
  }

  if (!itineraryURL) {
    return null;
  }

  if (!itineraryDetails) {
    return (
      <Pane
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner />
      </Pane>
    );
  }

  return (
    <Pane display="flex" height="100vh">
      <Pane flex="1" overflowY="scroll">
        <TimeLine
          itineraryDetails={itineraryDetails}
          onHighlightChange={handleHighlightChange}
        />
      </Pane>
      <Pane flex="1">
        <MapComponent
          locations={currentCoordinates}
          cityCoordinates={cityCoordinates}
        />
      </Pane>
    </Pane>
  );
};

export default Itinerary;
