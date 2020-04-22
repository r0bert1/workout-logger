import * as React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import WorkoutStart from './Components/WorkoutStart'
import Home from './Components/Home'
import History from './Components/History'
import LoginForm from './Components/LoginForm'
import WorkoutForm from './Components/WorkoutForm'

const App: React.FC = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      setUser(JSON.parse(loggedInUserJSON))
    }
  }, [])

  return (
    <div className="App">
      <LoginForm user={user} setUser={setUser} />
      {user && (
        <BrowserRouter>
          <Route path="/" component={Home} />
          <Switch>
            <Route path="/start" component={WorkoutStart} />
            <Route
              path="/new"
              render={(props) => <WorkoutForm {...props} user={user} />}
            />
            <Route
              path="/routines/:routineId"
              render={(props) => <WorkoutForm {...props} user={user} />}
            />
            <Route path="/history" render={() => <History user={user} />} />
          </Switch>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
