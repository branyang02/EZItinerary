import { Pane, Heading, TextInputField, SendMessageIcon } from "evergreen-ui";
import { useEffect, useRef, useState } from "react";
import Itinerary from "./Itinerary";
import ArcsGlobe from "../components/ArcsGlobe";

function App() {
  const [value, setValue] = useState("");
  const [itineraryURL, setItineraryURL] = useState("");
  const placeholder = "Enter a link to a travel blog";

  const itineraryRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (value) {
      setItineraryURL(value);
      setValue("");
      setTimeout(() => {
        itineraryRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    if (itineraryURL) {
      console.log("Fetching itinerary details for:", itineraryURL);
    }
  }, [itineraryURL]);

  return (
    <>
      <Pane
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        overflow="auto"
      >
        <Pane
          position="absolute"
          top={0}
          marginTop={30}
          left="50%" // Set left to 50% of the parent container
          transform="translateX(-50%)"
          padding={30}
          alignItems="center"
          zIndex={2}
        >
          <Heading
            size={600}
            style={{ fontSize: "4rem" }}
            fontFamily="Baskerville,Baskerville Old Face,Hoefler Text,Garamond,Times New Roman,serif"
            color="#E7E5DF"
          >
            ItineTailor
          </Heading>
        </Pane>

        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            zIndex: 1,
          }}
        >
          <ArcsGlobe />
        </div>
        <Pane
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Heading
            size={900}
            marginBottom={32}
            color={"#E7E5DF"}
            style={{ fontSize: "4rem" }}
            fontFamily="Baskerville,Baskerville Old Face,Hoefler Text,Garamond,Times New Roman,serif"
          >
            Let's Redefine Travelling
          </Heading>
          <Pane display="flex">
            <TextInputField
              fontFamily="Baskerville,Baskerville Old Face,Hoefler Text,Garamond,Times New Roman,serif"
              value={value}
              inputHeight={48}
              placeholder={placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              width={400}
            />
            <SendMessageIcon
              size={24}
              cursor="pointer"
              onClick={handleSend}
              color="#E7E5DF"
              marginLeft={20}
              marginTop={19}
            />
          </Pane>
        </Pane>
      </Pane>
      <Pane ref={itineraryRef} clearfix>
        <Itinerary itineraryURL={itineraryURL} />
      </Pane>
    </>
  );
}

export default App;
