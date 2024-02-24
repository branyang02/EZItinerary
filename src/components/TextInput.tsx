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
  );
};

export default TextInputComponent;
