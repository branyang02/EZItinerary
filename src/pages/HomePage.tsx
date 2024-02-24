import { Pane, Heading, TextInputField, SendMessageIcon } from "evergreen-ui";
import Itinerary from "./Itinerary";
import { useEffect, useRef, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [itineraryURL, setItineraryURL] = useState("");
  const placeholder = "Enter a destination, or a link to a travel blog";

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
        <Heading
          size={900}
          marginBottom={32}
          color={"#648DE5"}
          style={{ fontSize: "4rem" }}
        >
          Let's Redefine Travelling
        </Heading>
        <Pane display="flex">
          <TextInputField
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
            color="#648DE5"
            marginLeft={20}
            marginTop={19}
          />
        </Pane>
      </Pane>
      <Pane ref={itineraryRef}>
        <Itinerary itineraryURL={itineraryURL} />
      </Pane>
    </>
  );
}

export default App;
