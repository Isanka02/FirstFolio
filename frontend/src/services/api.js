import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8080',
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const register = (data) => API.post('/api/auth/register', data)
export const login = (data) => API.post('/api/auth/login', data)

export const getMyPortfolio = () => API.get('/api/portfolio/me')
export const updatePortfolio = (data) => API.put('/api/portfolio/me', data)
export const publishPortfolio = () => API.put('/api/portfolio/me/publish')

export const getMyProjects = () => API.get('/api/projects')
export const addProject = (data) => API.post('/api/projects', data)
export const updateProject = (id, data) => API.put(`/api/projects/${id}`, data)
export const deleteProject = (id) => API.delete(`/api/projects/${id}`)

export const getMySkills = () => API.get('/api/skills')
export const addSkill = (data) => API.post('/api/skills', data)
export const deleteSkill = (id) => API.delete(`/api/skills/${id}`)

export default API