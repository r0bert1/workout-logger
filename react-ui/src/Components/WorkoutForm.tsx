import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps<{ routineId: string }> {
  user: any
}

const WorkoutForm: React.FC<Props> = ({ user, match }) => {
  const [name, setName] = useState('')
  let history = useHistory()

  useEffect(() => {
    if (match.params.routineId) {
      fetch(`/api/logs/${user.id}/${match.params.routineId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name)
        })
    }
  }, [])

  const handleFinished = async (event) => {
    event.preventDefault()
    await axios.post('/api/workouts', { name, userId: user.id })
    history.push('/history')
  }

  return (
    <div>
      <form onSubmit={handleFinished}>
        <div>
          name
          <input
            type="text"
            value={name}
            name="Username"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <button type="submit">Finish</button>
      </form>
    </div>
  )
}

export default WorkoutForm
