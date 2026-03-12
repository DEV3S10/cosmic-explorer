import { motion } from 'framer-motion'

const EVENTS = [
    {
        id: 1,
        name: 'Perseid Meteor Shower',
        date: 'Aug 11–13, 2025',
        type: 'meteor',
        icon: '🌠',
        description: 'Up to 100 meteors per hour at peak. Best viewed after midnight.',
        intensity: 'High',
        intensityColor: '#66FCF1',
    },
    {
        id: 2,
        name: 'Total Lunar Eclipse',
        date: 'Sep 7, 2025',
        type: 'eclipse',
        icon: '🌑',
        description: 'The Moon passes fully into Earth\'s shadow. Visible from Asia & Europe.',
        intensity: 'Medium',
        intensityColor: '#F5B700',
    },
    {
        id: 3,
        name: 'SpaceX Starship Launch',
        date: 'Sep 15, 2025',
        type: 'launch',
        icon: '🚀',
        description: 'Eighth integrated flight test of the full Starship stack.',
        intensity: 'Critical',
        intensityColor: '#C1440E',
    },
    {
        id: 4,
        name: 'Jupiter at Opposition',
        date: 'Oct 6, 2025',
        type: 'observation',
        icon: '🔭',
        description: 'Jupiter closest to Earth — best time for observation this year.',
        intensity: 'Low',
        intensityColor: '#45A29E',
    },
]

// Color-coded left border by event type
const TYPE_COLORS = {
    meteor: 'border-cosmic-glow',
    eclipse: 'border-cosmic-accent',
    launch: 'border-red-500',
    observation: 'border-cosmic-teal',
}

const UpcomingEvents = () => {
    return (
        <div className="rounded-2xl p-6 bg-cosmic-card/60 backdrop-blur-sm
      border border-cosmic-teal/20 hover:border-cosmic-teal/30
      transition-all duration-500 h-full">

            <h3 className="font-display text-sm text-cosmic-glow uppercase tracking-widest mb-5
        flex items-center gap-2">
                <span>🗓️</span> Upcoming Events
            </h3>

            <div className="flex flex-col gap-3">
                {EVENTS.map((event, i) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        className={`
              pl-4 pr-3 py-3 rounded-xl
              bg-cosmic-bg/50
              border-l-2 ${TYPE_COLORS[event.type]}
              border border-cosmic-teal/10
              hover:border-cosmic-teal/25
              transition-all duration-300
              cursor-pointer group
            `}
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5">
                                <span className="text-xl mt-0.5">{event.icon}</span>
                                <div>
                                    <div className="font-display text-xs font-bold text-cosmic-text group-hover:text-cosmic-glow
                    transition-colors duration-200">
                                        {event.name}
                                    </div>
                                    <div className="font-body text-[11px] text-cosmic-text/50 mt-0.5">
                                        {event.description}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right flex-shrink-0">
                                <div className="font-display text-[10px] font-bold"
                                     style={{ color: event.intensityColor }}>
                                    {event.intensity}
                                </div>
                                <div className="font-body text-[10px] text-cosmic-text/40 mt-0.5 whitespace-nowrap">
                                    {event.date}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="
        w-full mt-4 py-2.5 rounded-xl
        border border-cosmic-teal/20
        text-cosmic-teal/70 hover:text-cosmic-glow
        hover:border-cosmic-teal/50 hover:bg-cosmic-teal/5
        hover:shadow-glow
        font-display text-xs uppercase tracking-widest
        transition-all duration-300
      ">
                View Full Calendar →
            </button>
        </div>
    )
}

export default UpcomingEvents