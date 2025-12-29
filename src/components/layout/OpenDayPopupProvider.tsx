'use client'

import { useOpenDayPopup } from '@/hooks/useOpenDayPopup'
import OpenDayPopup from '@/components/ui/OpenDayPopup'

export default function OpenDayPopupProvider() {
  const { isVisible, closePopup } = useOpenDayPopup()

  return (
    <OpenDayPopup 
      isVisible={isVisible} 
      onClose={closePopup} 
    />
  )
}