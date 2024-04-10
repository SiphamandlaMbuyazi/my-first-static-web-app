//create cars api using express
/*const express = require('express');
const app = express();


app.use(express.json());

const cars = require('./cars.json');

//get all cars
app.get('/cars', (req, res) => {
    res.json(cars);
});

//get car by id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(car => car.id === id);
    res.json(car);
});

//update car
app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    cars[index] = updatedCar;
    res.json(updatedCar);
});

//delete car
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    cars.splice(index, 1);
    res.json({ message: `Car with id ${id} deleted` });
});

//add car
app.post('/cars', (req, res) => {
    console.log(req);
    const newCar = req.body;
    console.log(newCar);
    cars.push(newCar);
    res.json(newCar);
});
//start app at localhost:3001
app.listen(3001, () => {
    console.log('Server started at http://localhost:3001');
});
const cars = require('./cars.json');

module.exports = async function (context, req) {
    context.res = {
        headers: {
            'Content-Type': 'application/json'
        },
        body: cars
    };
};*/

// Import necessary modules
const cars = require('./cars.json');

module.exports = async function (context, req) {
    // Check the HTTP method
    switch (req.method) {
        case 'GET':
            // Handle GET request to retrieve all cars
            context.res = {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: cars

            };
            break;



        case 'POST':
            // Handle POST request to add a new car
            try {
                // Parse the incoming JSON data
                const newCar = req.body;
                if (!newCar) {
                    context.res = {
                        status: 400,
                        body: 'Invalid request. Please provide car data.'
                    };
                    return;
                }
                // Add the new car to the cars array
                cars.push(newCar);
                // Return a success response
                context.res = {
                    status: 201,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: newCar
                };
            } catch (error) {
                // Handle any errors that occur during the POST operation
                context.res = {
                    status: 500,
                    body: `Error adding car: ${error.message}`
                };
            }
            break;

        case 'DELETE':
            // Handle DELETE request to remove a car
            try {
                const index = parseInt(req.query.index); // Parse the index from the request query
                if (isNaN(index) || index < 0 || index >= cars.length) {
                    context.res = {
                    status: 400,
                    body: 'Invalid index provided.'
            };
            return;
        }
                cars.splice(index, 1);
                context.res = {
                    status: 200,
                    body: { message: `Car with index ${index} deleted successfully.` }
                };
            } catch (error) {
                // Handle any errors that occur during the DELETE operation
                context.res = {
                    status: 500,
                    body: `Error deleting car: ${error.message}`
                };
            }
            break;

        default:
            // Handle unsupported HTTP methods
            context.res = {
                status: 405,
                body: 'Method Not Allowed'
            };
            break;
    }
};