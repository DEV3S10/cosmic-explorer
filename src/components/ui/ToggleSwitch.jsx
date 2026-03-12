import { motion } from 'framer-motion'

const ToggleSwitch = ({ enabled, onChange, label }) => (
    <div className="flex items-center gap-3">
        {label && (
            <span className="font-display text-xs uppercase tracking-widest text-cosmic-text/60">
        {label}
      </span>
        )}
        <button
            onClick={() => onChange(!enabled)}
            className="relative w-11 h-6 rounded-full border transition-all duration-300"
            style={{
                backgroundColor: enabled ? 'rgba(102,252,241,0.2)' : 'rgba(31,40,51,0.8)',
                borderColor:     enabled ? 'rgba(102,252,241,0.5)' : 'rgba(69,162,158,0.2)',
                boxShadow:       enabled ? '0 0 10px rgba(102,252,241,0.3)' : 'none',
            }}
        >
            <motion.div
                animate={{ x: enabled ? 22 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 rounded-full"
                style={{ backgroundColor: enabled ? '#66FCF1' : '#45A29E' }}
            />
        </button>
    </div>
)

export default ToggleSwitch