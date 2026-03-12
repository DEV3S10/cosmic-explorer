import { motion } from 'framer-motion'
import { useState } from 'react'
import { TYPE_STYLES } from '../../data/spaceObjects'

const ObjectCard = ({ object, onClick }) => {
    const [hovered, setHovered] = useState(false)
    const typeStyle = TYPE_STYLES[object.type]

    return (
        <motion.div
            layout  // smooth reflow when grid changes
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={() => onClick(object)}
            className="relative rounded-2xl p-5 cursor-pointer overflow-hidden
        bg-cosmic-card/70 backdrop-blur-sm
        border transition-all duration-300"
            style={{
                borderColor: hovered ? object.color : 'rgba(69,162,158,0.15)',
                boxShadow: hovered ? `0 0 24px ${object.glowColor}, 0 8px 32px rgba(0,0,0,0.4)` : 'none',
            }}
        >
            {/* Background glow blob */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${object.glowColor}, transparent 70%)` }}
            />

            {/* Top row: icon + type badge */}
            <div className="relative flex items-start justify-between mb-3">
                {/* Planet/object icon with spinning ring on hover */}
                <div className="relative">
                    <motion.div
                        animate={{ rotate: hovered ? 360 : 0 }}
                        transition={{ duration: hovered ? 8 : 0, ease: 'linear', repeat: hovered ? Infinity : 0 }}
                        className="text-4xl"
                    >
                        {object.icon}
                    </motion.div>
                </div>

                {/* Type badge */}
                <span className="font-display text-[10px] uppercase tracking-widest px-2 py-1 rounded-full"
                      style={{
                          backgroundColor: typeStyle.bg,
                          border: `1px solid ${typeStyle.border}`,
                          color: typeStyle.text,
                      }}>
          {object.type}
        </span>
            </div>

            {/* Name */}
            <h3 className="font-display text-base font-bold mb-1 transition-colors duration-300"
                style={{ color: hovered ? object.color : '#C5C6C7' }}>
                {object.name}
            </h3>

            {/* Short description */}
            <p className="font-body text-cosmic-text/50 text-xs leading-relaxed line-clamp-2 mb-4">
                {object.description}
            </p>

            {/* Stats row */}
            <div className="flex gap-3 text-[10px] font-body">
                <div>
                    <span className="text-cosmic-text/30 uppercase tracking-wide">Size </span>
                    <span className="text-cosmic-text/70">{object.diameter}</span>
                </div>
                {object.moons > 0 && (
                    <div>
                        <span className="text-cosmic-text/30 uppercase tracking-wide">Moons </span>
                        <span className="text-cosmic-text/70">{object.moons}</span>
                    </div>
                )}
            </div>

            {/* Hover reveal: "View Details" */}
            <motion.div
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 right-4 font-display text-[10px] uppercase tracking-widest"
                style={{ color: object.color }}
            >
                View Details →
            </motion.div>
        </motion.div>
    )
}

export default ObjectCard