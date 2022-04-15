//const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
let persons = [
    {
      name: 'Arto Hellas',
      number: '040-123456',
      id: 1
    },
    
    {
      name: 'Martti Tienari',
      number: '040-123456',
      id: 2
    },
    
    {
      name: 'Arto Järvinen',
      number: '040-123456',
      id: 3
    },
    {
      name: 'Lea Kutvonen',
      number: '040-123456',
      id: 4
    }
  ]
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
    }
  app.get('/', (req, res) => {
    res.json(persons)
  })
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id )
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
    
  })
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const person = request.body
    const body = request.body
    console.log(person)
    person.id = getRandomInt(10000000)
    if (body.name === undefined ){
      return response.status(400).json({error: 'name missing'})
    }
    else if (persons.filter(e => e.name === body.name).length > 0) {
      return response.status(400).json({error: 'name must be unique'})
    }
    if (body.number === undefined ){
      return response.status(400).json({error: 'number missing'})
    }
  response.json(person)
})
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
