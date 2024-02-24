import React, { useEffect, useState } from "react";
import {
  Card,
  Heading,
  ListItem,
  Pane,
  Paragraph,
  Strong,
  UnorderedList,
} from "evergreen-ui";
import { ItinDetails } from "../types/ItinDetails";

const TimeLine = ({
  itineraryDetails,
  onHighlightChange,
}: {
  itineraryDetails: ItinDetails;
  onHighlightChange: (dayIndex: number | null) => void;
}) => {
  const [highlightedDay, setHighlightedDay] = useState<number | null>();

  // Function to toggle the highlighted day
  const toggleHighlight = (dayIndex: number) => {
    const newHighlight = highlightedDay === dayIndex ? null : dayIndex;
    setHighlightedDay(newHighlight);
    onHighlightChange(newHighlight);
  };

  useEffect(() => {
    toggleHighlight(0);
  }, []);

  return (
    <Pane>
      <Heading size={900} marginBottom={16}>
        Your Day Trip to {itineraryDetails.result.travel_location}
      </Heading>
      {itineraryDetails.result.itinerary.map((dayItinerary, index) => (
        <Card
          float="left"
          key={index}
          elevation={highlightedDay === index ? 4 : 1}
          padding={20}
          marginY={12}
          borderRadius={8}
          onClick={() => toggleHighlight(index)}
          cursor="pointer"
          width="100%"
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

export default TimeLine;
