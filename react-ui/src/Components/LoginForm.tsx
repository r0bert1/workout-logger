import * as React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { TextField, Button, Typography, Grid } from '@material-ui/core'

interface Props {
  user: any
  setUser: React.Dispatch<any>
}

const LoginForm: React.FC<Props> = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    const res = await axios.post('/api/login', { username, password })
    const user = res.data
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    setUser(user)
    history.push('/start')
  }

  return (
    <form onSubmit={handleLogin}>
      <Grid container spacing={3} style={{ marginTop: '30px' }}>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Typography variant="h6">Sign in</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <TextField
            label="Username"
            variant="outlined"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button type="submit">login</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default LoginForm
