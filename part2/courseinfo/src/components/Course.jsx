const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
  return(
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <h3>total of {total} exercises</h3>
    </div>
  )
}

const Course = ({course}) => 
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>

export default Course