export function formatTime(dateTimeStr) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  const dateTime = new Date(dateTimeStr);
  const formattedTime = dateTime.toLocaleString("en-US", options);
  return formattedTime;
}
