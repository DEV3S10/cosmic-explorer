import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SPACE_EVENTS } from '../data/spaceEvents'
import EventCard from '../components/events/EventCard'
import EventFilter from '../components/events/EventFilter'
import CalendarView from '../components/events/CalendarView'
import useLaunches from '../hooks/useLaunches'
import Loader from '../components/ui/Loader'

const SpaceEvents = () => {
    const [filter, setFilter]                     = useState('all')
    const [view, setView]                         = useState('cards')
    const [highlightedEvent, setHighlightedEvent] = useState(null)

    // ── LIVE DATA ────────────────────────────────────────────────
    const { data: liveLaunches, loading: launchesLoading } = useLaunches()

    // Merge live launches with static events (meteors + eclipses stay static)
    const allEvents = useMemo(() => {
        const staticNonLaunch = SPACE_EVENTS.filter(e => e.type !== 'launch')
        return [...staticNonLaunch, ...liveLaunches].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        )
    }, [liveLaunches])

    // Apply type filter
    const filtered = useMemo(() =>
            filter === 'all'
                ? allEvents
                : allEvents.filter(e => e.type === filter),
        [filter, allEvents]
    )

    // Next upcoming event from merged data
    const nextEvent = useMemo(() => {
        const now = new Date()
        return allEvents
            .filter(e => new Date(e.date + 'T00:00:00') >= now)
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0]
    }, [allEvents])

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-6">
                <h1 className="font-display text-3xl font-bold text-cosmic-glow
          tracking-wider uppercase
          [text-shadow:0_0_20px_rgba(102,252,241,0.5)]">
                    Space Events
                </h1>
                <p className="text-cosmic-text/60 font-body mt-1 text-sm flex items-center gap-2">
                    Meteor showers, eclipses &{' '}
                    <span className="text-cosmic-glow">live rocket launches</span>
                    {/* Pulsing live dot */}
                    <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-cosmic-glow inline-block"
                    />
                </p>
            </motion.div>

            {/* Next Event Hero Banner */}
            {nextEvent && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 rounded-2xl p-6 relative overflow-hidden border"
                    style={{
                        background: 'linear-gradient(135deg, #1F2833 0%, #0B0C10 100%)',
                        borderColor: nextEvent.color + '50',
                        boxShadow: `0 0 30px ${nextEvent.color}15`,
                    }}
                >
                    {/* Background glow */}
                    <div className="absolute inset-0 pointer-events-none"
                         style={{ background: `radial-gradient(circle at 80% 50%, ${nextEvent.color}10, transparent 60%)` }} />

                    <div className="relative flex flex-col md:flex-row md:items-center gap-4">
                        <div className="text-5xl">{nextEvent.icon}</div>
                        <div className="flex-1">
                            <p className="font-display text-[10px] uppercase tracking-widest
                text-cosmic-text/40 mb-1">
                                Next Event
                            </p>
                            <h2 className="font-display text-xl font-bold mb-1"
                                style={{ color: nextEvent.color }}>
                                {nextEvent.name}
                            </h2>
                            <p className="font-body text-sm text-cosmic-text/60">
                                {nextEvent.description?.slice(0, 120)}...
                            </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <div className="font-display text-3xl font-bold"
                                 style={{ color: nextEvent.color }}>
                                {Math.max(0, Math.ceil(
                                    (new Date(nextEvent.date + 'T00:00:00') - new Date())
                                    / (1000 * 60 * 60 * 24)
                                ))}
                            </div>
                            <div className="font-display text-xs uppercase tracking-widest text-cosmic-text/40">
                                days away
                            </div>
                            <div className="font-body text-xs text-cosmic-text/50 mt-1">
                                {new Date(nextEvent.date + 'T00:00:00').toLocaleDateString('en-US', {
                                    month: 'long', day: 'numeric', year: 'numeric'
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Controls row */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-col sm:flex-row gap-4 justify-between mb-6"
            >
                <EventFilter active={filter} onChange={setFilter} />

                {/* View toggle */}
                <div className="flex gap-1 bg-cosmic-card/60 rounded-xl p-1
          border border-cosmic-teal/15 self-start">
                    {[
                        { key: 'cards',    icon: '⊞', label: 'Cards' },
                        { key: 'calendar', icon: '📅', label: 'Calendar' },
                    ].map(v => (
                        <button
                            key={v.key}
                            onClick={() => setView(v.key)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                font-display text-xs uppercase tracking-wider
                transition-all duration-200"
                            style={view === v.key ? {
                                backgroundColor: 'rgba(102,252,241,0.15)',
                                color: '#66FCF1',
                            } : {
                                color: 'rgba(197,198,199,0.4)',
                            }}
                        >
                            <span>{v.icon}</span>
                            <span>{v.label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Launch loading indicator */}
            {launchesLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 flex items-center gap-2 text-xs font-body text-cosmic-text/40"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="w-3 h-3 border border-cosmic-teal/40 border-t-cosmic-teal rounded-full"
                    />
                    Fetching live rocket launches...
                </motion.div>
            )}

            {/* Content */}
            <AnimatePresence mode="wait">
                {view === 'cards' ? (
                    <motion.div
                        key="cards"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-5"
                    >
                        {filtered.length === 0 && !launchesLoading ? (
                            <div className="col-span-2 text-center py-24">
                                <div className="text-6xl mb-4">📭</div>
                                <p className="font-display text-cosmic-text/50 uppercase tracking-widest text-sm">
                                    No events found
                                </p>
                            </div>
                        ) : (
                            filtered.map((event, i) => (
                                <EventCard key={event.id} event={event} index={i} />
                            ))
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="calendar"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                        <CalendarView onSelectEvent={setHighlightedEvent} />

                        <div>
                            {highlightedEvent ? (
                                <EventCard event={highlightedEvent} index={0} />
                            ) : (
                                <div className="h-full rounded-2xl border border-cosmic-teal/10
                  bg-cosmic-card/30 flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <div className="text-4xl mb-3">📅</div>
                                        <p className="font-display text-xs uppercase tracking-widest
                      text-cosmic-text/30">
                                            Click an event dot on the calendar
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SpaceEvents