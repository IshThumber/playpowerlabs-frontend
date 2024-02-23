import { Box, Typography } from "@mui/material";
import React from "react";

const NoTimezone = () => {
  return (
    <>
      <Box
        height={100}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: "1rem",
            textAlign: "center",
          }}
        >
          Start by searching and adding time zone, city or town in the search
          box above
        </Typography>
      </Box>
    </>
  );
};

export default NoTimezone;
