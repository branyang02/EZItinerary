import { Card, Pane } from "evergreen-ui";

const sampleItinerary = [
  {
    city: "New York",
    description: "Two days in New York City, and visit the Statue of Liberty",
    imageUrl: "https://source.unsplash.com/1600x900/?newyork",
  },
  {
    city: "Paris",
    description: "A week in Paris, and visit the Eiffel Tower",
    imageUrl: "https://source.unsplash.com/1600x900/?paris",
  },
  {
    city: "Tokyo",
    description: "Three days in Tokyo, and visit the Tokyo Tower",
    imageUrl: "https://source.unsplash.com/1600x900/?tokyo",
  },
];

const SampleItin = () => {
  return (
    <Pane display="flex" justifyContent="center" padding={16} flexWrap="wrap">
      {sampleItinerary.map((dest) => (
        <Card
          key={dest.city}
          elevation={4}
          backgroundColor="white"
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin={8}
          padding={16}
          width={300} // You can adjust the width as needed
          borderRadius={8}
          overflow="hidden" // Ensures the content does not spill out
        >
          <img
            src={dest.imageUrl}
            alt={dest.city}
            style={{
              width: "100%", // Makes image responsive
              height: "200px", // Fixed height for all images
              objectFit: "cover", // Ensures image covers the area, no stretch
            }}
          />
          <h3 style={{ margin: "16px 0 0" }}>{dest.city}</h3>
          <p style={{ textAlign: "center", margin: "8px 0" }}>
            {dest.description}
          </p>
        </Card>
      ))}
    </Pane>
  );
};

export default SampleItin;
