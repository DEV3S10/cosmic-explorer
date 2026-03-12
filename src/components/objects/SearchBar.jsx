import { motion } from 'framer-motion'

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative group">
            {/* Search icon */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cosmic-text/40
        group-focus-within:text-cosmic-teal transition-colors duration-300 text-sm">
        🔍
      </span>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search planets, moons, asteroids..."
                className="
          w-full pl-10 pr-4 py-3 rounded-xl
          bg-cosmic-card/60 backdrop-blur-sm
          border border-cosmic-teal/20
          focus:border-cosmic-teal/60 focus:outline-none
          focus:shadow-glow
          font-body text-sm text-cosmic-text
          placeholder:text-cosmic-text/30
          transition-all duration-300
        "
            />

            {/* Clear button — only shows when there's text */}
            {value && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => onChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2
            text-cosmic-text/40 hover:text-cosmic-glow
            transition-colors duration-200 text-xs px-1"
                >
                    ✕
                </motion.button>
            )}
        </div>
    )
}

export default SearchBar