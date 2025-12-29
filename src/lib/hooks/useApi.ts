import { useState, useEffect, useCallback } from 'react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(url: string, options?: RequestInit) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null
  })

  // Mémoriser les options pour éviter les re-renders inutiles
  const optionsString = JSON.stringify(options)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        const parsedOptions = optionsString ? JSON.parse(optionsString) : undefined
        const response = await fetch(url, parsedOptions)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json() as T
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Une erreur est survenue'
        })
      }
    }

    fetchData()
  }, [url, optionsString])

  return state
}