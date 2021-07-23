import { useState, FormEvent, useContext } from "react"
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'

import { AuthContext } from "../contexts/AuthContext"

import unlockImg from '../assets/images/unlock.svg'

import '../styles/home.scss'

export function Home() {
  const history = useHistory()

  const { user, createUser, signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [switchTab, setSwitchTab] = useState(false)

  function handleSwitchTab() {
    setSwitchTab(!switchTab)
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault()

    if (!user) {
      const logged = await signIn(email, password)
      logged && history.push('/welcome')
      return
    }

    if (user.email) {
      toast.success('You are already logged in.')
      history.push('/welcome')
    }

  }

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault()

    if (!user) {
      const created = await createUser(email, password)
      created && history.push('/welcome')
      return
    }

    if (user.email) {
      toast.error('Log out of your account first.')
      history.push('/welcome')
    }
  }

  return (
    <div id="home">
      <aside>
        <div className="text">
          <h1>Lorem ipsum dolor sit amet.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Unde praesentium beatae architecto distinctio omnis illo ab!</p>
        </div>
        <img src={unlockImg} alt="Login" />
      </aside>
      <main>
        <div className="main-content">
          <h2 className={`${switchTab ? 'invisible' : ''}`}>
            Sign in to Login React
          </h2>
          <h2 className={`${!switchTab ? 'invisible' : ''}`}>
            Sign up to Login React
          </h2>
          <div className="form-container">
            <div className="tabs">
              <button
                className={`tab ${!switchTab ? 'active' : ''}`}
                onClick={handleSwitchTab}
              >
                Sign In
              </button>
              <button
                className={`tab ${switchTab ? 'active' : ''}`}
                onClick={handleSwitchTab}
              >
                Sign Up
              </button>
            </div>
            <form
              className={`form ${switchTab ? 'invisible' : ''}`}
              onSubmit={handleLogin}
            >
              <fieldset>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="example@mail.com"
                  spellCheck={false}
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  spellCheck={false}
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                />
              </fieldset>
              <button type="submit">Sign In</button>
              <p>
                Don't have an account yet?&nbsp;
                <span onClick={handleSwitchTab}>
                  Sign up
                </span>
              </p>
            </form>
            <form
              className={`form ${!switchTab ? 'invisible' : ''}`}
              onSubmit={handleCreateUser}
            >
              <fieldset>
                <label htmlFor="email2">Email</label>
                <input
                  id="email2"
                  type="text"
                  placeholder="example@mail.com"
                  spellCheck={false}
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="password2">Password</label>
                <input
                  id="password2"
                  type="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  spellCheck={false}
                  onChange={event => setPassword(event.target.value)}
                  value={password}
                />
              </fieldset>
              <button type="submit">Create an account</button>
              <p>
              Already have an account?&nbsp;
                <span onClick={handleSwitchTab}>
                  Sign in
                </span>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}