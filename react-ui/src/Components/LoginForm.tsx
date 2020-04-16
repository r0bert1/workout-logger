import * as React from 'react'
import { useState } from 'react'
import axios from 'axios'

interface Props {
  user: any
  setUser: React.Dispatch<any>
}

const LoginForm: React.FC<Props> = ({ user, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    const res = await axios.post('/api/login', { username, password })
    const user = res.data
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    setUser(user)
  }

  if (user) return null

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
