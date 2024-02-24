import { Dialog, Pane, Paragraph, Spinner } from "evergreen-ui";
import { useLocation, useNavigate } from "react-router-dom";
import { ItinDetails } from "../types/ItinDetails";
import { useEffect, useState } from "react";
import { getItinDetails } from "../api/ItinService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Itinerary = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const urlParam = query.get("url");
  const [itineraryDetails, setItineraryDetails] = useState<ItinDetails | null>(
    null
  );

  useEffect(() => {
    if (urlParam) {
      getItinDetails(urlParam)
        .then(setItineraryDetails)
        .catch((error) => {
          console.error("Failed to fetch itinerary:", error);
        });
    }
  }, [urlParam]);

  if (!urlParam) {
    return (
      <Pane>
        <Dialog
          isShown
          title="No URL provided"
          onCloseComplete={() => navigate("/")}
          hasFooter={false}
        >
          Please provide a URL to view the itinerary.
        </Dialog>
      </Pane>
    );
  }

  if (!itineraryDetails) {
    return (
      <Pane>
        <Spinner />
      </Pane>
    );
  }

  return (
    <Pane>
      <Paragraph>
        Itinerary for {itineraryDetails.result.travel_location}
      </Paragraph>
      {itineraryDetails.result.itinerary.map((dayItinerary, index) => (
        <Pane key={index}>
          <Paragraph>Day {dayItinerary.day}</Paragraph>
          {dayItinerary.activities.map((activity, activityIndex) => (
            <Pane key={activityIndex}>
              <Paragraph>{activity.activity}</Paragraph>
              <Paragraph>{activity.description}</Paragraph>
            </Pane>
          ))}
        </Pane>
      ))}
    </Pane>
  );
};

export default Itinerary;
