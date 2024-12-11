const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const carsFilePath = path.join(__dirname, 'cars.json');

// Read the cars data from the JSON file
const readCarsData = () => {
  const data = fs.readFileSync(carsFilePath);
  return JSON.parse(data);
};

const writeCarsData = (cars) => {
  fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
};

// CREATE: Add a new car
//ADDED POST
app.post('/api/cars', (req, res) => {
  const newCar = req.body;
  const cars = readCarsData();
  newCar.id = cars.length ? cars[cars.length - 1].id + 1 : 1; // Auto increment the ID
  cars.push(newCar);
  writeCarsData(cars);
  res.status(201).json(newCar);
});

// READ: Get a list of all cars
app.get('/api/cars', (req, res) => {
    const cars = readCarsData();
    res.json(cars);
  });
  



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
