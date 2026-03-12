import { motion } from 'framer-motion'

const Loader = ({ message = 'Loading...' }) => (
    <div className="flex flex-col items-center justify-center gap-4 p-12">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 rounded-full border-2 border-cosmic-teal/20
        border-t-cosmic-glow"
        />
        <p className="font-display text-xs uppercase tracking-widest text-cosmic-text/40">
            {message}
        </p>
    </div>
)

export default Loader