import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

// Each nav item: label shown + path it links to
const NAV_ITEMS = [
    { label: 'Solar System', path: '/solar-system', icon: '🪐' },
    { label: 'Objects',      path: '/objects',      icon: '☄️' },
    { label: 'Stars Map',    path: '/stars',        icon: '✨' },
    { label: 'APOD',         path: '/apod',         icon: '🔭' },
    { label: 'Events',       path: '/events',       icon: '📅' },
]

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="
      fixed top-0 left-0 right-0 z-50
      bg-cosmic-bg/80 backdrop-blur-md
      border-b border-cosmic-teal/20
      px-6 py-4
      flex items-center justify-between
    ">
            {/* ── LOGO ── */}
            <NavLink to="/" className="flex items-center gap-2 group">
                {/* Animated spinning planet emoji */}
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="text-2xl"
                >
                    🌌
                </motion.span>
                <span className="
          font-display font-bold text-xl
          text-cosmic-glow
          [text-shadow:0_0_10px_#66FCF1,0_0_20px_#66FCF1]
          tracking-widest uppercase
        ">
          CosmicExplorer
        </span>
            </NavLink>

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden md:flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-1.5 px-4 py-2 rounded-lg
              font-body text-sm font-medium tracking-wide
              transition-all duration-300
              ${isActive
                            ? 'bg-cosmic-teal/20 text-cosmic-glow border border-cosmic-teal/40 shadow-glow'
                            : 'text-cosmic-text hover:text-cosmic-glow hover:bg-cosmic-card'
                        }
            `}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </div>

            {/* ── RIGHT SIDE ── */}
            <div className="flex items-center gap-3">
                {/* Live indicator dot */}
                <div className="hidden md:flex items-center gap-2 text-xs text-cosmic-text/60">
                    <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-cosmic-glow"
                    />
                    LIVE
                </div>

                {/* Mobile menu toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-cosmic-text hover:text-cosmic-glow transition-colors p-2"
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* ── MOBILE DROPDOWN ── */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
            absolute top-full left-0 right-0
            bg-cosmic-card/95 backdrop-blur-md
            border-b border-cosmic-teal/20
            flex flex-col p-4 gap-2
            md:hidden
          "
                >
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-3 rounded-lg
                text-cosmic-text hover:text-cosmic-glow hover:bg-cosmic-bg
                transition-all duration-200"
                        >
                            {item.icon} {item.label}
                        </NavLink>
                    ))}
                </motion.div>
            )}
        </nav>
    )
}

export default Navbar