import { TextField } from "@mui/material";
import React, { useContext, useState, useRef, useCallback } from "react";
import { TimezoneContext } from "../../TimezoneContext";
import { timezoneOptions } from "../../timezoneOptions";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import debounce from "lodash.debounce";
import convertTimezones from "../../TimezoneConverter";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { timezoneValues, setTimezoneValues } = useContext(TimezoneContext);
  const [filteredTimezones, setFilteredTimezones] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  const debouncedSearch = debounce((value) => {
    setOpen(!!value);
    if (!!value.trim()) {
      const filteredTimezoneOptions = timezoneOptions.filter((timezone) =>
        timezone.label.toUpperCase().includes(value.trim().toUpperCase())
      );
      if (filteredTimezoneOptions.length === 0) {
        setOpen(false);
      }
      setFilteredTimezones(filteredTimezoneOptions);
    }
  }, 400);

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleTimezoneOnClick = (newValue) => {
    const isDuplicate = timezoneValues.some(
      (timezone) => timezone.name === newValue.name
    );
    if (isDuplicate) return;
    // add timezone conversation in url
    const sourceTimezone = window.location.pathname.split("/")[1];
    const targetTimezone = newValue.label.toLowerCase();
    let navigationPath = `/${targetTimezone}`;
    if (sourceTimezone) {
      navigationPath = `/${sourceTimezone}-to-${targetTimezone}`;
    }
    // Update the URL using window.history.pushState()
    window.history.pushState({}, "", navigationPath);
    const {
      sliderValue,
      dateTime,
      moment: dateTimeMoment,
    } = convertTimezones(newValue.name);
    const newTimezoneObj = {
      name: newValue.name,
      label: newValue.label,
      fullForm: newValue.fullForm,
      offset: dateTimeMoment._offset,
      dateTime,
      dateTimeMoment,
      sliderValue,
    };
    const updatedTimezones = [...timezoneValues, newTimezoneObj];
    setOpen(false);
    setSearchValue("");
    setTimezoneValues(updatedTimezones);
    setFilteredTimezones([]);
  };

  const popperStyle = {
    minWidth: anchorEl.current ? anchorEl.current.offsetWidth : "auto",
    marginTop: "8px",
  };

  return (
    <>
      <TextField
        size="small"
        placeholder="search and add timezone"
        variant="outlined"
        fullWidth
        value={searchValue}
        onChange={handleInputChange}
        inputRef={anchorEl}
        sx={{ minWidth: "100%" }}
      />
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        placement="bottom-start"
        style={popperStyle}
      >
        <Paper>
          <List>
            {filteredTimezones.map((timezone, index) => (
              <ListItem
                key={index}
                onClick={() => handleTimezoneOnClick(timezone)}
                sx={{ ":hover": { background: "#eaeaea", cursor: "pointer" } }}
              >
                <ListItemText primary={timezone.label} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </>
  );
};

export default SearchBar;
