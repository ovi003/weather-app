const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const days = [
  'Saterday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

const getTodayDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const monthNo = date.getMonth();
  const dayNo = date.getDay();
  const todayDate = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  const hours = hour % 12 ? hours : 12;
  return (today = `${hours}:${minute}${ampm}, ${days[dayNo]}, ${months[monthNo]} ${todayDate}, ${year}`);
};
const getKelbinToCelcius = (kelbin) => {
  return parseFloat(kelbin - 272.15).toFixed(2) + '°C';
};
module.exports = {
  getTodayDate,
  getKelbinToCelcius,
};
