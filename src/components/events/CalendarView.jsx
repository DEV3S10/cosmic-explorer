import { useState } from 'react'
import { motion } from 'framer-motion'
import { SPACE_EVENTS, TYPE_META } from '../../data/spaceEvents'

const DAYS   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June',
    'July','August','September','October','November','December']

const CalendarView = ({ onSelectEvent }) => {
    const today = new Date()
    const [year,  setYear]  = useState(today.getFullYear())
    const [month, setMonth] = useState(today.getMonth())

    // First day of month (0=Sun ... 6=Sat) — used to offset grid
    const firstDay    = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Build lookup: { 'YYYY-MM-DD': [events] }
    const eventsByDate = {}
    SPACE_EVENTS.forEach(ev => {
        const key = ev.date
        if (!eventsByDate[key]) eventsByDate[key] = []
        eventsByDate[key].push(ev)
    })

    // Format date key for the current calendar cell
    const dateKey = (day) => {
        const m = String(month + 1).padStart(2, '0')
        const d = String(day).padStart(2, '0')
        return `${year}-${m}-${d}`
    }

    const prevMonth = () => {
        if (month === 0) { setMonth(11); setYear(y => y - 1) }
        else setMonth(m => m - 1)
    }
    const nextMonth = () => {
        if (month === 11) { setMonth(0); setYear(y => y + 1) }
        else setMonth(m => m + 1)
    }

    return (
        <div className="rounded-2xl p-5 bg-cosmic-card/60 backdrop-blur-sm
      border border-cosmic-teal/20">

            {/* Month navigation */}
            <div className="flex items-center justify-between mb-5">
                <button onClick={prevMonth}
                        className="w-8 h-8 rounded-lg border border-cosmic-teal/20
            text-cosmic-text/60 hover:text-cosmic-glow hover:border-cosmic-teal/50
            transition-all duration-200 font-display text-sm">
                    ‹
                </button>

                <h3 className="font-display text-sm font-bold text-cosmic-glow uppercase tracking-widest">
                    {MONTHS[month]} {year}
                </h3>

                <button onClick={nextMonth}
                        className="w-8 h-8 rounded-lg border border-cosmic-teal/20
            text-cosmic-text/60 hover:text-cosmic-glow hover:border-cosmic-teal/50
            transition-all duration-200 font-display text-sm">
                    ›
                </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                    <div key={d} className="text-center font-display text-[9px]
            uppercase tracking-widest text-cosmic-text/30 py-1">
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5">
                {/* Empty cells before first day */}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                    const key    = dateKey(day)
                    const events = eventsByDate[key] || []
                    const isToday = day === today.getDate()
                        && month === today.getMonth()
                        && year  === today.getFullYear()

                    return (
                        <motion.div
                            key={day}
                            whileHover={events.length ? { scale: 1.1 } : {}}
                            onClick={() => events.length && onSelectEvent(events[0])}
                            className="aspect-square rounded-lg flex flex-col
                items-center justify-start pt-1 relative
                transition-all duration-200"
                            style={{
                                cursor: events.length ? 'pointer' : 'default',
                                backgroundColor: isToday
                                    ? 'rgba(102,252,241,0.12)'
                                    : events.length ? 'rgba(69,162,158,0.06)' : 'transparent',
                                border: isToday ? '1px solid rgba(102,252,241,0.4)' : '1px solid transparent',
                            }}
                        >
                            {/* Day number */}
                            <span className="font-display text-[11px]"
                                  style={{ color: isToday ? '#66FCF1'
                                          : events.length ? '#C5C6C7' : 'rgba(197,198,199,0.35)' }}>
                {day}
              </span>

                            {/* Event dots */}
                            {events.length > 0 && (
                                <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                                    {events.slice(0, 3).map((ev, i) => (
                                        <div key={i} className="w-1.5 h-1.5 rounded-full"
                                             style={{ backgroundColor: ev.color,
                                                 boxShadow: `0 0 4px ${ev.color}` }} />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-cosmic-teal/10
        flex flex-wrap gap-3">
                {Object.entries(TYPE_META).filter(([k]) => k !== 'all').map(([key, meta]) => (
                    <div key={key} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full"
                             style={{ backgroundColor: meta.color }} />
                        <span className="font-display text-[9px] uppercase tracking-wider text-cosmic-text/40">
              {meta.label}
            </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalendarView