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
  
// READ: Get a single car by id
app.get('/api/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const cars = readCarsData();
    const car = cars.find(c => c.id === carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  });
  
// UPDATE: Modify an existing car by id
app.put('/api/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const updatedCar = req.body;
    const cars = readCarsData();
    const carIndex = cars.findIndex(c => c.id === carId);
  
    if (carIndex === -1) {
      return res.status(404).json({ error: "Car not found" });
    }
  
    // Update car details
    cars[carIndex] = { ...cars[carIndex], ...updatedCar };
    writeCarsData(cars);
    res.json(cars[carIndex]);
  });

  // DELETE: Remove a car by id
app.delete('/api/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const cars = readCarsData();
    const carIndex = cars.findIndex(c => c.id === carId);
  
    if (carIndex === -1) {
      return res.status(404).json({ error: "Car not found" });
    }
  
    // Remove the car
    cars.splice(carIndex, 1);
    writeCarsData(cars);
    res.status(204).send();
  });
  
  


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
