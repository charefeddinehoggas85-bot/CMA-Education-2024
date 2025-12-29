'use client'

import { Phone, Mail, MessageCircle, Calendar, Download } from 'lucide-react'
import FloatingActionButton from './FloatingActionButton'
import AnimatedIcon from './AnimatedIcon'

const FloatingActions = () => {
  const actions = [
    {
      icon: <AnimatedIcon variant="shake" size="sm"><Phone className="w-5 h-5" /></AnimatedIcon>,
      label: "Nous appeler",
      onClick: () => window.open('tel:0189706052', '_self')
    },
    {
      icon: <AnimatedIcon variant="bounce" size="sm"><Mail className="w-5 h-5" /></AnimatedIcon>,
      label: "Nous écrire",
      onClick: () => window.open('mailto:contact.academy@construction-management-academy.fr', '_self')
    },
    {
      icon: <AnimatedIcon variant="pulse" size="sm"><MessageCircle className="w-5 h-5" /></AnimatedIcon>,
      label: "Chat en direct",
      onClick: () => console.log('Ouvrir le chat')
    },
    {
      icon: <AnimatedIcon variant="float" size="sm"><Calendar className="w-5 h-5" /></AnimatedIcon>,
      label: "Prendre RDV",
      onClick: () => console.log('Prendre rendez-vous')
    },
    {
      icon: <AnimatedIcon variant="rotate" size="sm"><Download className="w-5 h-5" /></AnimatedIcon>,
      label: "Télécharger brochure",
      onClick: () => console.log('Télécharger brochure')
    }
  ]

  return (
    <FloatingActionButton
      actions={actions}
      mainIcon={<AnimatedIcon variant="pulse" size="md"><MessageCircle className="w-6 h-6" /></AnimatedIcon>}
      position="bottom-right"
      size="lg"
      variant="gradient"
    />
  )
}

export default FloatingActions