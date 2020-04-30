import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Link, List, ListItem } from '@material-ui/core'

interface User {
  id: number
  username: string
}

const WorkoutStart: React.FC<{ user: User }> = ({ user }) => {
  const [routines, setRoutines] = useState([])

  if (!user) {
    return null
  }

  useEffect(() => {
    fetch(`/api/workouts/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setRoutines(data)
      })
  }, [])

  return (
    <div>
      <List>
        <ListItem>
          <Typography variant="h6">Start from scratch</Typography>
        </ListItem>
        <ListItem>
          <Link component={RouterLink} to="/new">
            <Typography variant="body1">Empty routine</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Typography variant="h6">My routines</Typography>
        </ListItem>

        {routines.map((routine) => (
          <ListItem key={routine.id}>
            <Link component={RouterLink} to={`/routines/${routine.id}`}>
              <Typography variant="body1">{routine.name}</Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default WorkoutStart
