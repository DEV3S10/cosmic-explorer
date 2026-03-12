import { motion } from 'framer-motion'

const ZoomControl = ({ zoom, onZoomIn, onZoomOut, onReset }) => {
    return (
        <div className="flex flex-col gap-1">
            {[
                { icon: '+', action: onZoomIn,  title: 'Zoom In',  disabled: zoom >= 4 },
                { icon: '−', action: onZoomOut, title: 'Zoom Out', disabled: zoom <= 0.5 },
                { icon: '⌂', action: onReset,   title: 'Reset',    disabled: false },
            ].map(btn => (
                <motion.button
                    key={btn.title}
                    onClick={btn.action}
                    disabled={btn.disabled}
                    whileHover={{ scale: btn.disabled ? 1 : 1.1 }}
                    whileTap={{ scale: btn.disabled ? 1 : 0.9 }}
                    title={btn.title}
                    className="w-9 h-9 rounded-lg font-display text-base
            border border-cosmic-teal/20 bg-cosmic-card/80
            text-cosmic-text/60 hover:text-cosmic-glow
            hover:border-cosmic-teal/50 hover:bg-cosmic-card
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-200 flex items-center justify-center"
                >
                    {btn.icon}
                </motion.button>
            ))}

            {/* Zoom level indicator */}
            <div className="font-display text-[9px] text-cosmic-text/30
        text-center uppercase tracking-widest mt-1">
                {Math.round(zoom * 100)}%
            </div>
        </div>
    )
}

export default ZoomControl