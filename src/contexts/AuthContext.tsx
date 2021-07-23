import { createContext, ReactNode, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import { auth } from '../services/firebase'

type User = {
  id: string
  email: string | null
}

type AuthContextType = {
  user: User | undefined
  createUser: (email: string, password: string) => Promise<boolean>
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<boolean>
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

      toast.success('User created.')
      return true
    } catch (error) {
      console.log(error.code, error.message)
      toast.error(error.message)
      return false
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

      toast.success('You are logged in.')
      return true
    } catch (error) {
      console.log(error.code, error.message)
      toast.error(error.message)
      return false
    }
  }

  async function signOut() {
    try {
      await auth.signOut()
      setUser(undefined)
      toast.success('You are logged out.')
      return true
    } catch (error) {
      console.log(error.code, error.message)
      toast.error(error.message)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, createUser, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
