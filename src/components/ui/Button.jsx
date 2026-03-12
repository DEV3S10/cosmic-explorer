import { motion } from 'framer-motion'

// variant: 'primary' | 'secondary' | 'ghost' | 'danger'
const VARIANTS = {
    primary: `bg-cosmic-teal/20 border-cosmic-teal/50 text-cosmic-glow
    hover:bg-cosmic-teal/30 hover:shadow-glow`,
    secondary: `bg-cosmic-card border-cosmic-teal/20 text-cosmic-text
    hover:border-cosmic-teal/40 hover:text-cosmic-glow`,
    ghost: `bg-transparent border-transparent text-cosmic-text/60
    hover:text-cosmic-glow`,
    danger: `bg-red-500/10 border-red-500/30 text-red-400
    hover:bg-red-500/20 hover:border-red-500/50`,
}

const Button = ({
                    children, variant = 'secondary',
                    onClick, disabled, className = '', icon
                }) => (
    <motion.button
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.03 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={`
      flex items-center gap-2 px-4 py-2.5 rounded-xl
      font-display text-xs uppercase tracking-wider
      border transition-all duration-300
      disabled:opacity-40 disabled:cursor-not-allowed
      ${VARIANTS[variant]} ${className}
    `}
    >
        {icon && <span>{icon}</span>}
        {children}
    </motion.button>
)

export default Button