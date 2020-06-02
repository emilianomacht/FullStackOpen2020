// const http = require('http')
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("JSON-POST", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :JSON-POST"
  )
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  // res.json(persons);
  Person.find({}).then((result) => {
    res.json(result);
    // mongoose.connection.close();
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then((result) => {
      result !== null ? res.json(result) : res.status(404).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).end();
    });
});

app.get("/info", (req, res) => {
  const curDate = new Date();
  let stringToSend = "";
  Person.count({}).then((count) => {
    stringToSend += `<p>Phonebook has info for ${count} people</p>`;
    stringToSend += `<p>${curDate}</p>`;
    res.send(stringToSend);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ error: "Request must have name and number" });
  }

  if (!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("number")) {
    return res.status(400).json({
      error: "Request must have name and number",
    });
  }

  const newPerson = new Person({
    name: req.body.name.toString(),
    number: req.body.number.toString(),
  });

  newPerson.save().then((savedPerson) => {
    res.json(newPerson);
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedperson => {
      response.json(updatedperson)
    })
    .catch(error => next(error))
})

// const port = 3001;
// app.listen(port);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
