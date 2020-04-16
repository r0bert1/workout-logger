import * as React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

interface Props {
  user: any
}

const WorkoutForm: React.FC<Props> = ({ user }) => {
  const [name, setName] = useState('')
  let history = useHistory()

  const handleFinished = async event => {
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
