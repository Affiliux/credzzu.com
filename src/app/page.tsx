"use client";

import React from 'react'

import CTA from '@/presentation/components/lp/cta'
import Features from '@/presentation/components/lp/features'
import Footer from '@/presentation/components/lp/footer'
import Header from '@/presentation/components/lp/header'
import Hero from '@/presentation/components/lp/hero'
import HowItWorks from '@/presentation/components/lp/howitworks'
import Pricing from '@/presentation/components/lp/pricing'

export default function LandingPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
