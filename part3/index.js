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
  Person.findById(id).then((result) => {
    result !== null 
    ? res.json(result) 
    : res.status(404).end();
  }).catch(error => {
    console.log(error);
    res.status(404).end();
  });
});

app.get("/info", (req, res) => {
  const curDate = new Date();
  let stringToSend = '';
  Person.count({}).then(count => {
    stringToSend += `<p>Phonebook has info for ${count} people</p>`;
    stringToSend += `<p>${curDate}</p>`;
    res.send(stringToSend);
  })
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const personToDelete = persons.find((person) => person.id !== id);

  if (personToDelete) {
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
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
    number: req.body.number.toString()
  });

  newPerson.save().then(savedPerson => {
    res.json(newPerson);
  })
});

// const port = 3001;
// app.listen(port);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
