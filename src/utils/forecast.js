const axios = require('axios');

// const forecast = (latitude, longitude, callback) => {
//   const url =
//     'http://api.openweathermap.org/data/2.5/onecall?lat=' +
//     latitude +
//     '&lon=' +
//     longitude +
//     '&exclude=daily,hourly&appid=ad84aa67c8d41bc332984b7a5ba492fb';
//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback('Unable to connect to the weather service', undefined);
//     } else if (response.body.length === 0) {
//       callback('Unable to finde location', undefined);
//     } else {
//       callback(undefined, {
//         temp: response.body.current.temp,
//         date: response.body.current.dt,
//         sunrise: response.body.current.sunrise,
//         sunset: response.body.current.sunset,
//       });
//     }
//   });
// };

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.openweathermap.org/data/2.5/onecall?lat=' +
    latitude +
    '&lon=' +
    longitude +
    '&exclude=daily,hourly&appid=ad84aa67c8d41bc332984b7a5ba492fb';
  axios
    .get(url)
    .then((res) => {
      if (res.error) {
        callback('No location found', undefined);
      } else {
        callback(undefined, res.data);
      }
    })
    .catch((error) => {
      callback(error, undefined);
    });
};

module.exports = forecast;
