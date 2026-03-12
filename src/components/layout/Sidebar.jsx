import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import useFavoritesStore from '../../store/useFavoritesStore'

// We'll pull real favorites from Zustand store later
// For now, placeholder data
const PLACEHOLDER_FAVORITES = [
    { name: 'Mars', icon: '🔴', type: 'planet' },
    { name: 'Europa', icon: '🟡', type: 'moon' },
    { name: 'Halley\'s Comet', icon: '☄️', type: 'comet' },
]

const UPCOMING_EVENTS = [
    { name: 'Perseid Meteor Shower', date: 'Aug 12', color: 'text-cosmic-accent' },
    { name: 'Lunar Eclipse', date: 'Sep 7',  color: 'text-cosmic-glow' },
    { name: 'SpaceX Launch', date: 'Sep 15', color: 'text-cosmic-teal' },
]

const Sidebar = () => {
    const { favorites, removeFavorite } = useFavoritesStore()

    return (
        <aside className="
      w-64 min-h-screen
      bg-cosmic-card/50 backdrop-blur-sm
      border-r border-cosmic-teal/10
      flex flex-col gap-6
      p-4 pt-6
      overflow-y-auto
    ">

            {/* ── SECTION: FAVORITES ── */}
            <section>
                <h3 className="
          font-display text-xs uppercase tracking-[0.2em]
          text-cosmic-teal mb-3
          flex items-center gap-2
        ">
                    <span>⭐</span> Favorites
                </h3>

                <div className="flex flex-col gap-1">
                    {favorites.length === 0 ? (
                        <p className="font-body text-[11px] text-cosmic-text/30 px-3 py-2 italic">
                            No favorites yet — explore objects and star some!
                        </p>
                    ) : (
                        favorites.map((fav, i) => (
                            <motion.div
                                key={fav.id}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: i * 0.1}}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg
          text-cosmic-text text-sm
          hover:bg-cosmic-bg hover:text-cosmic-glow
          transition-all duration-200 cursor-pointer group"
                            >
                                <span className="text-base">{fav.icon}</span>
                                <span className="font-body text-xs flex-1">{fav.name}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFavorite(fav.id)
                                    }}
                                    className="opacity-0 group-hover:opacity-100 text-cosmic-text/30
            hover:text-red-400 transition-all duration-200 text-xs"
                                >
                                    ✕
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>

            {/* ── DIVIDER ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-cosmic-teal/20 to-transparent"/>

            {/* ── SECTION: UPCOMING EVENTS ── */}
            <section>
                <h3 className="
          font-display text-xs uppercase tracking-[0.2em]
          text-cosmic-teal mb-3
          flex items-center gap-2
        ">
                    <span>📅</span> Upcoming
                </h3>

                <div className="flex flex-col gap-2">
                    {UPCOMING_EVENTS.map((event, i) => (
                        <motion.div
                            key={event.name}
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.3 + i * 0.1}}
                            className="
                flex items-start justify-between
                px-3 py-2.5 rounded-lg
                bg-cosmic-bg/40 border border-cosmic-teal/5
                hover:border-cosmic-teal/20 transition-all duration-200
              "
                        >
              <span className="font-body text-xs text-cosmic-text/80 leading-tight pr-2">
                {event.name}
              </span>
                            <span className={`font-display text-[10px] font-bold whitespace-nowrap ${event.color}`}>
                {event.date}
              </span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── DIVIDER ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-cosmic-teal/20 to-transparent" />

            {/* ── SECTION: QUICK STATS ── */}
            <section>
                <h3 className="
          font-display text-xs uppercase tracking-[0.2em]
          text-cosmic-teal mb-3
          flex items-center gap-2
        ">
                    <span>📊</span> Stats
                </h3>

                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: 'Planets', value: '8', icon: '🪐' },
                        { label: 'Moons', value: '290+', icon: '🌙' },
                        { label: 'Asteroids', value: '1.1M+', icon: '☄️' },
                        { label: 'Comets', value: '3,700+', icon: '💫' },
                    ].map((stat) => (
                        <div key={stat.label} className="
              bg-cosmic-bg/60 rounded-lg p-2.5
              border border-cosmic-teal/10
              hover:border-cosmic-teal/30 hover:shadow-glow
              transition-all duration-300
              text-center
            ">
                            <div className="text-lg">{stat.icon}</div>
                            <div className="font-display text-cosmic-glow text-sm font-bold">{stat.value}</div>
                            <div className="font-body text-cosmic-text/50 text-[10px] uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FOOTER LINK ── */}
            <div className="mt-auto pt-4 border-t border-cosmic-teal/10">
                <NavLink
                    to="/apod"
                    className="
            flex items-center gap-2 px-3 py-2.5 rounded-lg
            text-cosmic-text/60 text-xs font-body
            hover:text-cosmic-glow hover:bg-cosmic-bg
            transition-all duration-200
          "
                >
                    🔭 Today's NASA Photo →
                </NavLink>
            </div>
        </aside>
    )
}

export default Sidebar