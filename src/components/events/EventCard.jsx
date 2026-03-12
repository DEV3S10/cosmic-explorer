import { motion } from 'framer-motion'
import { useState } from 'react'
import { INTENSITY_STYLES, TYPE_META } from '../../data/spaceEvents'

const EventCard = ({ event, index }) => {
    const [expanded, setExpanded] = useState(false)
    const intensity = INTENSITY_STYLES[event.intensity]
    const typeMeta  = TYPE_META[event.type]

    // Format date nicely: "Aug 11, 2025"
    const formatDate = (dateStr) => {
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        })
    }

    // Days until event
    const daysUntil = () => {
        const diff = new Date(event.date + 'T00:00:00') - new Date()
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
        if (days < 0)  return { label: 'Past event', color: 'text-cosmic-text/30' }
        if (days === 0) return { label: 'Today!',    color: 'text-cosmic-glow' }
        if (days === 1) return { label: 'Tomorrow',  color: 'text-cosmic-accent' }
        return { label: `In ${days} days`, color: 'text-cosmic-text/60' }
    }

    const countdown = daysUntil()

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl overflow-hidden bg-cosmic-card/60 backdrop-blur-sm
        border border-cosmic-teal/15 hover:border-cosmic-teal/35
        transition-all duration-300"
            style={{
                boxShadow: expanded ? `0 0 30px ${event.color}20` : 'none'
            }}
        >
            {/* Top accent bar — colored by event type */}
            <div className="h-0.5 w-full"
                 style={{ backgroundColor: event.color, boxShadow: `0 0 8px ${event.color}` }} />

            {/* Main card content */}
            <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                        <span className="text-3xl mt-0.5">{event.icon}</span>
                        <div>
                            {/* Type + intensity badges */}
                            <div className="flex items-center gap-2 mb-1.5">
                <span className="font-display text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ color: typeMeta.color,
                          backgroundColor: typeMeta.color + '15',
                          border: `1px solid ${typeMeta.color}40` }}>
                  {typeMeta.icon} {event.type}
                </span>
                                <span className="font-display text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full"
                                      style={{ color: intensity.text,
                                          backgroundColor: intensity.bg,
                                          border: `1px solid ${intensity.border}` }}>
                  {event.intensity}
                </span>
                            </div>
                            <h3 className="font-display text-sm font-bold text-cosmic-text">
                                {event.name}
                            </h3>
                        </div>
                    </div>

                    {/* Date + countdown */}
                    <div className="text-right flex-shrink-0">
                        <div className="font-display text-xs font-bold"
                             style={{ color: event.color }}>
                            {formatDate(event.date)}
                        </div>
                        <div className={`font-body text-[10px] mt-0.5 ${countdown.color}`}>
                            {countdown.label}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="font-body text-cosmic-text/60 text-xs leading-relaxed mb-3">
                    {event.description}
                </p>

                {/* Expand/collapse button */}
                <button
                    onClick={() => setExpanded(v => !v)}
                    className="font-display text-[10px] uppercase tracking-widest
            text-cosmic-teal/60 hover:text-cosmic-glow
            transition-colors duration-200 flex items-center gap-1.5"
                >
                    <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >▼</motion.span>
                    {expanded ? 'Less Info' : 'More Info'}
                </button>

                {/* Expanded details */}
                <motion.div
                    initial={false}
                    animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="mt-4 pt-4 border-t border-cosmic-teal/10 space-y-3">
                        {[
                            { icon: '👁️', label: 'Visibility', value: event.visibility },
                            { icon: '⏰', label: 'Peak Time',  value: event.peakTime },
                        ].map(item => (
                            <div key={item.label} className="flex items-start gap-2">
                                <span className="text-sm">{item.icon}</span>
                                <div>
                  <span className="font-display text-[9px] uppercase tracking-widest
                    text-cosmic-text/30 block mb-0.5">
                    {item.label}
                  </span>
                                    <span className="font-body text-xs text-cosmic-text/70">
                    {item.value}
                  </span>
                                </div>
                            </div>
                        ))}

                        {/* Tips box */}
                        <div className="rounded-xl p-3 mt-2"
                             style={{ backgroundColor: event.color + '10',
                                 border: `1px solid ${event.color}25` }}>
                            <p className="font-display text-[9px] uppercase tracking-widest mb-1.5"
                               style={{ color: event.color }}>
                                💡 Viewing Tips
                            </p>
                            <p className="font-body text-xs text-cosmic-text/70 leading-relaxed">
                                {event.tips}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default EventCard