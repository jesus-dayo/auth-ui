import axios from 'axios';

const defaultOptions = {
  baseURL: process.env.REACT_APP_BASE_URL
};
const api = axios.create(defaultOptions);

const auth = {
  signup: user => api.post('/api/signup',user),
  login: user => api.post('/api/login',user)
};

export default {
  auth
}
