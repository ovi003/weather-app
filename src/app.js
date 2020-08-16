const express = require('express');
const path = require('path');
const hbs = require('hbs');
const moment = require('moment-timezone');
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
  res.render('index', {
    title: 'Home',
    name: 'Ovi',
  });
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
      return res.send({
        forecastData,
        location,
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
