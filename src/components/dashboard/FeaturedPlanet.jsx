import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const PLANETS = [
    {
        name: 'Saturn',
        color: '#F5B700',
        glowColor: 'rgba(245,183,0,0.4)',
        ringColor: 'rgba(245,183,0,0.3)',
        hasRings: true,
        description: 'The jewel of the solar system, Saturn\'s iconic rings are made of ice and rock.',
        distance: '1.4 billion km from Sun',
        moons: 146,
        diameter: '116,460 km',
        emoji: '🪐',
    },
    {
        name: 'Mars',
        color: '#C1440E',
        glowColor: 'rgba(193,68,14,0.4)',
        ringColor: null,
        hasRings: false,
        description: 'The Red Planet — humanity\'s next frontier with ancient volcanoes and vast canyons.',
        distance: '228 million km from Sun',
        moons: 2,
        diameter: '6,779 km',
        emoji: '🔴',
    },
    {
        name: 'Neptune',
        color: '#4B70DD',
        glowColor: 'rgba(75,112,221,0.4)',
        ringColor: 'rgba(75,112,221,0.2)',
        hasRings: true,
        description: 'The windiest planet — supersonic storms rage at over 2,000 km/h.',
        distance: '4.5 billion km from Sun',
        moons: 16,
        diameter: '49,244 km',
        emoji: '🔵',
    },
    {
        name: 'Jupiter',
        color: '#C88B3A',
        glowColor: 'rgba(200,139,58,0.4)',
        ringColor: null,
        hasRings: false,
        description: 'The Great Red Spot — a storm that has raged for over 350 years.',
        distance: '778 million km from Sun',
        moons: 95,
        diameter: '139,820 km',
        emoji: '🟠',
    },
]

const FeaturedPlanet = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const planet = PLANETS[activeIndex]

    return (
        <div className="
      rounded-2xl p-6
      bg-cosmic-card/60 backdrop-blur-sm
      border border-cosmic-teal/20
      hover:border-cosmic-teal/30
      transition-all duration-500
      relative overflow-hidden
      min-h-[280px]
    ">
            {/* Background glow that changes with the planet */}
            <motion.div
                key={planet.name + '-bg'}
                animate={{ backgroundColor: planet.glowColor }}
                className="absolute top-1/2 right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none -translate-y-1/2"
            />

            <div className="relative flex flex-col md:flex-row gap-6 items-center h-full">

                {/* ── LEFT: Planet Visual ── */}
                <div className="relative flex-shrink-0 flex items-center justify-center w-48 h-48">

                    {/* Outer orbit ring decoration */}
                    <div className="absolute inset-0 rounded-full border border-cosmic-teal/10 animate-spin"
                         style={{ animationDuration: '20s' }} />

                    {/* Planet rings (Saturn / Neptune) */}
                    {planet.hasRings && (
                        <motion.div
                            key={planet.name + '-ring'}
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.6 }}
                            className="absolute w-56 h-8 rounded-full border-4 pointer-events-none"
                            style={{
                                borderColor: planet.ringColor,
                                transform: 'rotateX(75deg)',
                                boxShadow: `0 0 20px ${planet.ringColor}`
                            }}
                        />
                    )}

                    {/* The planet itself */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={planet.name}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                            // Continuous slow rotation
                            style={{ rotate: 0 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="w-32 h-32 rounded-full relative"
                                style={{
                                    background: `radial-gradient(circle at 35% 35%, 
                    white 0%, 
                    ${planet.color} 30%, 
                    ${planet.color}99 60%,
                    #000 100%
                  )`,
                                    boxShadow: `0 0 40px ${planet.glowColor}, inset -10px -10px 30px rgba(0,0,0,0.5)`,
                                }}
                            >
                                {/* Surface texture stripes for gas giants */}
                                <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
                                    {[20, 35, 50, 65, 80].map(top => (
                                        <div key={top} className="absolute w-full h-1.5 bg-black/40"
                                             style={{ top: `${top}%` }} />
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Orbiting moon dot */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        className="absolute w-44 h-44 rounded-full"
                        style={{ border: '1px dashed rgba(102,252,241,0.15)' }}
                    >
                        <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-cosmic-text/60
              shadow-[0_0_8px_rgba(197,198,199,0.8)] -translate-x-1/2" />
                    </motion.div>
                </div>

                {/* ── RIGHT: Planet Info ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={planet.name + '-info'}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex-1"
                    >
                        <div className="flex items-center gap-2 mb-1">
              <span className="font-display text-xs text-cosmic-teal/60 uppercase tracking-widest">
                Featured Planet
              </span>
                        </div>

                        <h2 className="font-display text-3xl font-bold mb-2 tracking-wide"
                            style={{ color: planet.color, textShadow: `0 0 20px ${planet.glowColor}` }}>
                            {planet.name}
                        </h2>

                        <p className="font-body text-cosmic-text/70 text-sm leading-relaxed mb-4">
                            {planet.description}
                        </p>

                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {[
                                { label: 'Distance', value: planet.distance.split(' ')[0] + ' ' + planet.distance.split(' ')[1] },
                                { label: 'Moons', value: planet.moons },
                                { label: 'Diameter', value: planet.diameter },
                            ].map(stat => (
                                <div key={stat.label} className="bg-cosmic-bg/50 rounded-lg p-2 text-center">
                                    <div className="font-display text-xs font-bold"
                                         style={{ color: planet.color }}>{stat.value}</div>
                                    <div className="font-body text-[10px] text-cosmic-text/40 uppercase tracking-wide mt-0.5">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Planet selector dots */}
                        <div className="flex gap-2">
                            {PLANETS.map((p, i) => (
                                <button
                                    key={p.name}
                                    onClick={() => setActiveIndex(i)}
                                    title={p.name}
                                    className="w-8 h-8 rounded-full border-2 transition-all duration-300 font-display text-xs"
                                    style={{
                                        backgroundColor: i === activeIndex ? p.color : 'transparent',
                                        borderColor: p.color,
                                        boxShadow: i === activeIndex ? `0 0 12px ${p.glowColor}` : 'none',
                                    }}
                                >
                                    {p.emoji}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default FeaturedPlanet