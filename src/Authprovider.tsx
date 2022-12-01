import React, {
  ReactNode,
  useEffect,
  useState,
  useContext,
  createContext
} from 'react'
import { auth } from './firebase'
import {
  Auth,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'

export interface AuthProviderProps {
  children?: ReactNode
}

export interface UserContextState {
  isAuthenticated: boolean
  isLoading: boolean
  id?: string
}

export const UserStateContext = createContext<UserContextState>(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as UserContextState
)
export interface AuthContextModel {
  auth: Auth
  user: User | null
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (email: string, password: string) => Promise<UserCredential>
  sendPasswordResetEmail?: (email: string) => Promise<void>
}

export const AuthContext = React.createContext<AuthContextModel>(
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as AuthContextModel
)

export function useAuth (): AuthContextModel {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)

  async function signUp (email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  async function signIn (email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, password)
  }
  async function resetPassword (email: string): Promise<void> {
    return await sendPasswordResetEmail(auth, email)
  }
  useEffect(() => {
    // function that firebase notifies you if a user is set
    const unsubsrcibe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return unsubsrcibe
  }, [])

  const values = {
    signUp,
    user,
    signIn,
    resetPassword,
    auth
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useUserContext = (): UserContextState => {
  return useContext(UserStateContext)
}
