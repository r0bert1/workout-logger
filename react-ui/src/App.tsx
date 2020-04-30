import * as React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import WorkoutStart from './Components/WorkoutStart'
import Home from './Components/Home'
import History from './Components/History'
import LoginForm from './Components/LoginForm'
import WorkoutForm from './Components/WorkoutForm'
import ProtectedRoute from './Components/ProtectedRoute'

const App: React.FC = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      setUser(JSON.parse(loggedInUserJSON))
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/"
          render={(props) => <Home {...props} user={user} setUser={setUser} />}
        />
        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <LoginForm {...props} user={user} setUser={setUser} />
            )}
          />
          <ProtectedRoute path="/start" user={user} component={WorkoutStart} />
          <ProtectedRoute path="/history" user={user} component={History} />
          <ProtectedRoute path="/new" user={user} component={WorkoutForm} />
          <ProtectedRoute
            path="/routines/:routineId"
            user={user}
            component={WorkoutForm}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
