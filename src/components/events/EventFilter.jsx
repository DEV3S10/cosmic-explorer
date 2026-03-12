import { motion } from 'framer-motion'
import { EVENT_TYPES, TYPE_META, SPACE_EVENTS } from '../../data/spaceEvents'

const EventFilter = ({ active, onChange }) => {
    // Count events per type
    const counts = {}
    EVENT_TYPES.forEach(t => {
        counts[t] = t === 'all'
            ? SPACE_EVENTS.length
            : SPACE_EVENTS.filter(e => e.type === t).length
    })

    return (
        <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map(type => {
                const meta    = TYPE_META[type]
                const isActive = active === type

                return (
                    <motion.button
                        key={type}
                        onClick={() => onChange(type)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl
              font-display text-xs uppercase tracking-wider
              border transition-all duration-300"
                        style={isActive ? {
                            backgroundColor: meta.color + '18',
                            borderColor: meta.color + '60',
                            color: meta.color,
                            boxShadow: `0 0 16px ${meta.color}25`,
                        } : {
                            backgroundColor: 'transparent',
                            borderColor: 'rgba(69,162,158,0.2)',
                            color: 'rgba(197,198,199,0.5)',
                        }}
                    >
                        <span>{meta.icon}</span>
                        <span>{meta.label}</span>
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-black/20 font-bold">
              {counts[type]}
            </span>
                    </motion.button>
                )
            })}
        </div>
    )
}

export default EventFilter