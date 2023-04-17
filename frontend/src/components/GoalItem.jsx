import { useGoals } from '../context/goals/goalsContext'

function GoalItem({ goal }) {
  const {deleteGoal} = useGoals()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => deleteGoal(goal._id)} className='close'>
        X
      </button>
    </div>
  )
}

export default GoalItem