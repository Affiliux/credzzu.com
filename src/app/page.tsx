'use client'

import React from 'react'

import CTA from '@/components/lp/cta'
import FAQ from '@/components/lp/faq'
import Features from '@/components/lp/features'
import Footer from '@/components/lp/footer'
import Header from '@/components/lp/header'
import Hero from '@/components/lp/hero'
import HowItWorks from '@/components/lp/howitworks'
import Pricing from '@/components/lp/pricing'

export default function LandingPage() {
  return (
    <div className='flex min-h-screen flex-col bg-black text-white'>
      <Header />

      <main className='flex-1'>
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <CTA />
        <FAQ />
      </main>

      <Footer />
    </div>
  )
}
