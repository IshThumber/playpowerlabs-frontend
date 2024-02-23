import { useContext, useEffect, useState } from "react";
import moment from "moment-timezone";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import TimezoneSlider from "../CustomSlider/TimezoneSlider";
import NoTimezone from "./NoTimezone";
import TimezoneDetails from "./TimezoneDetails";
import { timezoneOptions } from "../../timezoneOptions";
import { TimezoneContext } from "../../TimezoneContext";
import convertTimezones from "../../TimezoneConverter";
import { closeButtonStyles, boxStyles, dragIndicatorStyles } from "./styles";

const Index = () => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const { timezoneValues, setTimezoneValues } = useContext(TimezoneContext);

  useEffect(() => {
    const url = window.location.pathname.substring(1);
    const parts = url.split("/");
    if (!url) return;
    const timezonesFromURL = parts[0].toLowerCase().split("-to-");

    // remaining
    // to extract date and time
    // set date and time in all the timezones

    const timezoneValuesFromURL = timezonesFromURL.map((labelFromURL) =>
      timezoneOptions.find(
        (timezone) => timezone.label.toLowerCase() === labelFromURL
      )
    );

    const timezoneValuesWithDateTime = timezoneValuesFromURL.map((timezone) => {
      const dateTime = convertTimezones(timezone.name).dateTime;
      const dateTimeMoment = convertTimezones(timezone.name).moment;
      const sliderValue = dateTimeMoment.hour() * 60 + dateTimeMoment.minute();

      const newTimezoneObj = {
        name: timezone.name,
        label: timezone.label,
        fullForm: timezone.fullForm,
        offset: dateTimeMoment._offset,
        dateTime,
        dateTimeMoment,
        sliderValue,
      };
      return newTimezoneObj;
    });
    setTimezoneValues(timezoneValuesWithDateTime);
  }, []);

  const handleTime = (e) => {
    const currentValue = e.target.value;
    const updatedTimezoneValues = timezoneValues.map((timezone, index) => {
      let changedSlider = timezoneValues.filter(
        (timezone) => e.target.name === timezone.name
      );

      if (e.target.name !== timezone.name) {
        // change slidervalue when another slider change it's value
        const changedSlidersValue = changedSlider[0].sliderValue;
        const changedSlidersDateTime = changedSlider[0].dateTime;
        const currentSlidersValue =
          (timezone.sliderValue + currentValue - changedSlidersValue + 1440) %
          1440;

        // change time when another slider change it's value
        const parsedAnotherSlidersTime = moment(
          timezone.dateTime,
          "DD:MM:YYYY hh:mm a"
        );
        const newAnotherSlidersTime = parsedAnotherSlidersTime.add(
          currentValue - changedSlidersValue,
          "minutes"
        );
        const newFormattedTime =
          newAnotherSlidersTime.format("DD:MM:YYYY hh:mm a");

        return {
          ...timezone,
          sliderValue: currentSlidersValue,
          dateTime: newFormattedTime,
        };
      } else {
        const parsedChangedSlidersTime = moment(
          changedSlider[0].dateTime,
          "DD:MM:YYYY hh:mm a"
        );
        const newChangedSlidersTime = parsedChangedSlidersTime.add(
          currentValue - changedSlider[0].sliderValue,
          "minutes"
        );
        const newFormattedTime =
          newChangedSlidersTime.format("DD:MM:YYYY hh:mm a");

        return {
          ...timezone,
          sliderValue: currentValue,
          dateTime: newFormattedTime,
        };
      }
    });
    setTimezoneValues(updatedTimezoneValues);
  };

  const handleDeleteTimezone = (index) => {
    // deleting timezones
    const updatedTimezones = [...timezoneValues];
    updatedTimezones.splice(index, 1);

    // url part
    const updatedTimezonesLabels = updatedTimezones
      .map((timezone) => timezone.label.toLowerCase())
      .join("-to-");
    const newPath =
      updatedTimezonesLabels.length > 0 ? `/${updatedTimezonesLabels}` : "/";
    window.history.pushState({}, "", newPath);

    // updating timezones
    setTimezoneValues(updatedTimezones);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index != draggedIndex) {
      // updating timezones
      const updatedTimezoneValues = [...timezoneValues];
      const draggedTimezone = updatedTimezoneValues[draggedIndex];
      updatedTimezoneValues.splice(draggedIndex, 1);
      updatedTimezoneValues.splice(index, 0, draggedTimezone);

      // updating url
      const updatedTimezoneURL = updatedTimezoneValues
        .map((timezone) => timezone.label.toLowerCase())
        .join("-to-");
      window.history.pushState({}, "", updatedTimezoneURL);

      setTimezoneValues(updatedTimezoneValues);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <>
      {timezoneValues.length != 0 ? (
        timezoneValues.map((timezone, index) => {
          return (
            <Box
              key={index}
              sx={boxStyles}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`task-item ${index === draggedIndex && "dragged"}`}
            >
              <IconButton
                onClick={() => handleDeleteTimezone(index)}
                className="erase-timezone"
                sx={closeButtonStyles}
              >
                <CloseIcon />
              </IconButton>
              <Box
                sx={dragIndicatorStyles}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
              >
                <DragIndicatorIcon />
              </Box>
              <TimezoneDetails timezone={timezone} />
              <TimezoneSlider
                name={timezone.name}
                sliderValue={timezone.sliderValue}
                onChange={handleTime}
              />
            </Box>
          );
        })
      ) : (
        <>
          <NoTimezone />
        </>
      )}
    </>
  );
};

export default Index;
