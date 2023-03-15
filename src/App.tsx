import { useState } from 'react'
import ExpenseForm from './app/components/ExpenseForm'
import ExpesnesList from './app/components/ExpensesList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ width: "60%", margin: "auto" }}>
      <h3>New expense 2</h3>
      <ExpenseForm />
    <hr></hr>
      <h3>Your expenses</h3>
      <ExpesnesList />
    </div>
  )
}

export default App
