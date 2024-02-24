import React, { useState } from "react";
import { Pane, TextInputField, SendMessageIcon } from "evergreen-ui";
import { useNavigate } from "react-router-dom";

const TextInputComponent: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const placeholder = "Enter a destination, or a link to a travel blog";

  const handleSend = () => {
    const baseUrl = "/itinerary";
    const params = new URLSearchParams();

    params.append("url", value);

    const finalUrl = `${baseUrl}?${params.toString()}`;

    navigate(finalUrl);
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
