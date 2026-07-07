// src/api/fetchClient.ts
import type { Post, User, Comment } from '../types'

const BASE = 'https://jsonplaceholder.typicode.com'

// Generic base fetcher utility
async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE}${endpoint}`, options)
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`)
  return res.json() as Promise<T>
}

// Centrally mapped type-safe endpoints
export const fetchApi = {
  // Reading
  getPosts: () =>
    request<Post[]>('/posts?_limit=10'),
  getPost: (id: number) =>
    request<Post>(`/posts/${id}`),
  getUsers: () =>
    request<User[]>('/users'),
  getUser: (id: number) =>
    request<User>(`/users/${id}`),
  getComments: (postId: number) =>
    request<Comment[]>(`/posts/${postId}/comments`),

  // Writing
  createPost: (data: Omit<Post, 'id'>) =>
    request<Post>('/posts', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    }),
  updatePost: (id: number, data: Partial<Omit<Post, 'id'>>) =>
    request<Post>(`/posts/${id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    }),
  deletePost: (id: number) =>
    request<void>(`/posts/${id}`, { method: 'DELETE' }),
}
