import { createContext, ReactNode, useState, useEffect } from 'react'
import { auth } from '../services/firebase'

type User = {
  id: string
  email: string | null
}

type AuthContextType = {
  user: User | undefined
  createUser: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { email, uid } = user

        if (!email) {
          throw new Error('Missing information from Account.')
        }

        setUser({
          id: uid,
          email
        })
      } else {
        setUser(undefined)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function createUser(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new Error('Email or password invalid.')
      }
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      
      if (!user) {
        throw new Error('Missing information from account.')
      }
  
      setUser({
        id: user.uid,
        email: user.email
      })
    } catch (error) {
      console.log(error.code, error.message)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new Error('Email or password invalid.')
      }
      const { user } = await auth.signInWithEmailAndPassword(email, password)
      
      if (!user) {
        throw new Error('Missing information from account.')
      }
  
      setUser({
        id: user.uid,
        email: user.email
      })
    } catch (error) {
      console.log(error.code, error.message)
    }
  }

  async function signOut() {
    try {
      await auth.signOut()
      setUser(undefined)
      console.log('logout')
    } catch (error) {
      console.log(error.code, error.message)
    }
  }

  return (
    <AuthContext.Provider value={{ user, createUser, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
