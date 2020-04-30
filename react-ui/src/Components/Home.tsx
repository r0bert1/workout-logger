import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'

const Home: React.FC<{ user: any; setUser: React.Dispatch<any> }> = ({
  user,
  setUser,
}) => {
  const handleSignOut = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={RouterLink} to="/start">
            Start
          </Button>
          <Button color="inherit" component={RouterLink} to="/history">
            History
          </Button>
          {user && (
            <Button
              color="inherit"
              style={{ marginLeft: 'auto' }}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Home
