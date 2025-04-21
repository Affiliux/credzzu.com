'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'how-it-works', 'pricing', 'faq']
      let currentSection = ''

      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section
          }
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navItems = [
    { href: '#features', label: 'Recursos' },
    { href: '#how-it-works', label: 'Como Funciona' },
    { href: '#pricing', label: 'Preços' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <nav className='flex w-full flex-col items-center justify-center gap-5 md:w-auto md:flex-row md:gap-6 lg:gap-12'>
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={`group relative text-sm font-light tracking-wide transition-all duration-300 ${
            activeSection === item.href.substring(1) ? 'text-white' : 'text-white/60 hover:text-white/80'
          }`}
        >
          {item.label}
          <span
            className={`absolute -bottom-1 left-0 h-[1px] bg-emerald-400 transition-all duration-300 ${
              activeSection === item.href.substring(1)
                ? 'w-full opacity-100'
                : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'
            }`}
          />
        </Link>
      ))}
    </nav>
  )
}
