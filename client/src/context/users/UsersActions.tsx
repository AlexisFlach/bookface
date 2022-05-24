import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const loadUser = async () => {
  const res = await api.get('/auth');
  return res.data;
};