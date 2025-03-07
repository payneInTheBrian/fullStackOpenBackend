const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


morgan.token('body', function getId (req) {
  return `${JSON.stringify(req.body)}`
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))



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
  res.send(index.html)
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
    if(!body.name){
      return res.status(400).json({
        error: 'name missing'
      })
    }

    if(!body.number){
      return res.status(400).json({
        error: 'number missing'
      })
    }
  

  const generateId = () => {
    return Math.floor(Math.random() * 10000)
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  persons.find(person => person.name === body.name)
    ? res.status(400).json({
      error: 'name must be unique'
    })
    : console.log(person)
    res.json(person)
    persons = persons.concat(person)
    
 
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
} )

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
