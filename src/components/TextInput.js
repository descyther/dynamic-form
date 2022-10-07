import React from "react";

const TextInput = (props) => {
  const { type } = props.data;
  const { input, setInput } = props;
  return (
    <>
      {type === "text input" ? (
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      ) : (
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      )}
    </>
  );
};

export default TextInput;
