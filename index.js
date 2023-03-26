const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to my index page!");
});

app.get("/api/posts/:year/:month/:day", (req, res) => {
    res.send(req.query);
});

app.get("/api/posts/:year/:month/:day", (req, res) => {
    res.send(req.params);
});

let carsArray = [
    {
        id: 1,
        name: "Honda"
    },

    {
        id: 2,
        name: "Suzuki"
    },

    {
        id: 3,
        name: "Toyota"
    }
];

app.get("/api/car", (req, res) => {
    res.send(carsArray);
});

// Added searching through GET and query parameter.
// Further improvement, separate searching through an id and name in respective search functions.
app.get("/api/car/search/", (req, res) => {
    let carSearchById = carsArray.find(car => car.id === parseInt(req.query.id));
    if (carSearchById) {
        res.send(carSearchById);   
        return;
    }

    let carSearchByName = carsArray.find(car => car.name === req.query.name);
    if (carSearchByName) {
        res.send(carSearchByName);   
        return;
    }

    const notFoundStatus = 404;
    res.status(notFoundStatus);
    res.send(`The car with the given ID: ${ req.query.id } and ${ req.query.name } was not found.`);   
});

app.get("/api/car/:id", (req, res) => {
    let car = carsArray.find(car => car.id === parseInt(req.params.id));
    if (!car) {
        const notFoundStatus = 404;
        res.status(notFoundStatus);
        res.send(`The car with the given ID: ${ req.params.id } was not found.`);   
        return;
    }

    res.send(car);
});

app.post("/api/car", (req, res) => {
    if (!req.body.name || req.body.name <= 1) {
        const badRequestStatus = 400;
        res.status(badRequestStatus);
        res.send(`The car with the given name of: ${ req.body.name } can't be less than 1 character or invalid.`);   
        return;
    }

    let car = {
        id: carsArray.length + 1,
        name: req.body.name
    };

    carsArray.push(car);
    res.send(car);
});

app.put("/api/car/:id", (req, res) => {
    let car = carsArray.find(car => car.id === parseInt(req.params.id));
    if (!car) {
        const notFoundStatus = 404;
        res.status(notFoundStatus);
        res.send(`The car with the given ID: ${ req.params.id } was not found.`);   
        return;
    }

    if (!req.body.name || req.body.name <= 1) {
        const badRequestStatus = 400;
        res.status(badRequestStatus);
        res.send(`The car with the given name of: ${ req.body.name } can't be less than 1 character or invalid.`);   
        return;
    }

    car.name = req.body.name;
    res.send(car);

});

app.delete("/api/car/:id", (req, res) => {
    let car = carsArray.find(car => car.id === parseInt(req.params.id));
    if (!car) {
        const notFoundStatus = 404;
        res.status(notFoundStatus);
        res.send(`The car with the given ID: ${ req.params.id } was not found.`);   
        return;
    }

    const carIndexToDelete = carsArray.indexOf(car);
    if (carIndexToDelete > -1) {
        carsArray.splice(carIndexToDelete, 1);
    }
    res.send(carsArray);
});

const portNumber = process.env.PORT || 3000;
app.listen(portNumber, () => {
    console.log(`Listening to ${ portNumber }`);
});