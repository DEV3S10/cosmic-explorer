import { motion } from 'framer-motion'

// Splits explanation into words and animates each one in
const AnimatedText = ({ text }) => {
    const words = text.split(' ')

    return (
        <p className="font-body text-cosmic-text/75 text-sm leading-relaxed">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: i * 0.015,      // each word waits 15ms — 100 words = 1.5s total
                        duration: 0.3,
                        ease: 'easeOut',
                    }}
                    className="inline-block mr-1"
                >
                    {word}
                </motion.span>
            ))}
        </p>
    )
}

const PhotoDescription = ({ data, loading }) => {
    if (loading) {
        return (
            <div className="rounded-2xl p-6 bg-cosmic-card/60
        border border-cosmic-teal/20 space-y-3">
                {/* Text skeleton lines */}
                {[100, 90, 95, 85, 70].map((w, i) => (
                    <div key={i}
                         className="h-3 bg-cosmic-teal/10 rounded-full animate-pulse"
                         style={{ width: `${w}%`, animationDelay: `${i * 100}ms` }}
                    />
                ))}
            </div>
        )
    }

    if (!data) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 bg-cosmic-card/60 backdrop-blur-sm
        border border-cosmic-teal/20 hover:border-cosmic-teal/30
        transition-all duration-500"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="font-display text-[10px] uppercase tracking-widest
            text-cosmic-teal/60 mb-1">
                        Astronomy Picture of the Day
                    </p>
                    <h3 className="font-display text-lg font-bold text-cosmic-glow">
                        {data.title}
                    </h3>
                </div>

                {/* Media type badge */}
                <span className="font-display text-[10px] uppercase tracking-widest
          px-2 py-1 rounded-full flex-shrink-0 ml-2
          bg-cosmic-teal/10 border border-cosmic-teal/30 text-cosmic-teal">
          {data.media_type === 'video' ? '🎬 Video' : '📷 Image'}
        </span>
            </div>

            {/* Animated description */}
            <AnimatedText key={data.date} text={data.explanation} />

            {/* Footer metadata */}
            <div className="mt-5 pt-4 border-t border-cosmic-teal/10
        flex flex-wrap gap-4 text-[11px]">
                <div>
                    <span className="font-display text-cosmic-text/30 uppercase tracking-widest">Date </span>
                    <span className="font-body text-cosmic-text/60">{data.date}</span>
                </div>
                {data.copyright && (
                    <div>
                        <span className="font-display text-cosmic-text/30 uppercase tracking-widest">Photo by </span>
                        <span className="font-body text-cosmic-text/60">{data.copyright}</span>
                    </div>
                )}
                {data.hdurl && data.media_type === 'image' && (
                    <a
                    href={data.hdurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-cosmic-teal/60 hover:text-cosmic-glow
                    uppercase tracking-widest transition-colors duration-200 ml-auto"
                    >
                    HD Download ↗
                    </a>
                    )}
            </div>
        </motion.div>
    )
}

export default PhotoDescription