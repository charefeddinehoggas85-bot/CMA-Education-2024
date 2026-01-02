'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import client components to avoid SSR issues
const WhatsAppWidget = dynamic(() => import('@/components/ui/WhatsAppWidget'), {
  ssr: false
})

const ChatBotProvider = dynamic(() => import('@/components/ui/ChatBotProvider'), {
  ssr: false
})

const OpenDayPopupProvider = dynamic(() => import('@/components/layout/OpenDayPopupProvider'), {
  ssr: false
})

export default function ClientOnlyComponents() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <WhatsAppWidget />
      <ChatBotProvider />
      <OpenDayPopupProvider />
    </>
  )
}