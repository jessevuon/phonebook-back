const mongoose = require('mongoose')


const url = 'mongodb+srv://Rasjes:<password>@fullstack.htcts.mongodb.net/fullstack-persons'
mongoose.connect(url)

const personSchema = new mongoose.Schema ({
  name: String,
  number: String,
})
const Person = mongoose.model('Persons', personSchema);
if (process.argv.length<3) {
    Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
else{
const name = process.argv[2]
const number = process.argv[3]
const person = new Person({
  name: name,
  number: number,
})
person
  .save()
  .then(response => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}