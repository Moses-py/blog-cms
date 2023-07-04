function getCurrentTime(): string {
  const date: Date = new Date();
  let hours: number = date.getHours();
  let minutes: number = date.getMinutes();
  let period: string = "AM";

  // Convert hours to 12-hour format and determine AM/PM
  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  // Add leading zeros to hours and minutes if necessary
  const formattedHours: string = hours.toString().padStart(2, "0");
  const formattedMinutes: string = minutes.toString().padStart(2, "0");

  // Construct the formatted time string
  const currentTime: string = `${formattedHours}:${formattedMinutes} ${period}`;

  return currentTime;
}

export default getCurrentTime;
