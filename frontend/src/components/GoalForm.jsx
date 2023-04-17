import { useState } from 'react'
import { useGoals } from '../context/goals/goalsContext'

function GoalForm() {
  const [text, setText] = useState('')

  const {createGoal} = useGoals()

  const onSubmit = (e) => {
    e.preventDefault()

    createGoal({text})
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm