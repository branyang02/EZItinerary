import { Pane, Spinner } from "evergreen-ui";
import { useEffect, useState } from "react";
import { getItinDetails } from "../api/ItinService";
import TimeLine from "../components/TimeLine";
import { MapComponent } from "../components/Maps";
import { ItinDetails } from "../types/ItinDetails";

const Itinerary = ({ itineraryURL }: { itineraryURL: string }) => {
  const [itineraryDetails, setItineraryDetails] = useState<ItinDetails | null>(
    null
  );
  const [highlightedDay, setHighlightedDay] = useState<number | null>(null);

  const handleHighlightChange = (dayIndex: number | null) => {
    console.log("highlighted day:", dayIndex);
    setHighlightedDay(dayIndex);
  };

  useEffect(() => {
    if (itineraryURL) {
      getItinDetails(itineraryURL)
        .then(setItineraryDetails)
        .catch((error) => {
          console.error("Failed to fetch itinerary:", error);
        });
    }
  }, [itineraryURL]);

  if (!itineraryURL) {
    return null; // Ensuring a return value for all paths.
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
        <MapComponent />
      </Pane>
    </Pane>
  );
};

export default Itinerary;
