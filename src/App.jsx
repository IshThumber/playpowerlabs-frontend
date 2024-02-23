import { useState } from "react";
import Heading from "./components/Heading/Heading";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./components/TimezoneHeader";
import { TimezoneContext } from "./TimezoneContext";
import TimezoneBox from "./components/Timezone";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#21232A",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      header: "#f5f5f5",
    },
  },
});

const App = () => {
  const [timezoneValues, setTimezoneValues] = useState([]);
  const [selectedTheme, setselectedTheme] = useState(false); // true for dark theme

  return (
    <TimezoneContext.Provider value={{ timezoneValues, setTimezoneValues }}>
      <ThemeProvider theme={selectedTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Heading />
          <Container
            maxWidth="md"
            sx={{
              border: "1px solid #eaeaea",
              p: 3,
            }}
          >
            <Header selectedTheme={selectedTheme} setselectedTheme={setselectedTheme} />
            <TimezoneBox />
          </Container>
        </Container>
      </ThemeProvider>
    </TimezoneContext.Provider>
  );
};

export default App;
