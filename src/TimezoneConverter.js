import moment from "moment-timezone";

const convertTimezones = (timezone) => {
  const currentTime = moment();
  const currentTimeInUserTimezone = moment.tz(currentTime, moment.tz.guess());
  const convertedTimeMoment = currentTimeInUserTimezone.tz(timezone);
  const formattedConvertedTime =
    convertedTimeMoment.format("DD:MM:YYYY hh:mm a");
  const sliderValue =
    convertedTimeMoment.hour() * 60 + convertedTimeMoment.minute();
  return {
    sliderValue,
    dateTime: formattedConvertedTime,
    moment: convertedTimeMoment,
  };
};

export default convertTimezones;
