import { useContext, useEffect } from 'react';
import UsersContext from '../../context/users/UsersContext';

const Login = () => {
  const { loading } = useContext(UsersContext)
  return (
    <div>{loading}</div>
  )
}

export default Login