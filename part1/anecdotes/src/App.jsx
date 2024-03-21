import { useState } from 'react'

const Header = ({text}) => {
  return(
    <h2>{text}</h2>
  )
}
const Anecdote = ({text}) => {
  return(
    <p>{text}</p>
  )
}

const Vote = ({votes}) => {
  return(
    <p>has {votes} votes</p>
  )
}
const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const [selected, setSelected] = useState(0)
  
  const [mostVotes, setMostVotes] = useState(0)

  const nextAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const voteAnecdote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
    const maxValue = Math.max(...copyVotes)
    const maxIndex = copyVotes.indexOf(maxValue);
    setMostVotes(maxIndex)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} />
      <Vote votes={votes[selected]} />
      <Button onClick={voteAnecdote} text="vote"/> 
      <Button onClick={nextAnecdote} text="next anecdote"/>
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[mostVotes]} />
      <Vote votes={votes[mostVotes]} />
    </div>
  )
}

export default App