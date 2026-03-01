// Backend base URL — switch to localhost when developing locally
const DEPLOYED_BACKEND = 'https://portal-dhz7.onrender.com'
// const DEPLOYED_BACKEND = 'http://localhost:15013'

export const API_BASE_URL = DEPLOYED_BACKEND

// Auth
export const API_AUTH_LOGIN = `${API_BASE_URL}/api/auth/login`
export const API_AUTH_REGISTER = `${API_BASE_URL}/api/auth/register`
export const API_AUTH_PROFILE = `${API_BASE_URL}/api/auth/profile`
export const API_AUTH_RESET_PASSWORD = `${API_BASE_URL}/api/auth/reset-password`

// Progress – subject-based only (aptitude, verbal, reasoning, python)
export const API_PROGRESS_OVERALL = `${API_BASE_URL}/api/progress/overall`

export const SUBJECTS = ['aptitude', 'verbal', 'reasoning', 'python'] as const
export type Subject = (typeof SUBJECTS)[number]

export const MIN_CORRECT_REQUIRED = 7
