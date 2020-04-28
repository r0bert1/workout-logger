import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { Field, FieldArray, Form, Formik } from 'formik'
import { Select, MenuItem, Button } from '@material-ui/core'

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
  let history = useHistory()

  useEffect(() => {
    if (match.params.routineId) {
      fetch(`/api/logs/${user.id}/${match.params.routineId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
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

  const handleFinished = async (event) => {
    event.preventDefault()
    await axios.post('/api/workouts', { name, userId: user.id })
    history.push('/history')
  }

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: name,
          exercises: exercises,
        }}
        onSubmit={async (values) => {
          console.log(values)
          if (match.params.routineId) {
            console.log(match.params.routineId)
            await axios.post(`/api/logs/${user.id}/${match.params.routineId}`, {
              exercises: values.exercises,
            })
          } else {
            await axios.post('/api/workouts', {
              name: values.name,
              exercises: values.exercises,
              userId: user.id,
            })
          }
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <label>Workout name</label>
            <Field name={'name'} onChange={handleChange} />
            <br />
            <br />
            <FieldArray name="exercises">
              {({ push, replace }) => (
                <div>
                  {values.exercises.map((exercise, exerciseIndex) => {
                    return (
                      <div key={exerciseIndex}>
                        <h4>{exercise.name}</h4>
                        {exercise.sets.map((set, setIndex) => {
                          return (
                            <React.Fragment key={setIndex}>
                              <Field
                                name={`exercises[${exerciseIndex}].sets[${setIndex}].repetitions`}
                                onChange={handleChange}
                              />
                              x
                              <Field
                                name={`exercises[${exerciseIndex}].sets[${setIndex}].weight`}
                                onChange={handleChange}
                              />
                              kg
                              <Button
                                type="button"
                                onClick={() =>
                                  replace(exerciseIndex, {
                                    ...exercise,
                                    sets: exercise.sets.filter(
                                      (s, i) => i !== setIndex
                                    ),
                                  })
                                }
                              >
                                X
                              </Button>
                              <br />
                            </React.Fragment>
                          )
                        })}
                        <button
                          type="button"
                          onClick={() =>
                            replace(exerciseIndex, {
                              ...exercise,
                              sets: exercise.sets.concat({
                                repetitions: exercise.sets[0].repetitions,
                                weight: exercise.sets[0].weight,
                              }),
                            })
                          }
                        >
                          Add set
                        </button>
                        <br />
                        <br />
                      </div>
                    )
                  })}
                  <Select
                    value={newExercise}
                    onChange={(e) => setNewExercise(e.target.value)}
                  >
                    {exerciseNames.map((ex) => (
                      <MenuItem key={ex.id} value={ex.name}>
                        {ex.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    type="button"
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
                  <br />
                  <br />
                </div>
              )}
            </FieldArray>
            <div>
              <button type="submit">Finish</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default WorkoutForm
