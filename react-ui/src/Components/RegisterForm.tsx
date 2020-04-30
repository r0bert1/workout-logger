import * as React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { TextField, Button, Typography, Grid } from '@material-ui/core'

interface Props {
  setUser: React.Dispatch<any>
}

const RegisterForm: React.FC<Props> = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory()

  const handleRegister = async (event) => {
    event.preventDefault()
    const res = await axios.post('/api/register', { username, password })
    const user = res.data
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    setUser(user)
    history.push('/start')
  }

  return (
    <form onSubmit={handleRegister}>
      <Grid container spacing={3} style={{ marginTop: '30px' }}>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Typography variant="h6">Sign up</Typography>
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
          <Button type="submit">Submit</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default RegisterForm
