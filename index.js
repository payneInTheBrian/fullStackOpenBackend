const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const date = new Date();
  res.send(`<h3> Phonebook has info for ${persons.length} people </h3>
                 <h3>${date}</h3>`
                )
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  person 
  ? res.json(person)
  : res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  //all req is content missing
  if(!body.content){
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const person = req.body
  if(!persons.find(person => person.name === body.name)){
    person.id = Math.floor(Math.random() * 10000)
    console.log(person)
    res.json(person)
    persons = persons.concat(person)
  }
 
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
} )

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
