import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Rotating space tips shown at the bottom of the card
const SPACE_TIPS = [
    "Light from the Sun takes ~8 minutes to reach Earth.",
    "A day on Venus is longer than its year.",
    "Neutron stars can spin 700 times per second.",
    "The Milky Way has over 200 billion stars.",
    "Saturn would float in water — it's less dense.",
    "One million Earths could fit inside the Sun.",
]

// Returns the right greeting based on hour of day
const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 5)  return { text: 'Good Night', icon: '🌙' }
    if (hour < 12) return { text: 'Good Morning', icon: '🌅' }
    if (hour < 17) return { text: 'Good Afternoon', icon: '☀️' }
    return { text: 'Good Evening', icon: '🌠' }
}

const WelcomeCard = () => {
    const [tipIndex, setTipIndex] = useState(0)
    const [date, setDate] = useState(new Date())
    const greeting = getGreeting()

    // Rotate tips every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex(i => (i + 1) % SPACE_TIPS.length)
        }, 5000)
        return () => clearInterval(interval)  // cleanup on unmount
    }, [])

    // Format date nicely: "Thursday, March 12"
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="
      h-full rounded-2xl p-6
      bg-cosmic-card/60 backdrop-blur-sm
      border border-cosmic-teal/20
      hover:border-cosmic-teal/40 hover:shadow-glow
      transition-all duration-500
      flex flex-col justify-between
      relative overflow-hidden
    ">
            {/* Background decoration — subtle radial glow */}
            <div className="absolute top-0 right-0 w-32 h-32
        bg-cosmic-teal/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top: greeting */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{greeting.icon}</span>
                    <span className="font-display text-cosmic-text/60 text-xs uppercase tracking-widest">
            {greeting.text}
          </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-cosmic-glow tracking-wide">
                    Explorer
                </h2>
                <p className="font-body text-cosmic-text/50 text-xs mt-1">{formattedDate}</p>
            </div>

            {/* Middle: mission stat */}
            <div className="my-4 p-3 rounded-xl bg-cosmic-bg/50 border border-cosmic-teal/10">
                <div className="font-display text-xs text-cosmic-teal/70 uppercase tracking-widest mb-1">
                    Today's Focus
                </div>
                <div className="font-body text-cosmic-text text-sm">
                    Explore the outer solar system
                </div>
                {/* Progress bar */}
                <div className="mt-2 h-1 bg-cosmic-bg rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '45%' }}
                        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cosmic-teal to-cosmic-glow rounded-full"
                    />
                </div>
                <div className="font-display text-[10px] text-cosmic-text/40 mt-1 text-right">45%</div>
            </div>

            {/* Bottom: rotating tips */}
            <div className="rounded-xl bg-cosmic-bg/30 border border-cosmic-accent/20 p-3">
                <div className="font-display text-[10px] text-cosmic-accent uppercase tracking-widest mb-1">
                    💡 Did You Know?
                </div>
                {/* AnimatePresence handles enter/exit of swapping elements */}
                <motion.p
                    key={tipIndex}  // key change triggers re-animation
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="font-body text-cosmic-text/70 text-xs leading-relaxed"
                >
                    {SPACE_TIPS[tipIndex]}
                </motion.p>
                {/* Dot indicators */}
                <div className="flex gap-1 mt-2">
                    {SPACE_TIPS.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-300
              ${i === tipIndex
                            ? 'w-4 bg-cosmic-accent'
                            : 'w-1 bg-cosmic-text/20'
                        }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WelcomeCard