import { motion } from 'framer-motion'

const SPEEDS = [
    { label: '¼×', value: 0.25 },
    { label: '1×', value: 1 },
    { label: '5×', value: 5 },
    { label: '20×', value: 20 },
]

const AnimationController = ({ timeScale, onChange }) => {
    return (
        <div className="flex items-center gap-2">
      <span className="font-display text-[10px] text-cosmic-text/40 uppercase tracking-widest mr-1">
        Speed
      </span>
            {SPEEDS.map(s => (
                <motion.button
                    key={s.value}
                    onClick={() => onChange(s.value)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-lg font-display text-xs
            border transition-all duration-200"
                    style={timeScale === s.value ? {
                        backgroundColor: 'rgba(102,252,241,0.15)',
                        borderColor: 'rgba(102,252,241,0.5)',
                        color: '#66FCF1',
                        boxShadow: '0 0 10px rgba(102,252,241,0.3)',
                    } : {
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(69,162,158,0.2)',
                        color: 'rgba(197,198,199,0.5)',
                    }}
                >
                    {s.label}
                </motion.button>
            ))}
        </div>
    )
}

export default AnimationController