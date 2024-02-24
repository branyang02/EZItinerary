import React, { useState } from "react";
import { Pane, TextInputField, SendMessageIcon } from "evergreen-ui";

function createNewPathFromUrl(url: string): string {
  const pathWithSlash = url.replace(/(^\w+:|^)\/\/.*?\//, "/");
  const newPath = pathWithSlash.endsWith("/")
    ? pathWithSlash.slice(0, -1)
    : pathWithSlash;
  return newPath;
}

const TextInputComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const placeholder = "Enter a destination, or a link to a travel blog";

  const handleSend = () => {
    console.log("Send action triggered"); // Replace this with your actual send logic
  };

  return (
    <Pane position="relative" width="100%">
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
        width="100%"
      />
      <Pane
        position="absolute"
        top="50%"
        right="0"
        transform="translateY(-27%)"
        paddingRight={10}
      >
        <SendMessageIcon
          color="black"
          style={{ cursor: "pointer" }}
          onMouseOver={({ currentTarget }) => {
            currentTarget.style.color = "blue";
          }}
          onMouseOut={({ currentTarget }) => {
            currentTarget.style.color = "black";
          }}
          onClick={handleSend}
        />
      </Pane>
    </Pane>
  );
};

export default TextInputComponent;
