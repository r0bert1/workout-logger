import * as React from 'react'
import { useState, useEffect } from 'react'

function App() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetch('/api/workouts')
      .then(res => res.json())
      .then(data => {
        setWorkouts(data)
      })
  }, [])

  return (
    <div className="App">
      <h1>Workouts</h1>
      {workouts.map(workout => (
        <li key={workout.id}>{workout.name}</li>
      ))}
    </div>
  )
}

export default App
