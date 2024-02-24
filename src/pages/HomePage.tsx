import { Pane, Heading } from "evergreen-ui";
import ArcsGlobe from "../components/ArcsGlobe";
import TextInputComponent from "../components/TextInput";
import "../styles/HomePage.css";

function App() {
  return (
    <Pane
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100vw",
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
        <Pane>
          <Heading
            size={900}
            marginBottom={32}
            color={"white"}
            style={{ fontSize: "4rem" }}
          >
            Let's Redefine Travelling
          </Heading>
          <TextInputComponent />
        </Pane>
      </Pane>
    </Pane>
  );
}

export default App;
