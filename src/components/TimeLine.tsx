import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { ItinDetails } from "../types/ItinDetails";
import React from "react";

const ItinTimeLine = ({
  itineraryDetails,
}: {
  itineraryDetails: ItinDetails;
}) => {
  return (
    <Timeline>
      {itineraryDetails.result.itinerary.map((dayItinerary, dayIndex) => (
        <React.Fragment key={dayIndex}>
          {/* Display the day as a heading */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {dayIndex < itineraryDetails.result.itinerary.length - 1 && (
                <TimelineConnector />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <strong>Day {dayItinerary.day}</strong>
            </TimelineContent>
          </TimelineItem>

          {/* Display activities for the day */}
          {dayItinerary.activities.map((activity, activityIndex) => (
            <TimelineItem key={activityIndex}>
              <TimelineSeparator>
                <TimelineDot />
                {activityIndex < dayItinerary.activities.length - 1 && (
                  <TimelineConnector />
                )}
              </TimelineSeparator>
              <TimelineContent>{activity.activity}</TimelineContent>
            </TimelineItem>
          ))}
        </React.Fragment>
      ))}
    </Timeline>
  );
};

export default ItinTimeLine;
