import { motion, AnimatePresence } from 'framer-motion'

const PlanetInfoModal = ({ planet, onClose }) => {
    return (
        <AnimatePresence>
            {planet && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-end md:items-center
            justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 60, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        onClick={e => e.stopPropagation()}
                        className="relative w-full max-w-md rounded-3xl p-6 overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, #1F2833 0%, #0B0C10 100%)`,
                            border: `1px solid ${planet?.color || '#45A29E'}`,
                            boxShadow: `0 0 40px ${planet?.color}40`,
                        }}
                    >
                        {/* Glow bg */}
                        <div className="absolute inset-0 pointer-events-none rounded-3xl"
                             style={{ background: `radial-gradient(circle at 15% 15%, ${planet?.color}15, transparent 60%)` }} />

                        {/* Close */}
                        <button onClick={onClose}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full
                bg-cosmic-bg/60 border border-cosmic-teal/20
                text-cosmic-text/60 hover:text-cosmic-glow
                flex items-center justify-center text-sm transition-all duration-200">
                            ✕
                        </button>

                        <div className="relative">
                            {/* Planet icon + name */}
                            <div className="flex items-center gap-4 mb-4">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                    className="text-5xl"
                                >
                                    {planet?.icon}
                                </motion.div>
                                <div>
                                    <p className="font-display text-[10px] uppercase tracking-widest text-cosmic-teal/60 mb-0.5">
                                        Solar System
                                    </p>
                                    <h2 className="font-display text-2xl font-bold"
                                        style={{ color: planet?.color, textShadow: `0 0 16px ${planet?.color}80` }}>
                                        {planet?.name}
                                    </h2>
                                </div>
                            </div>

                            <p className="font-body text-cosmic-text/70 text-sm leading-relaxed mb-5">
                                {planet?.description}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: 'Diameter',        value: planet?.diameter },
                                    { label: 'Distance',         value: planet?.distance },
                                    { label: 'Moons',            value: planet?.moons },
                                    { label: 'Orbital Period',   value: planet?.orbitalPeriod },
                                    { label: 'Surface Temp',     value: planet?.surfaceTemp },
                                ].map(s => (
                                    <div key={s.label} className="bg-cosmic-bg/50 rounded-xl p-2.5
                    border border-cosmic-teal/10">
                                        <div className="font-display text-[9px] text-cosmic-text/40 uppercase tracking-widest mb-1">
                                            {s.label}
                                        </div>
                                        <div className="font-body text-xs text-cosmic-text/80">{s.value}</div>
                                    </div>
                                ))}

                                <div className="bg-cosmic-bg/50 rounded-xl p-2.5 border border-cosmic-teal/10
                  flex items-center justify-center cursor-pointer
                  hover:border-cosmic-accent/40 hover:shadow-accent
                  transition-all duration-300 group">
                  <span className="font-display text-[9px] uppercase tracking-widest
                    text-cosmic-text/40 group-hover:text-cosmic-accent transition-colors">
                    ⭐ Favorite
                  </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PlanetInfoModal