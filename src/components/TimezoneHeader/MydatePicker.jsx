import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const MydatePicker = ({ date, onDateChange }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={date}
            onChange={(newValue) => onDateChange(newValue)}
            format="MMM DD, YYYY"
            sx={{ transform: "scale(0.8)" }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default MydatePicker;
