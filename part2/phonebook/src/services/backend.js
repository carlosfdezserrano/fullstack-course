import axios from 'axios'

const url = "http://localhost:3001/persons"

const retrievePersons = () => {
    console.log("retrieving persons...")
    const request = axios.get(url)
    return request
}

const putNewPerson = (newPerson) => {
    console.log("putting new person...")
    const request = axios.post(url,newPerson)
    return request
  }

  const deletePerson = (id) => {
    console.log("deleting person...")
    const request = axios.delete(url+"/"+id)
    return request
  }

const replaceNumber = (newPerson) => {
    console.log("replacing number...")
    const request = axios.put(url+"/"+newPerson.id, newPerson)
    return request
}
export default{putNewPerson, retrievePersons, deletePerson, replaceNumber}