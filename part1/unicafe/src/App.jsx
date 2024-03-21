import { useState } from 'react'

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
    if (good === 0 && neutral === 0 && bad === 0){
      return(<p>No feedback given</p>)
    }
    const all = good + neutral + bad
    const average = (1*good + 0*neutral - 1*bad)/(good + neutral + bad)
    const positiveRatio = good/(good + neutral + bad)*100 + " %"
    return(
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positiveRatio} />
        </tbody>
      </table>
    )
}

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGood = () => setGood(good + 1)
  const giveNeutral = () => setNeutral(neutral + 1)
  const giveBad = () => setBad(bad + 1)
  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={giveGood} text="good" />
      <Button onClick={giveNeutral} text="neutral" />
      <Button onClick={giveBad} text="bad" />
      <Header text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App