const mongoose = require("mongoose");

function addPerson() {
  const argName = process.argv[3];
  const argNumber = process.argv[4];

  const person = new Person({
    name: argName,
    number: argNumber,
  });

  person.save().then((result) => {
    console.log(`added ${argName} number ${argNumber} to phonebook`);
    mongoose.connection.close();
  });
}

function listPersons() {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => console.log(person));
    mongoose.connection.close();
  });
}

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://herokuApp:${password}@cluster0-lkikw.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  listPersons();
} else if (process.argv.length === 5) {
  addPerson();
}
