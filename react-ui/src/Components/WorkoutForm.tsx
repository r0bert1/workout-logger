import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { Field, FieldArray, Form, Formik } from 'formik'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import {
  Select,
  MenuItem,
  Button,
  IconButton,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

interface Set {
  repetitions: number
  weight: number
}

interface Exercise {
  name: string
  sets: Set[]
}

interface Props extends RouteComponentProps<{ routineId: string }> {
  user: any
}

const WorkoutForm: React.FC<Props> = ({ user, match }) => {
  const [name, setName] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [newExercise, setNewExercise] = useState<any>('')
  const [exerciseNames, setExerciseNames] = useState([])
  const [disableAdding, setDisableAdding] = useState(true)
  let history = useHistory()

  useEffect(() => {
    if (match.params.routineId) {
      fetch(`/api/logs/${user.id}/${match.params.routineId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name)
          setExercises(data.exercises)
        })
    }

    fetch('/api/exercises')
      .then((res) => res.json())
      .then((data) => {
        setExerciseNames(data)
      })
  }, [])

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: name,
          exercises: exercises,
        }}
        onSubmit={async (values) => {
          if (match.params.routineId) {
            console.log(match.params.routineId)
            await axios.post(`/api/logs/${user.id}/${match.params.routineId}`, {
              exercises: values.exercises,
            })
          } else {
            await axios.post(`/api/workouts/${user.id}`, {
              name: values.name,
              exercises: values.exercises,
              userId: user.id,
            })
          }

          history.push('/history')
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Field
                style={{ marginTop: '30px' }}
                as={TextField}
                placeholder="Workout name"
                name={'name'}
                onChange={handleChange}
              />
            </div>
            <FieldArray name="exercises">
              {({ push, replace, remove }) => (
                <div>
                  {values.exercises.map((exercise, exerciseIndex) => {
                    return (
                      <div key={exerciseIndex} style={{ marginTop: '30px' }}>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell style={{ borderBottom: '0' }}>
                                  <Typography variant="h6" gutterBottom>
                                    {exercise.name}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Reps</TableCell>
                                <TableCell>Weight (kg)</TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {exercise.sets.map((set, setIndex) => {
                                return (
                                  <TableRow key={setIndex}>
                                    <TableCell>
                                      <Field
                                        as={TextField}
                                        type="number"
                                        min="0"
                                        name={`exercises[${exerciseIndex}].sets[${setIndex}].repetitions`}
                                        onChange={handleChange}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Field
                                        as={TextField}
                                        type="number"
                                        min="0"
                                        name={`exercises[${exerciseIndex}].sets[${setIndex}].weight`}
                                        onChange={handleChange}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <IconButton
                                        type="button"
                                        onClick={() => {
                                          if (exercise.sets.length == 1) {
                                            remove(exerciseIndex)
                                          } else {
                                            replace(exerciseIndex, {
                                              ...exercise,
                                              sets: exercise.sets.filter(
                                                (s, i) => i !== setIndex
                                              ),
                                            })
                                          }
                                        }}
                                      >
                                        <HighlightOffIcon color="error" />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                              <TableRow>
                                <TableCell style={{ borderBottom: '0' }}>
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      replace(exerciseIndex, {
                                        ...exercise,
                                        sets: exercise.sets.concat({
                                          repetitions:
                                            exercise.sets[0].repetitions,
                                          weight: exercise.sets[0].weight,
                                        }),
                                      })
                                    }
                                  >
                                    Add set
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    )
                  })}
                  <div style={{ marginTop: '30px' }}>
                    <Select
                      value={newExercise}
                      onChange={(e) => {
                        setNewExercise(e.target.value)
                        setDisableAdding(false)
                      }}
                    >
                      {exerciseNames.map((ex) => (
                        <MenuItem key={ex.id} value={ex.name}>
                          {ex.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      type="button"
                      disabled={disableAdding}
                      onClick={() => {
                        push({
                          name: newExercise,
                          sets: [{ repetitions: '', weight: '' }],
                        })
                        setNewExercise('')
                      }}
                    >
                      Add exercise
                    </Button>
                  </div>
                </div>
              )}
            </FieldArray>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" style={{ marginTop: '30px' }}>
                Finish
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default WorkoutForm
