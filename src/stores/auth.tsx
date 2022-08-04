import {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
  ReactNode,
  useEffect,
} from 'react'

type AuthStore = {
  authToken: string
  setAuthToken: Dispatch<SetStateAction<string>>
  loading: boolean
}

const AuthContext = createContext<AuthStore>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [authToken, setAuthToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('auth_token')

    if (token) {
      setAuthToken(token)
    }

    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
