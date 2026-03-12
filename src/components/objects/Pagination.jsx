import { motion } from 'framer-motion'

const Pagination = ({ currentPage, totalPages, onChange }) => {
    if (totalPages <= 1) return null  // don't show if only 1 page

    // Generate page numbers array, e.g. [1, 2, 3, 4, 5]
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="flex items-center justify-center gap-2 mt-8">

            {/* Previous button */}
            <button
                onClick={() => onChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg font-display text-xs uppercase tracking-wider
          border border-cosmic-teal/20 text-cosmic-text/50
          hover:border-cosmic-teal/50 hover:text-cosmic-glow
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-200"
            >
                ← Prev
            </button>

            {/* Page number buttons */}
            {pages.map(page => (
                <motion.button
                    key={page}
                    onClick={() => onChange(page)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-lg font-display text-xs
            border transition-all duration-200"
                    style={page === currentPage ? {
                        backgroundColor: 'rgba(102,252,241,0.15)',
                        borderColor: 'rgba(102,252,241,0.5)',
                        color: '#66FCF1',
                        boxShadow: '0 0 12px rgba(102,252,241,0.3)',
                    } : {
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(69,162,158,0.2)',
                        color: 'rgba(197,198,199,0.5)',
                    }}
                >
                    {page}
                </motion.button>
            ))}

            {/* Next button */}
            <button
                onClick={() => onChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg font-display text-xs uppercase tracking-wider
          border border-cosmic-teal/20 text-cosmic-text/50
          hover:border-cosmic-teal/50 hover:text-cosmic-glow
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-200"
            >
                Next →
            </button>
        </div>
    )
}

export default Pagination