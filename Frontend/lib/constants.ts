// Backend base URL — set NEXT_PUBLIC_BACKEND_URL or uses fallback
// const DEPLOYED_BACKEND = 'https://portal-dhz7.onrender.com'

const DEPLOYED_BACKEND = 'http://localhost:15013'



export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || DEPLOYED_BACKEND

// Auth
export const API_AUTH_LOGIN = `${API_BASE_URL}/api/auth/login`
export const API_AUTH_REGISTER = `${API_BASE_URL}/api/auth/register`
export const API_AUTH_PROFILE = `${API_BASE_URL}/api/auth/profile`
export const API_AUTH_RESET_PASSWORD = `${API_BASE_URL}/api/auth/reset-password`

// College verification (Bullayya)
export const API_COLLEGE_CHECK = `${API_BASE_URL}/api/college/check`

// Progress – subject-based only (aptitude, verbal, reasoning, python)
export const API_PROGRESS_OVERALL = `${API_BASE_URL}/api/progress/overall`

export const SUBJECTS = ['aptitude', 'verbal', 'reasoning', 'python'] as const
export type Subject = (typeof SUBJECTS)[number]

export const MIN_CORRECT_REQUIRED = 7
