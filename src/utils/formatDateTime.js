const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getUTCFullYear();

  // Suffix for the day
  const daySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Covers 11th to 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${daySuffix(day)} ${month} ${year}`;
};

const formatTime = (timeString) => {
  const date = new Date(timeString);
  date.setHours(date.getHours() + 8);
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  let period = "A.M.";

  if (hours >= 12) {
    period = "P.M.";
    if (hours > 12) {
      hours -= 12;
    }
  } else if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`; // "10:00 A.M."
};

module.exports = { formatDate, formatTime };
