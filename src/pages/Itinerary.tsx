import {
  Card,
  Heading,
  ListItem,
  Pane,
  Paragraph,
  Spinner,
  Strong,
  UnorderedList,
} from "evergreen-ui";
import { ItinDetails } from "../types/ItinDetails";
import { useEffect, useState } from "react";
import { getItinDetails } from "../api/ItinService";
import ItinTimeLine from "../components/TimeLine";

const Itinerary = ({ itineraryURL }: { itineraryURL: string }) => {
  const [itineraryDetails, setItineraryDetails] = useState<ItinDetails | null>(
    null
  );

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
    return;
  }

  if (!itineraryDetails) {
    return (
      <Pane>
        <Spinner />
      </Pane>
    );
  }

  return (
    // <Pane>
    //   <ItinTimeLine itineraryDetails={itineraryDetails} />
    // </Pane>
    <Pane
      style={{ overflow: "auto", maxHeight: "100vh", alignItems: "center" }}
    >
      <Heading size={900} marginBottom={16}>
        Your Day Trip to {itineraryDetails.result.travel_location}
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
