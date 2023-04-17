import { createContext, useContext, useState, useEffect } from 'react'
import goalService from './goalService'

const GoalContext = createContext()

export const useGoals = () => {
  return useContext(GoalContext)
}

const GoalProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [goals, setGoals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')


  const fetchGoals = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoading(true)
      goalService
        .getGoals(token)
        .then((res) => {
          setGoals(res)
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
          setIsError(true)
          setMessage(err.message)
        })
    }
  }

  const createGoal = async (goalData) => {
    try {
      const token = localStorage.getItem('token')
      setIsLoading(true)
      const res = await goalService.createGoal(goalData, token)
      setGoals([...goals, res])
      setIsLoading(false)
      setIsSuccess(true)
    } catch (err) {
      setIsLoading(false)
      setIsError(true)
      setMessage(err.message)
    }
  }

  const deleteGoal = async (id) => {
    try {
      const token = localStorage.getItem('token')
      setIsLoading(true)
      await goalService.deleteGoal(id, token)
      setGoals(goals.filter((goal) => goal._id !== id))
      setIsLoading(false)
      setIsSuccess(true)
    } catch (err) {
      setIsLoading(false)
      setIsError(true)
      setMessage(err.message)
    }
  }

  const reset = () => {
    setGoals([])
    setIsLoading(false)
    setIsError(false)
    setIsSuccess(false)
    setMessage('')
  }

  const value = {
    goals, user,
    isLoading,
    isError,
    isSuccess,
    message,
    createGoal,
    deleteGoal,
    reset,fetchGoals
  }

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>
}

export default GoalProvider

