import {
  Card,
  Dialog,
  Heading,
  ListItem,
  Pane,
  Paragraph,
  Spinner,
  Strong,
  UnorderedList,
} from "evergreen-ui";
import { useLocation, useNavigate } from "react-router-dom";
import { ItinDetails } from "../types/ItinDetails";
import { useEffect, useState } from "react";
import { getItinDetails } from "../api/ItinService";
import ItinTimeLine from "../components/TimeLine";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const countDays = (itinerary: ItinDetails) => {
  return itinerary.result.itinerary.length;
};

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

  const numDays = countDays(itineraryDetails);

  return (
    <Pane
      style={{ overflow: "auto", maxHeight: "100vh", alignItems: "center" }}
    >
      <Heading size={900} marginBottom={16}>
        Your {numDays}-Day Trip to {itineraryDetails.result.travel_location}
      </Heading>
      {itineraryDetails.result.itinerary.map((dayItinerary, index) => (
        <Card
          key={index}
          elevation={1}
          backgroundColor="white"
          padding={20}
          marginY={12}
          borderRadius={8}
        >
          <Heading size={600} marginBottom={16}>
            Day {dayItinerary.day}
          </Heading>
          <UnorderedList>
            {dayItinerary.activities.map((activity, activityIndex) => (
              <ListItem key={activityIndex} paddingY={8} borderBottom="default">
                <Strong size={500}>{activity.activity}</Strong>
                <Paragraph size={400} marginTop={8}>
                  {activity.description}
                </Paragraph>
              </ListItem>
            ))}
          </UnorderedList>
        </Card>
      ))}
    </Pane>
  );
};

export default Itinerary;
