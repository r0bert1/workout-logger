import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const Home: React.FC<{ user: any; setUser: React.Dispatch<any> }> = ({
  user,
  setUser,
}) => {
  let history = useHistory()

  const handleSignOut = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const handleToRegister = (e) => {
    e.preventDefault()
    history.push('/register')
  }

  if (!user) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Workout logger</Typography>
          <Button
            color="inherit"
            style={{ marginLeft: 'auto' }}
            onClick={handleToRegister}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>
    )
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/start">
          Start
        </Button>
        <Button color="inherit" component={RouterLink} to="/history">
          History
        </Button>
        <Button
          color="inherit"
          style={{ marginLeft: 'auto' }}
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Home
