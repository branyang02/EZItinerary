import React, { useState } from "react";
import { Pane, TextInputField } from "evergreen-ui";

const TextInputComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const placeholder = "Enter a destination, or a link to a travel blog";
  return (
    <Pane>
      <TextInputField
        value={value}
        inputHeight={48}
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
    </Pane>
  );
};

export default TextInputComponent;
