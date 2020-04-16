import * as React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
      <Link to="/start">Start workout</Link>
      <Link to="/history">Workout history</Link>
    </div>
  )
}

export default Home
