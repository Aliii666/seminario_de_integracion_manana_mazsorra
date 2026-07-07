// src/api/axiosClient.ts
import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import type { Post, User } from '../types'

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number
}

// Share base URL and configuration settings
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor: attach bearer tokens if present in local storage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: handles retries up to 3 times with a 1-second delay, then executes global error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: unknown) => {
    const config = (error as any)?.config as CustomRequestConfig | undefined

    // Retry logic (Proposed Exercise)
    if (config && axios.isAxiosError(error) && (!config._retryCount || config._retryCount < 3)) {
      config._retryCount = (config._retryCount ?? 0) + 1
      console.warn(`Petición fallida. Reintentando por ${config._retryCount}ª vez en 1s...`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return api(config)
    }

    if (axios.isAxiosError(error)) {
      const status = error.response?.status

      if (status === 401) {
        localStorage.removeItem('token')
        console.warn('Acceso no autorizado (401).')
      }
      if (status === 404) console.warn('Recurso no encontrado (404)')
      if (status === 500) console.warn('Error interno del servidor (500)')

      throw new Error(
        (error.response?.data as { message?: string })?.message ?? error.message
      )
    }
    throw error
  }
)

// Centrally mapped axios endpoints
export const axiosApi = {
  getPosts: () =>
    api.get<Post[]>('/posts?_limit=10').then(r => r.data),
  getPost: (id: number) =>
    api.get<Post>(`/posts/${id}`).then(r => r.data),
  getUsers: () =>
    api.get<User[]>('/users').then(r => r.data),
  createPost: (data: Omit<Post, 'id'>) =>
    api.post<Post>('/posts', data).then(r => r.data),
  updatePost: (id: number, data: Partial<Omit<Post, 'id'>>) =>
    api.patch<Post>(`/posts/${id}`, data).then(r => r.data),
  deletePost: (id: number) =>
    api.delete<void>(`/posts/${id}`).then(r => r.data),
}

export default api
