import * as React from 'react'
import { useEffect, useState } from 'react'

interface Props {
  user: any
}

const History: React.FC<Props> = ({ user }) => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch(`/api/logs/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setLogs(data)
      })
  }, [])

  return (
    <div>
      <h3>Completed workouts</h3>
      {logs.map(log => (
        <li key={log.id}>{log.name}</li>
      ))}
    </div>
  )
}

export default History
