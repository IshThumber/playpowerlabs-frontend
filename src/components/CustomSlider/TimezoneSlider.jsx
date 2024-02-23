// import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";

const marks = [
  { value: 0, label: "12 AM" },
  { value: 180, label: "3 AM" },
  { value: 360, label: "6 AM" },
  { value: 540, label: "9 AM" },
  { value: 720, label: "12 PM" },
  { value: 900, label: "3 PM" },
  { value: 1080, label: "6 PM" },
  { value: 1260, label: "9 PM" },
];

const TimezoneSlider = ({ name, sliderValue, onChange }) => {
  return (
    <>
      <Slider
        name={name}
        value={sliderValue}
        min={0}
        max={1439}
        onChange={onChange}
        step={1}
        marks={marks}
        sx={{
          "& .MuiSlider-thumb": {
            borderRadius: "1px",
          },
        }}
      />
    </>
  );
};

export default TimezoneSlider;
