import { Pane, Spinner } from "evergreen-ui";
import { useEffect, useState } from "react";
import { getItinDetails } from "../api/ItinService";
import TimeLine from "../components/TimeLine";
import { MapComponent } from "../components/Maps";
import { ItinDetails } from "../types/ItinDetails";
import { geoCode } from "../api/ItinService";

interface Locations {
  day: number;
  coordinates: Coordinates[];
}
interface Coordinates {
  lat: number;
  lng: number;
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
  const [currentCoordinates, setCurrentCoordinates] = useState<Coordinates[]>(
    []
  );

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
    const fetchItineraryAndCoordinates = async () => {
      if (!itineraryURL) return;

      try {
        const details = await getItinDetails(itineraryURL);
        setItineraryDetails(details);

        const coordsByDay = await fetchCoordinatesByDay(details); // Use the updated function
        setDayCoordinates(coordsByDay);
      } catch (error) {
        console.error("Failed to fetch itinerary or coordinates:", error);
      }
    };

    fetchItineraryAndCoordinates();
  }, [itineraryURL]);

  if (!itineraryURL) {
    return null;
  }

  if (!cityCoordinates) {
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
        <MapComponent locations={currentCoordinates} />
      </Pane>
    </Pane>
  );
};

export default Itinerary;
