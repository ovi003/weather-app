const express = require('express');
const path = require('path');
const hbs = require('hbs');
const utils = require('./utils/utils');
const PORT = process.env.PORT || 3000;

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebars config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set directory
app.use(express.static(publicDirectoryPath));

// Routes
app.get('', (req, res) => {
  return res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    image: 'example.jpg',
    name: 'Ovi',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ovi',
  });
});
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help artical not found',
    name: 'Ovi',
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address provided',
    });
  }
  geocode(req.query.address, (error, data) => {
    error && res.send({ error });
    const { latitude, longitude, location } = data;
    forecast(latitude, longitude, (error, forecastData) => {
      error && res.send({ error });
      const today = utils.getFullDate(
        forecastData.current.dt,
        forecastData.timezone
      );
      const temperature = utils.getKelbinToCelcius(forecastData.current.temp);
      const feelsLike = utils.getKelbinToCelcius(
        forecastData.current.feels_like
      );
      return res.send({
        today,
        temperature,
        location,
        feelsLike,
        weather: forecastData.current.weather[0],
        address: req.query.address,
      });
    });
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page Not Found',
    name: 'Ovi',
  });
});

app.listen(PORT);
