import { motion, AnimatePresence } from 'framer-motion'
import { STAR_COLORS } from '../../data/starMap'

const StarTooltip = ({ star, svgPoint }) => {
    if (!star || !svgPoint) return null

    const starColor = STAR_COLORS[star.type] || STAR_COLORS.default

    // svgPoint gives us pixel coords in the browser window
    // We offset the tooltip so it doesn't cover the star
    return (
        <AnimatePresence>
            <motion.div
                key={star.id}
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15 }}
                className="fixed z-30 pointer-events-none"
                style={{
                    left: svgPoint.x + 16,
                    top:  svgPoint.y - 12,
                }}
            >
                <div className="bg-cosmic-card/95 backdrop-blur-md rounded-xl p-3
          border shadow-glow min-w-[160px]"
                     style={{ borderColor: starColor + '60' }}>

                    {/* Star name + color dot */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                             style={{ backgroundColor: starColor, boxShadow: `0 0 6px ${starColor}` }} />
                        <span className="font-display text-sm font-bold"
                              style={{ color: starColor }}>
              {star.name}
            </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-1">
                        {[
                            { label: 'Type',          value: star.type },
                            { label: 'Constellation', value: star.constellation },
                            { label: 'Distance',      value: star.distance },
                            { label: 'Magnitude',     value: star.mag },
                        ].map(item => (
                            <div key={item.label} className="flex justify-between gap-3 text-[10px]">
                <span className="font-display uppercase tracking-widest text-cosmic-text/30">
                  {item.label}
                </span>
                                <span className="font-body text-cosmic-text/70 text-right">
                  {item.value}
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default StarTooltip