import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GraduationCap, LayoutDashboard, MessageSquare, RefreshCw, Sparkles, Shield, Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigationItems = [
    { path: '/training', title: 'Training', icon: GraduationCap, description: 'CPAT Certification' },
    { path: '/dashboard', title: 'Dashboard', icon: LayoutDashboard, description: 'Practice Tools' },
    { path: '/dialogue', title: 'Dialogue Trainer', icon: MessageSquare, description: 'Interactive Practice' },
    { path: '/transformer', title: 'Phrase Transformer', icon: RefreshCw, description: 'Language Tools' },
    { path: '/generator', title: 'Session Generator', icon: Sparkles, description: 'Session Planning' },
    { path: '/safety-screening', title: 'Safety Screening', icon: Shield, description: 'Risk Assessment' },
  ]

  const isTrainingPath = location.pathname.startsWith('/training')

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block glass-morphism">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Premium Logo */}
            <Link to="/" className="flex items-center gap-2 luxury-interactive group">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs bg-gradient-to-br from-sage-700 via-sage-600 to-champagne-600 shadow-luxury-lift floating-element">
                  <span className="relative z-10">CPAT</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sage-600 to-champagne-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sage-600 to-champagne-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
                <div className="text-lg font-bold text-white">
                  CPAT Training
                </div>
                <p className="text-xs text-sage-300 font-medium tracking-wide hidden lg:block">
                  Premium Professional Development
                </p>
              </div>
            </Link>


            {/* Premium Navigation Items */}
            <div className="flex items-center gap-1">
              {navigationItems.map((item, index) => {
                const isActive = location.pathname === item.path || (item.path === '/training' && isTrainingPath)
                const IconComponent = item.icon
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-button therapeutic-focus-ring ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <IconComponent size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-110" />
                    <span className="hidden lg:inline font-medium tracking-wide">{item.title}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-champagne-400 rounded-full shadow-glow"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 block md:hidden glass-morphism">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Premium Mobile Logo */}
            <Link to="/" className="flex items-center gap-2 luxury-interactive group">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs bg-gradient-to-br from-sage-700 to-champagne-600 shadow-luxury-lift">
                  <span className="relative z-10">CPAT</span>
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-sage-600 to-champagne-500 blur-sm opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
              <div>
                <div className="text-base font-bold text-white">
                  CPAT Training
                </div>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 rounded-xl focus:outline-none therapeutic-focus-ring text-sage-300 hover:text-luxury glass-morphism-sage luxury-interactive"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 transform transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu className="w-6 h-6 transform transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Premium Mobile Menu Items */}
          {isMobileMenuOpen && (
            <div className="mobile-nav-menu space-y-2 p-4">
              {navigationItems.map((item, index) => {
                const isActive = location.pathname === item.path || (item.path === '/training' && isTrainingPath)
                const IconComponent = item.icon
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`mobile-nav-item therapeutic-focus-ring luxury-interactive ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      animationDelay: `${index * 150}ms`
                    }}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className={`p-2 rounded-xl ${isActive ? 'bg-sage-700/30' : 'bg-slate-700/30'} transition-colors duration-300`}>
                        <IconComponent size={18} aria-hidden="true" className="transition-transform duration-300" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs opacity-75 mt-1">{item.description}</div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-champagne-400 rounded-full shadow-glow"></div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-nav-overlay block md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  )
}

export default Navigation