# Car API

This is an API for managing a list of cars. The API performs CRUD operations (Create, Read, Update, Delete) on a JSON file that stores data.

## Endpoints

- `GET /api/cars` - Get all cars.
- `GET /api/cars/{id}` - Get a car by ID.
- `POST /api/cars` - Create a new car.
- `PUT /api/cars/{id}` - Update a car by ID.
- `DELETE /api/cars/{id}` - Delete a car by ID.

## Running the API

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm start` to start the API.
4. The API will be running on `http://localhost:3000`.

## Sample Data

The `cars.json` file contains sample data, which can be updated using the API. The file is automatically created when you add a car through the `POST` endpoint.

## Example Usage

### Create a new car

- **Endpoint**: `POST /api/cars`
- **Request body**:

```json
{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2022
}
