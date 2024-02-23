import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TimezoneContext } from "../../TimezoneContext";
import { urlStyles } from "../Timezone/styles";

const ShareURL = ({ collapseOpen }) => {
  const { timezoneValues, setTimezoneValues } = useContext(TimezoneContext);
  const [urlDatePicker, seturlDatePicker] = useState(dayjs());
  const [urlTime, setURLTime] = useState(dayjs());
  const [includeTime, setIncludeTime] = useState(false);
  const [includeDate, setIncludeDate] = useState(false);
  const [publicURL, setPublicURL] = useState(window.location.href);

  useEffect(() => {
    setPublicURL(window.location.href);
  }, [timezoneValues]);

  const handleIncludeTime = (e) => {
    const checked = e.target.checked;
    const urlArr = publicURL.split("/");
    let path = urlArr.slice(3);
    const time = urlTime.format("hh:mm-a");
    console.log(time);

    if (checked) {
      path.push(time);
      setPublicURL((prev) => prev + "/" + time);
    } else {
      const timeLenFromLast = publicURL.length - 9;
      let newPublicURL = publicURL.substring(0, timeLenFromLast);
      setPublicURL(newPublicURL);
    }
    setIncludeTime(!includeTime);
  };

  const handleIncludeDate = (e) => {
    const checked = e.target.checked;
    const urlArr = publicURL.split("/");
    let path = urlArr.slice(3);
    const date = urlDatePicker.format("DD:MM:YYYY");

    if (checked) {
      if (includeTime) {
        path.splice(1, 0, date);
        const timeLenFromLast = publicURL.length - 9;
        let newPublicURL = publicURL.substring(0, timeLenFromLast);
        newPublicURL += "/" + date + "/" + urlTime.format("hh:mm-a");
        setPublicURL(newPublicURL);
      } else {
        path.push(date);
        setPublicURL((prev) => prev + "/" + date);
      }
    } else {
      if (includeTime) {
        const includedTime = publicURL.substring(publicURL.length - 8);
        const dateTimeLenFromLast = publicURL.length - 20;
        let newPubicURL = publicURL.substring(0, dateTimeLenFromLast);
        setPublicURL(newPubicURL + "/" + includedTime);
      } else {
        const dateLenFromLast = publicURL.length - 11;
        let newPublicURL = publicURL.substring(0, dateLenFromLast);
        setPublicURL(newPublicURL);
      }
    }
    setIncludeDate(!includeDate);
  };

  return (
    <>
      <Collapse
        in={collapseOpen}
        timeout="auto"
        unmountOnExit
        sx={{ width: "100%" }}
      >
        <Box sx={{ padding: 2 }}>
          <TextField size="small" fullWidth id="URL" value={publicURL} />
          <Box sx={urlStyles}>
            <FormGroup id="time">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={includeTime}
                    onChange={(e) => handleIncludeTime(e)}
                  />
                }
                label="include time"
                id="include time"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimeField"]}>
                  <TimeField
                    size="small"
                    format="hh:mm a"
                    id="time-field"
                    value={urlTime}
                    onChange={(value) => setURLTime(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormGroup>
            <FormGroup id="date">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeDate}
                    onChange={(e) => handleIncludeDate(e)}
                  />
                }
                label="include date"
                id="include date"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]}>
                  <DateField
                    format="DD/MM/YYYY"
                    size="small"
                    value={urlDatePicker}
                    onChange={(newValue) => seturlDatePicker(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormGroup>
          </Box>
        </Box>
      </Collapse>
    </>
  );
};

export default ShareURL;
