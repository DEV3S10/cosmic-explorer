import { motion } from 'framer-motion'
import StarGrid from '../components/stars/StarGrid'

const StarsMap = () => {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto h-[calc(100vh-73px)] flex flex-col">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex-shrink-0"
            >
                <h1 className="font-display text-3xl font-bold text-cosmic-glow
          tracking-wider uppercase
          [text-shadow:0_0_20px_rgba(102,252,241,0.5)]">
                    Star Map
                </h1>
                <p className="text-cosmic-text/60 font-body mt-1 text-sm">
                    {40} named stars • {4} constellations • Scroll to zoom • Drag to pan
                </p>
            </motion.div>

            {/* Star map takes remaining height */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex-1 min-h-0"
            >
                <StarGrid />
            </motion.div>
        </div>
    )
}

export default StarsMap