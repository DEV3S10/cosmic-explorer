import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PhotoCard = ({ data, loading }) => {
    const [fullscreen, setFullscreen] = useState(false)
    const [imgLoaded, setImgLoaded]   = useState(false)

    // Loading skeleton
    if (loading) {
        return (
            <div className="rounded-2xl overflow-hidden bg-cosmic-card/60
        border border-cosmic-teal/20 aspect-video relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="text-4xl"
                    >🔭</motion.div>
                </div>
                {/* Shimmer effect */}
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r
            from-transparent via-cosmic-teal/5 to-transparent
            skew-x-12"
                />
            </div>
        )
    }

    if (!data) return null

    const isVideo = data.media_type === 'video'

    return (
        <>
            {/* Main photo card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden bg-cosmic-card/60
          border border-cosmic-teal/20 hover:border-cosmic-teal/40
          transition-all duration-500 group relative"
            >
                {isVideo ? (
                    // YouTube embed for video APODs
                    <div className="aspect-video">
                        <iframe
                            src={data.url}
                            title={data.title}
                            className="w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        />
                    </div>
                ) : (
                    <div className="relative aspect-video overflow-hidden cursor-zoom-in"
                         onClick={() => setFullscreen(true)}>

                        {/* Image skeleton while loading */}
                        {!imgLoaded && (
                            <div className="absolute inset-0 bg-cosmic-bg/80 animate-pulse" />
                        )}

                        <motion.img
                            src={data.url}
                            alt={data.title}
                            onLoad={() => setImgLoaded(true)}
                            className="w-full h-full object-cover transition-transform duration-700
                group-hover:scale-105"
                            style={{ opacity: imgLoaded ? 1 : 0 }}
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              flex items-end justify-between p-4">
              <span className="font-display text-xs text-cosmic-text/80 uppercase tracking-wider">
                Click for fullscreen
              </span>
                            <span className="font-display text-xs text-cosmic-glow uppercase tracking-wider">
                🔍 HD View
              </span>
                        </div>
                    </div>
                )}

                {/* Caption bar */}
                <div className="p-4 flex items-center justify-between
          border-t border-cosmic-teal/10">
                    <div>
                        <p className="font-display text-xs text-cosmic-text/40 uppercase tracking-widest mb-0.5">
                            {data.date}
                        </p>
                        <h2 className="font-display text-sm font-bold text-cosmic-glow">
                            {data.title}
                        </h2>
                    </div>
                    {data.copyright && (
                        <p className="font-body text-[10px] text-cosmic-text/30 text-right">
                            © {data.copyright}
                        </p>
                    )}
                </div>
            </motion.div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {fullscreen && !isVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md
              flex items-center justify-center p-4 cursor-zoom-out"
                        onClick={() => setFullscreen(false)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 w-10 h-10 rounded-full
                bg-cosmic-card/80 border border-cosmic-teal/30
                text-cosmic-text hover:text-cosmic-glow
                flex items-center justify-center
                transition-all duration-200 z-10 text-lg"
                            onClick={() => setFullscreen(false)}
                        >
                            ✕
                        </button>

                        {/* HD image */}
                        <motion.img
                            src={data.hdurl || data.url}
                            alt={data.title}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-full max-h-full object-contain rounded-xl"
                            onClick={e => e.stopPropagation()}
                        />

                        {/* Caption */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2
              bg-cosmic-card/80 backdrop-blur-sm rounded-xl px-6 py-3
              border border-cosmic-teal/20 text-center">
                            <p className="font-display text-sm text-cosmic-glow">{data.title}</p>
                            <p className="font-body text-xs text-cosmic-text/50 mt-1">{data.date}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default PhotoCard