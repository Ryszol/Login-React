import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

import welcomeImg from '../assets/images/undraw_welcome_cats_thqn.svg'

import '../styles/welcome.scss'

export function Welcome() {
  const history = useHistory()

  const { user, signOut } = useContext(AuthContext)

  async function handleSignOut() {
    if (user) {
      await signOut()
      history.push('/')
    }
  }

  return (
    <div id="welcome">
      <header>
        <button onClick={handleSignOut}>
          Logout
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-log-out"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </header>
      <main>
        <h1>Welcome {user?.email}!</h1>
        <img src={welcomeImg} alt="Welcome cats" />
      </main>
    </div>
  )
}