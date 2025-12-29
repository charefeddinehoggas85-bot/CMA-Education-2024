'use client'

import { useState, useEffect } from 'react'

const POPUP_STORAGE_KEY = 'cma-open-day-popup-dismissed'
const POPUP_DELAY = 3000 // 3 secondes après le chargement de la page

export function useOpenDayPopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Vérifier si la popup a déjà été fermée aujourd'hui
    const checkShouldShow = () => {
      try {
        const dismissed = localStorage.getItem(POPUP_STORAGE_KEY)
        if (dismissed) {
          const dismissedDate = new Date(dismissed)
          const today = new Date()
          
          // Si c'est le même jour, ne pas afficher
          if (
            dismissedDate.getDate() === today.getDate() &&
            dismissedDate.getMonth() === today.getMonth() &&
            dismissedDate.getFullYear() === today.getFullYear()
          ) {
            return false
          }
        }
        return true
      } catch {
        return true
      }
    }

    // Afficher la popup après un délai si elle n'a pas été fermée aujourd'hui
    if (checkShouldShow()) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, POPUP_DELAY)

      return () => clearTimeout(timer)
    }
  }, [])

  const closePopup = () => {
    setIsVisible(false)
    
    // Enregistrer la fermeture dans localStorage
    try {
      localStorage.setItem(POPUP_STORAGE_KEY, new Date().toISOString())
    } catch {
      // Ignorer les erreurs de localStorage (mode privé, etc.)
    }
  }

  return {
    isVisible,
    closePopup
  }
}