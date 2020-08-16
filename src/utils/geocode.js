const axios = require("axios");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1Ijoib3ZpMDAzIiwiYSI6ImNrZGwza3Q4dDB1dXAycnBtOTcwMDc5NXgifQ.j4GgFYrNMF2cXVHxI4btGQ`;
  return axios
    .get(url)
    .then((res) => {
      if (res.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          latitude: res.data.features[1].center[1],
          longitude: res.data.features[1].center[0],
          location: res.data.features[1].place_name,
        });
      }
    })
    .catch((error) => {
      callback(error, undefined);
    });
};

module.exports = geocode;
