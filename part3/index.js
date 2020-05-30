// const http = require('http')
const express = require("express");
const app = express();

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
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
