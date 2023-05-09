export const getTimeNow = () => {
  const now = new Date();

  // Get the hour, minute, and second values
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Format the time string as "hh:mm:ss"
  const timeString =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  // Output the formatted time string
  return timeString;
};
