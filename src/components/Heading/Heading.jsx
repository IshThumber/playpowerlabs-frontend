import { useContext } from "react";
import { TimezoneContext } from "../../TimezoneContext";

const Heading = () => {
  const { timezoneValues } = useContext(TimezoneContext);

  return (
    <>
      <h1>
        {timezoneValues.map((timezone) => timezone.label).join(" To ")}{" "}
        Converter
      </h1>
    </>
  );
};

export default Heading;
