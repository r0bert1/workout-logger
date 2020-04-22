import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const WorkoutStart: React.FC = () => {
  const [routines, setRoutines] = useState([])

  useEffect(() => {
    fetch('/api/workouts')
      .then((res) => res.json())
      .then((data) => {
        setRoutines(data)
      })
  }, [])

  return (
    <div>
      <h3>Start from scratch</h3>
      <Link to="/new">Empty routine</Link>
      <h3>My Routines</h3>
      {routines.map((routine) => (
        <li key={routine.id}>
          <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
        </li>
      ))}
    </div>
  )
}

export default WorkoutStart
