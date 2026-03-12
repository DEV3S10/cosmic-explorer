import { motion } from 'framer-motion'
import { OBJECT_TYPES, TYPE_STYLES } from '../../data/spaceObjects'

// Labels and icons for each filter button
const TYPE_META = {
    all:      { label: 'All Objects', icon: '🌌' },
    planet:   { label: 'Planets',     icon: '🪐' },
    moon:     { label: 'Moons',       icon: '🌙' },
    asteroid: { label: 'Asteroids',   icon: '🪨' },
    comet:    { label: 'Comets',      icon: '☄️' },
}

const FilterBar = ({ activeFilter, onChange, counts }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {OBJECT_TYPES.map((type) => {
                const isActive = activeFilter === type
                const meta = TYPE_META[type]
                const style = type !== 'all' ? TYPE_STYLES[type] : null
                const count = type === 'all' ? counts.total : (counts[type] || 0)

                return (
                    <motion.button
                        key={type}
                        onClick={() => onChange(type)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl
              font-display text-xs uppercase tracking-wider
              border transition-all duration-300 relative overflow-hidden"
                        style={isActive ? {
                            backgroundColor: style ? style.bg : 'rgba(102,252,241,0.15)',
                            borderColor: style ? style.border : 'rgba(102,252,241,0.5)',
                            color: style ? style.text : '#66FCF1',
                            boxShadow: `0 0 16px ${style ? style.border : 'rgba(102,252,241,0.3)'}`,
                        } : {
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(69,162,158,0.2)',
                            color: 'rgba(197,198,199,0.6)',
                        }}
                    >
                        <span>{meta.icon}</span>
                        <span>{meta.label}</span>
                        {/* Count badge */}
                        <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px]
              bg-black/20 font-bold">
              {count}
            </span>
                    </motion.button>
                )
            })}
        </div>
    )
}

export default FilterBar