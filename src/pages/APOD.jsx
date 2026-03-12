import { useState } from 'react'
import { motion } from 'framer-motion'
import useAPOD from '../hooks/useAPOD'
import PhotoCard from '../components/apod/PhotoCard'
import PhotoDescription from '../components/apod/PhotoDescription'
import DateSelector from '../components/apod/DateSelector'

const APOD = () => {
    // null = today's date (no date param sent to API)
    const [selectedDate, setSelectedDate] = useState(null)
    const { data, loading, error } = useAPOD(selectedDate)

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="font-display text-3xl font-bold text-cosmic-glow
          tracking-wider uppercase
          [text-shadow:0_0_20px_rgba(102,252,241,0.5)]">
                    Astronomy Picture
                </h1>
                <p className="text-cosmic-text/60 font-body mt-1 text-sm">
                    Every day NASA publishes a new image or video of our universe
                </p>
            </motion.div>

            {/* Error state */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30
            text-red-400 font-body text-sm flex items-center gap-3"
                >
                    <span className="text-2xl">⚠️</span>
                    <div>
                        <p className="font-display text-xs uppercase tracking-widest mb-1">API Error</p>
                        <p>{error}</p>
                        <p className="text-xs text-red-400/60 mt-1">
                            Check your API key in .env or try a different date
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Main layout: 3 columns on desktop */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Left column: date selector + metadata */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="xl:col-span-1 flex flex-col gap-4"
                >
                    <DateSelector
                        selectedDate={selectedDate}
                        onChange={setSelectedDate}
                    />

                    {/* Live metadata card — shown while image loads */}
                    {data && !loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl p-5 bg-cosmic-card/60
                border border-cosmic-teal/20 space-y-3"
                        >
                            <h4 className="font-display text-xs uppercase tracking-widest text-cosmic-teal">
                                📡 Live Data
                            </h4>

                            {[
                                { icon: '🗓️', label: 'Date',       value: data.date },
                                { icon: '🎬', label: 'Type',       value: data.media_type },
                                { icon: '🔭', label: 'Source',     value: 'NASA APOD API' },
                                { icon: '📡', label: 'Resolution', value: data.hdurl ? 'HD Available' : 'Standard' },
                            ].map(item => (
                                <div key={item.label} className="flex items-center gap-3
                  text-xs font-body">
                                    <span>{item.icon}</span>
                                    <span className="text-cosmic-text/40 uppercase tracking-widest font-display text-[10px] w-20">
                    {item.label}
                  </span>
                                    <span className="text-cosmic-text/70">{item.value}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Fun stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-2xl p-5 bg-cosmic-card/60
              border border-cosmic-accent/20"
                    >
                        <h4 className="font-display text-xs uppercase tracking-widest text-cosmic-accent mb-3">
                            💫 Did You Know?
                        </h4>
                        <p className="font-body text-cosmic-text/60 text-xs leading-relaxed">
                            APOD has been publishing daily since June 16, 1995 — that's over{' '}
                            <span className="text-cosmic-accent font-bold">
                {Math.floor((new Date() - new Date('1995-06-16')) / (1000 * 60 * 60 * 24)).toLocaleString()}
              </span>{' '}
                            images of the cosmos. Each is personally reviewed by NASA scientists.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Right columns: photo + description */}
                <div className="xl:col-span-2 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <PhotoCard data={data} loading={loading} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <PhotoDescription data={data} loading={loading} />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default APOD