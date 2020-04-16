import * as React from 'react'
import { Link } from 'react-router-dom'

const WorkoutStart: React.FC = () => {
  return (
    <div>
      <Link to="/new">New routine</Link>
    </div>
  )
}

export default WorkoutStart
