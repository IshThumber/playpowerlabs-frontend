import React, { useContext } from "react";
import { TimezoneContext } from "../../TimezoneContext";
import { Button } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const ReverseTimezones = () => {
  const { timezoneValues, setTimezoneValues } = useContext(TimezoneContext);

  const reverseTimezone = () => {
    if (timezoneValues.length <= 1) return;

    // reversing timezoneValues
    const reversedTimezoneValues = [...timezoneValues];
    reversedTimezoneValues.reverse();

    // reversing url
    const reversedTimezoneLabels = reversedTimezoneValues
      .map((timezone) => timezone.label.toLowerCase())
      .join("-to-");
    window.history.pushState({}, "", reversedTimezoneLabels);

    // updating timezoneValues
    setTimezoneValues(reversedTimezoneValues);
  };

  return (
    <Button onClick={reverseTimezone}>
      <SwapVertIcon />
    </Button>
  );
};

export default ReverseTimezones;
