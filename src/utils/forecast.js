const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/f432506c023ceeff4bf72b594b5d2e4d/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      const { temperature, precipProbability: chanceOfRain } = body.currently;

      const message =
        body.daily.data[0].summary +
        ` It is currently ${temperature} degrees out. There is a ${chanceOfRain}% chance of rain.`;

      callback(undefined, message);
    }
  });
};

module.exports = forecast;
