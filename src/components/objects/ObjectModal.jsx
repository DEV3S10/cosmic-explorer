import { motion, AnimatePresence } from 'framer-motion'
import { TYPE_STYLES } from '../../data/spaceObjects'
import useFavoritesStore from '../../store/useFavoritesStore'

const ObjectModal = ({ object, onClose }) => {
    if (!object) return null
    const typeStyle = TYPE_STYLES[object.type]
    const { toggleFavorite, isFavorite } = useFavoritesStore()
    const favorited = isFavorite(object.id)

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
                {/* Modal panel — stopPropagation prevents closing when clicking inside */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 30 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    onClick={e => e.stopPropagation()}
                    className="relative w-full max-w-lg rounded-3xl p-8 overflow-hidden
            bg-cosmic-card border"
                    style={{ borderColor: object.color }}
                >
                    {/* Glow background */}
                    <div className="absolute inset-0 pointer-events-none rounded-3xl"
                         style={{ background: `radial-gradient(circle at 20% 20%, ${object.glowColor}, transparent 60%)` }} />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full
              bg-cosmic-bg/60 border border-cosmic-teal/20
              text-cosmic-text/60 hover:text-cosmic-glow
              flex items-center justify-center text-sm
              transition-all duration-200 z-10"
                    >
                        ✕
                    </button>

                    <div className="relative">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="text-6xl"
                            >
                                {object.icon}
                            </motion.div>
                            <div>
                <span className="font-display text-[10px] uppercase tracking-widest px-2 py-1 rounded-full mb-2 inline-block"
                      style={{ backgroundColor: typeStyle.bg, color: typeStyle.text, border: `1px solid ${typeStyle.border}` }}>
                  {object.type}
                </span>
                                <h2 className="font-display text-3xl font-bold"
                                    style={{ color: object.color, textShadow: `0 0 20px ${object.glowColor}` }}>
                                    {object.name}
                                </h2>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="font-body text-cosmic-text/80 text-sm leading-relaxed mb-6">
                            {object.description}
                        </p>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Diameter', value: object.diameter },
                                { label: 'Distance', value: object.distance },
                                { label: 'Moons', value: object.moons },
                                { label: 'Discovered', value: object.discovered },
                                { label: 'Mass', value: object.mass },
                            ].map(stat => (
                                <div key={stat.label}
                                     className="bg-cosmic-bg/50 rounded-xl p-3 border border-cosmic-teal/10">
                                    <div className="font-display text-[10px] text-cosmic-text/40 uppercase tracking-widest mb-1">
                                        {stat.label}
                                    </div>
                                    <div className="font-body text-sm text-cosmic-text/90">
                                        {stat.value}
                                    </div>
                                </div>
                            ))}

                            {/* Favorite button */}
                            <div
                                onClick={() => toggleFavorite(object)}
                                className="bg-cosmic-bg/50 rounded-xl p-3 border
    flex items-center justify-center cursor-pointer
    transition-all duration-300 group"
                                style={{
                                    borderColor: favorited ? 'rgba(245,183,0,0.4)' : 'rgba(69,162,158,0.1)',
                                    backgroundColor: favorited ? 'rgba(245,183,0,0.08)' : undefined,
                                }}
                            >
  <span className="font-display text-[9px] uppercase tracking-widest
    transition-colors duration-200"
        style={{color: favorited ? '#F5B700' : 'rgba(197,198,199,0.4)'}}>
    {favorited ? '⭐ Favorited!' : '☆ Add Favorite'}
  </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ObjectModal