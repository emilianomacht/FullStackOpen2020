// const http = require('http')
const express = require("express");
const morgan = require("morgan");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token("JSON-POST", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :JSON-POST"));

let persons = [
  {
    name: "Arto Hellas",
    number: "22222222222",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "EMI",
    number: "1234890",
    id: 5
  }
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const personToSend = persons.find((person) => person.id === id);

  personToSend ? res.send(personToSend) : res.status(404).end();
});

app.get("/info", (req, res) => {
  const curDate = new Date();
  let stringToSend = `<p>Phonebook has info for ${persons.length} people</p>`;
  stringToSend += `<p>${curDate}</p>`;
  res.send(stringToSend);
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
  if (!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("number")) {
    return res.status(400).json({
      error: "Request must have name and number",
    });
  }

  const reqName = req.body.name.toString();
  if (persons.some((person) => person.name === reqName)) {
    return res.status(400).json({
      error: "Name already on phonebook",
    });
  }

  const newPerson = {
    name: reqName,
    number: req.body.number.toString(),
    id: Math.floor(Math.random() * 1000),
  };
  persons.push(newPerson);
  res.json(newPerson);
});

// const port = 3001;
// app.listen(port);
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
