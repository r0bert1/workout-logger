import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date and time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.name}</TableCell>
              <TableCell>{log.datetime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default History
