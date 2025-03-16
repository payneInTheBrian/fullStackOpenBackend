require("dotenv").config();
const express = require('express')
const Person = require('./models/person')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

let persons = []


morgan.token('body', function getId(req) {
  return `${JSON.stringify(req.body)}`
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons)
    })
})

app.get('/info', (req, res) => {
  const date = new Date();
  Person.find({}).then(persons => {
    res.send(`<h3> Phonebook has info for ${persons.length} people </h3>
      <h3>${date}</h3>`
    )
  })

})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  // const generateId = () => {
  //   return Math.floor(Math.random() * 10000)
  // }

  const person = new Person({
    // id: generateId(),
    name: body.name,
    number: body.number,
  })
  // persons.find(person => person.name === body.name)
  //   ? res.status(400).json({
  //     error: 'name must be unique'
  //   })
  //   : console.log(person)
  // res.json(person)
  // persons = persons.concat(person)
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })

})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
