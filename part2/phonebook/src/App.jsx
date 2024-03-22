import { useState, useEffect } from 'react'
import backend from './services/backend'

const Notification = ({message}) => {
  if (message.text === null) {
    return null
  }

  const goodNotificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginbottom: 10
  }

  const badNotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginbottom: 10
  }

  if (message.good)
  return (
    <div style={goodNotificationStyle}>
      {message.text}
    </div>
  )

  else
  return (
    <div style={badNotificationStyle}>
      {message.text}
    </div>
  )
}

const Filter = ({handleInput}) => <div> filter shown with <input onChange={handleInput}/></div>

const DeleteButton = ({name, id, onClick}) =>  <button onClick={onClick(name,id)}>delete</button>

const Person = ({id, name, number, onClick}) => <p>{name} {number} <DeleteButton name={name} id={id} onClick={onClick}/></p>

const PersonForm = ({handleName, handleNumber, handleNewPerson}) => 
      <form onSubmit={handleNewPerson}>
        <div> name: <input onChange={handleName}/></div>
        <div>number: <input onChange={handleNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>

const Persons = ({persons, filter, onClick}) => 
    <div key={Math.random()}>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} onClick={onClick}/>)}
    </div>

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState({text:null, good:null})

  useEffect( () => {
    backend.retrievePersons()
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
      })
    }, [])

    
  const handleInput = (name) => (event) => {
    console.log(name, event.target.value)
    if (name === "number") setNewNumber(event.target.value)
    if (name === "name") setNewName(event.target.value)
    if (name === "filter") setFilterName(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    console.log(persons)
    if (!persons.some(person => person.name === newName)) {
      const newPerson = {name:newName, number:newNumber}
      backend.putNewPerson(newPerson)
      .then(response => {
          console.log("success")
          backend.retrievePersons()
          .then(response => {
            console.log(response.data)
            setPersons(response.data)
            setMessage({text:`Added ${newName}`, good:true})
            setTimeout(() => setMessage({text:null, good:null}), 5000)
          })
          .catch(error => console.log("fail retrieval"))
          })
        .catch(error => console.log("fail"))
    }
    else{
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        let newPerson = persons.find(person => person["name"] === newName)
        newPerson = {...newPerson, number:newNumber}
        backend.replaceNumber(newPerson)
        .then(response => {
          console.log("success")
          const newPersons = persons.filter(person => person["name"] !== newName)
          setPersons(newPersons.concat(newPerson))
          setMessage({text:`Updated ${newName}`, good:true})
          setTimeout(() => setMessage({text:null, good:null}), 5000)
        })
        .catch(error => {
          console.log("removed from server")
          setMessage({text:`Information of ${newName} has already been removed from server`, good:false})
          setTimeout(() => setMessage({text:null, good:null}), 5000)
          backend.retrievePersons()
          .then(response => {
            console.log(response.data)
            setPersons(response.data)
          })
          .catch(error => console.log("fail retrieval"))
      })
      }
    }
  }

  const onClick = (name, id) => () => {
    if (window.confirm(`Delete ${name} ?`)) {
      backend.deletePerson(id)
      .then(response => {
        console.log("success delete")
        setPersons(persons.filter(person => person.id !== id))
        backend.retrievePersons()
        .then(response => {
          console.log(response.data)
          setPersons(response.data)
        })
        .catch(error => console.log("fail retrieval"))
      })
      
      .catch(error => console.log("failed delete"))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleInput={handleInput("filter")}/>
      <h3>add a new</h3>
      <PersonForm handleName={handleInput("name")} handleNumber={handleInput("number")} handleNewPerson={handleNewPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filterName} onClick={onClick}/>
    </div>
  )
}

export default App