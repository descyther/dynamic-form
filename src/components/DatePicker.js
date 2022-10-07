import React from "react";

const DatePicker = (props) => {
  const { input, setInput } = props;
  return (
    <>
      <input
        type="date"
        id="start"
        name="trip-start"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        min="2018-01-01"
        max="2100-12-31"
      />
    </>
  );
};

export default DatePicker;
