import { useState, FormEvent, useContext } from "react"
import { useHistory } from 'react-router-dom'

import { AuthContext } from "../contexts/AuthContext"
import loginImg from '../assets/images/login.svg'

export function Home() {
  const history = useHistory()

  const { user, createUser, signIn, signOut } = useContext(AuthContext)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [switchTab, setSwitchTab] = useState(false)

  function handleSwitchTab() {
    setSwitchTab(!switchTab)
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault()

    if (!user) {
      await signIn(email, password)
      history.push('/welcome')
    }
  }

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault()

    if (!user) {
      await createUser(email, password)
      history.push('/welcome')
    }
  } 

  async function handleSignOut() {
    if (user) {
      await signOut()
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={loginImg} alt="Login" />
        <h1>Entre com e-mail e senha.</h1>
      </aside>
      <main>
        <div className="main-content">
          <div className="tabs">
            <button onClick={handleSwitchTab}>Entrar</button>
            <button onClick={handleSwitchTab}>Registrar</button>
          </div>
          <div className={`singIn ${switchTab ? 'invisible' : ''}`}>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="E-mail"
                spellCheck={false}
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Senha"
                spellCheck={false}
                onChange={event => setPassword(event.target.value)}
                value={password}
              />
              <button type="submit">Entrar</button>
            </form>
          </div>
          <div className={`createUser ${!switchTab ? 'invisible' : ''}`}>
            <form onSubmit={handleCreateUser}>
              <input
                type="text"
                placeholder="E-mail"
                spellCheck={false}
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Senha"
                spellCheck={false}
                onChange={event => setPassword(event.target.value)}
                value={password}
              />
              <button type="submit">Criar Usuário</button>
            </form>
          </div>
        </div>
        <button onClick={handleSignOut}>Logout</button>
      </main>
    </div>
  )
}