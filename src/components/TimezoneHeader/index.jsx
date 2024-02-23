import { Box, Button, Grid, createTheme } from "@mui/material";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider } from "@emotion/react";
import moment from "moment-timezone";
import { TimezoneContext } from "../../TimezoneContext";
import SearchBar from "./SearchBar";
import MydatePicker from "./MydatePicker";
import ScheduleEvent from "./ScheduleEvent";
import ReverseTimezones from "./ReverseTimezones";
import LinkIcon from "@mui/icons-material/Link";
import ShareURL from "./ShareURL";

// we can use api to get all the timezones

const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "1px solid #ccc",
          "&:hover": {
            background: "#2196f3",
            color: "white",
          },
        },
      },
    },
  },
});

const Index = ({ selectedTheme, setselectedTheme }) => {
  const [datePicker, setDatePicker] = useState(dayjs());
  const [collapseOpen, setCollapseOpen] = useState(false);
  const { timezoneValues, setTimezoneValues } = useContext(TimezoneContext);

  const handleDateChange = (newValue) => {
    const dateTime = newValue;
    const year = dateTime.year();
    const month = dateTime.month();
    const day = dateTime.date();
    const hour = dateTime.hour();
    const minute = dateTime.minute();

    const updatedTimezoneValues = timezoneValues.map((timezone) => {
      const newDateTimeMoment = moment({ year, month, day, hour, minute }).tz(
        timezone.name
      );
      const newFormattedDateTime =
        newDateTimeMoment.format("DD:MM:YYYY hh:mm a");

      return {
        ...timezone,
        dateTime: newFormattedDateTime,
        dateTimeMoment: newDateTimeMoment,
        sliderValue: newDateTimeMoment.hour() * 60 + newDateTimeMoment.minute(),
      };
    });

    setDatePicker(newValue);
    setTimezoneValues(updatedTimezoneValues);
  };

  return (
    <Grid
      container
      sx={{
        border: "1px solid #e1e1e1",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.header",
        px: 2,
        py: 1,
      }}
    >
      <Grid item md={4} xs={4} sx={{ p: 0 }}>
        <SearchBar />
      </Grid>
      <Grid item md={8} xs={8} sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent:
              timezoneValues.length === 0 ? "flex-end" : "space-between",
            alignItems: "center",
          }}
        >
          {timezoneValues.length !== 0 && (
            <MydatePicker date={datePicker} onDateChange={handleDateChange} />
          )}
          <Box>
            <ThemeProvider theme={buttonTheme}>
              <ScheduleEvent />

              <ReverseTimezones />

              <Button onClick={() => setCollapseOpen(!collapseOpen)}>
                <LinkIcon />
              </Button>

              <Button onClick={() => setselectedTheme(!selectedTheme)}>
                <DarkModeIcon />
              </Button>
            </ThemeProvider>
          </Box>
        </Box>
      </Grid>
      <ShareURL collapseOpen={collapseOpen} />
    </Grid>
  );
};

export default Index;
