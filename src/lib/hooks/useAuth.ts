'use client'

import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  name: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          const response = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          })
          
          if (response.ok) {
            const user = await response.json() as User
            setState({ user, loading: false, error: null })
          } else {
            localStorage.removeItem('auth_token')
            setState({ user: null, loading: false, error: null })
          }
        } else {
          setState({ user: null, loading: false, error: null })
        }
      } catch (error) {
        setState({
          user: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Erreur d\'authentification'
        })
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Identifiants invalides')
      }

      const { user, token } = await response.json() as { user: User; token: string }
      localStorage.setItem('auth_token', token)
      setState({ user, loading: false, error: null })
    } catch (error) {
      setState({
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Erreur de connexion'
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setState({ user: null, loading: false, error: null })
  }

  const isAuthenticated = !!state.user
  const hasRole = (role: string) => state.user?.role === role || state.user?.role === 'admin'

  return {
    ...state,
    login,
    logout,
    isAuthenticated,
    hasRole
  }
}