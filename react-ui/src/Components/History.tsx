import * as React from 'react'
import { useEffect, useState } from 'react'

interface Props {
  user: any
}

const History: React.FC<Props> = ({ user }) => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch(`/api/logs/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setLogs(data)
      })
  }, [])

  return (
    <div>
      <h3>Completed workouts</h3>
      <table>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.name}</td>
              <td>{log.datetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default History
