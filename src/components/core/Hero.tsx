import React from 'react'
import { ChevronRight, BookOpen, Users, Award } from 'lucide-react'

interface HeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  proofPoints?: string[]
  ctaText?: string
  ctaSecondaryText?: string
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
  className?: string
  variant?: 'default' | 'luxury' | 'clinical'
}

const Hero: React.FC<HeroProps> = ({
  eyebrow = "CPAT Training Platform",
  title,
  subtitle,
  proofPoints = [
    "Evidence-based clinical methodology",
    "Comprehensive 6-module curriculum", 
    "Professional continuing education credits"
  ],
  ctaText = "Begin Your Training",
  ctaSecondaryText = "Learn More",
  onPrimaryAction,
  onSecondaryAction,
  className = "",
  variant = 'luxury'
}) => {
  const variantStyles = {
    default: "bg-gradient-to-br from-slate-900 to-slate-800",
    luxury: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800",
    clinical: "bg-gradient-to-br from-slate-900 to-sage-900"
  }

  const proofIcons = [BookOpen, Users, Award]

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${variantStyles[variant]} ${className}`}
      data-whimsy="hero"
    >
      {/* Background Glass Morphism Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-sage-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-champagne-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        
        {/* Eyebrow Text */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-700/10 border border-sage-600/20 text-sage-600 text-sm font-medium uppercase tracking-wider backdrop-blur-sm">
            <div className="w-2 h-2 bg-sage-600 rounded-full"></div>
            {eyebrow}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="h1-hero text-text-primary mb-6 max-w-4xl mx-auto leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="p-lead text-slate-300 mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Proof Points */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          {proofPoints.map((point, index) => {
            const Icon = proofIcons[index] || BookOpen
            return (
              <div key={index} className="flex items-center gap-3 text-slate-400">
                <div className="flex-shrink-0 w-10 h-10 bg-sage-700/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Icon size={20} className="text-sage-600" />
                </div>
                <span className="text-sm font-medium max-w-40 text-left">
                  {point}
                </span>
              </div>
            )
          })}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onPrimaryAction}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-sage-700 hover:bg-sage-600 text-text-primary font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-sage-700/25 hover:-translate-y-0.5 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-sage-600 focus:ring-offset-2 focus:ring-offset-slate-900"
            data-whimsy="cta-primary"
          >
            <span className="relative z-10">{ctaText}</span>
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            
            {/* Champagne Shimmer Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-champagne-600/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
          </button>

          {ctaSecondaryText && (
            <button
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-3 px-8 py-4 border border-slate-600 hover:border-sage-600 text-slate-300 hover:text-text-primary font-medium rounded-xl transition-all duration-300 hover:bg-slate-800/50 backdrop-blur-sm min-w-[160px] focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-900"
              data-whimsy="cta-secondary"
            >
              {ctaSecondaryText}
            </button>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-sage-600 rounded-full"></div>
            <span>CPAT Certified Training</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-champagne-600 rounded-full"></div>
            <span>Continuing Education Credits</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-slate-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
            <span>Evidence-Based Approach</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sage-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero