import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

export function Welcome() {
  const history = useHistory()
  
  const { user } = useContext(AuthContext)

  function handleGoBack() {
    history.push('/')
  }

  return (
    <>
      <h1>Welcome {user?.email}</h1>
      <button onClick={handleGoBack}>Voltar</button>
    </>
  )
}