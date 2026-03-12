import { motion } from 'framer-motion'
import { APOD_START_DATE, formatDateForAPI } from '../../services/nasaApi'

const DateSelector = ({ selectedDate, onChange }) => {
    const today    = new Date()
    const minDate  = formatDateForAPI(APOD_START_DATE)
    const maxDate  = formatDateForAPI(today)

    // Quick-jump buttons for common date offsets
    const quickJumps = [
        { label: 'Today',      offset: 0 },
        { label: 'Yesterday',  offset: -1 },
        { label: '1 Week Ago', offset: -7 },
        { label: '1 Month Ago',offset: -30 },
        { label: 'Random',     offset: 'random' },
    ]

    const handleQuickJump = (offset) => {
        if (offset === 'random') {
            // Pick a random date between APOD start and today
            const start = APOD_START_DATE.getTime()
            const end   = today.getTime()
            const randomTime = start + Math.random() * (end - start)
            onChange(new Date(randomTime))
        } else {
            const d = new Date()
            d.setDate(d.getDate() + offset)
            onChange(d)
        }
    }

    const handleInputChange = (e) => {
        // e.target.value is 'YYYY-MM-DD' — convert to Date object
        const [year, month, day] = e.target.value.split('-').map(Number)
        // month is 0-indexed in JS Date — subtract 1
        onChange(new Date(year, month - 1, day))
    }

    return (
        <div className="rounded-2xl p-5 bg-cosmic-card/60 backdrop-blur-sm
      border border-cosmic-teal/20">

            <h3 className="font-display text-xs uppercase tracking-widest text-cosmic-teal mb-4
        flex items-center gap-2">
                <span>📅</span> Select Date
            </h3>

            {/* Date input */}
            <div className="relative mb-4">
                <input
                    type="date"
                    min={minDate}
                    max={maxDate}
                    value={selectedDate ? formatDateForAPI(selectedDate) : maxDate}
                    onChange={handleInputChange}
                    className="
            w-full px-4 py-3 rounded-xl
            bg-cosmic-bg/60 border border-cosmic-teal/20
            focus:border-cosmic-teal/60 focus:outline-none focus:shadow-glow
            font-body text-sm text-cosmic-text
            transition-all duration-300
            [color-scheme:dark]
          "
                />
            </div>

            {/* Quick jump buttons */}
            <div className="flex flex-wrap gap-2">
                {quickJumps.map((jump) => (
                    <motion.button
                        key={jump.label}
                        onClick={() => handleQuickJump(jump.offset)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 rounded-lg
              font-display text-[10px] uppercase tracking-wider
              border border-cosmic-teal/20 text-cosmic-text/60
              hover:border-cosmic-teal/50 hover:text-cosmic-glow
              hover:bg-cosmic-teal/5 hover:shadow-glow
              transition-all duration-200"
                    >
                        {jump.label === 'Random' ? '🎲 ' : ''}{jump.label}
                    </motion.button>
                ))}
            </div>

            {/* APOD archive info */}
            <p className="font-body text-[10px] text-cosmic-text/30 mt-3">
                Archive spans from June 16, 1995 to today — over {Math.floor((today - APOD_START_DATE) / (1000 * 60 * 60 * 24)).toLocaleString()} images
            </p>
        </div>
    )
}

export default DateSelector