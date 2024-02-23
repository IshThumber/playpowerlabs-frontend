import { Box, Grid, TextField, Typography } from "@mui/material";
import moment from "moment-timezone";
import React from "react";
import { centeredBox, spaceBetweenJustifiedBox } from "./styles";

const TimezoneDetails = ({ timezone }) => {
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h5">{timezone.label}</Typography>
        </Grid>
        <Grid item xs={6} sx={centeredBox}>
          <TextField
            value={moment(timezone.dateTime, "DD:MM:YYYY hh:mm a").format(
              "hh:mm A"
            )}
            size="small"
          />
        </Grid>
        <Grid item xs={6} color="#999999">
          <Typography variant="body1">{timezone.fullForm}</Typography>
        </Grid>
        <Grid item xs={6} color="#999999">
          <Box sx={spaceBetweenJustifiedBox}>
            <Typography variant="body1">
              GMT {Math.floor(timezone.offset / 60)}:{timezone.offset % 60}
            </Typography>
            <Typography variant="body1">
              {moment(timezone.dateTime, "DD:MM:YYYY hh:mm a").format(
                "ddd, MMM D"
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TimezoneDetails;
