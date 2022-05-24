import { createContext, useReducer } from 'react'
import { User } from '../../interfaces/User'
import { usersReducer } from './UsersReducer';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}


const UsersContext = createContext<any>(initialState);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [ state, dispatch ] = useReducer(usersReducer, initialState)
  return <UsersContext.Provider value={{ ...state, dispatch }}>
    {children}
  </UsersContext.Provider >
}

export default UsersContext