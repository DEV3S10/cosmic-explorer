import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OBJECT_TYPES } from '../data/spaceObjects'
import useSpaceBodies from '../hooks/useSpaceBodies'
import useAsteroids from '../hooks/useAsteroids'
import ObjectCard from '../components/objects/ObjectCard'
import SearchBar from '../components/objects/SearchBar'
import FilterBar from '../components/objects/FilterBar'
import Pagination from '../components/objects/Pagination'
import ObjectModal from '../components/objects/ObjectModal'
import Loader from '../components/ui/Loader'

const ITEMS_PER_PAGE = 6

const Objects = () => {
    const [search, setSearch]           = useState('')
    const [filter, setFilter]           = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedObject, setSelectedObject] = useState(null)

    // Live API data
    const { data: bodies,    loading: bodiesLoading,    error: bodiesError }    = useSpaceBodies(filter === 'asteroid' ? 'all' : filter)
    const { data: asteroids, loading: asteroidsLoading, error: asteroidsError } = useAsteroids()

    const loading = bodiesLoading || (filter === 'asteroid' && asteroidsLoading)

    // Merge live bodies + NASA asteroids depending on filter
    const allData = useMemo(() => {
        if (filter === 'asteroid') return asteroids
        if (filter === 'all') return [...bodies, ...asteroids.slice(0, 5)]
        return bodies
    }, [filter, bodies, asteroids])

    const filtered = useMemo(() => {
        return allData.filter(obj => {
            if (!search) return true
            const q = search.toLowerCase()
            return obj.name?.toLowerCase().includes(q) ||
                obj.description?.toLowerCase().includes(q)
        })
    }, [allData, search])

    const handleFilterChange = (f) => { setFilter(f);  setCurrentPage(1) }
    const handleSearchChange = (s) => { setSearch(s);  setCurrentPage(1) }

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
    const pageItems  = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const counts = useMemo(() => ({
        total:    allData.length,
        planet:   bodies.filter(b => b.type === 'planet').length,
        moon:     bodies.filter(b => b.type === 'moon').length,
        asteroid: asteroids.length,
        comet:    bodies.filter(b => b.type === 'comet').length,
    }), [bodies, asteroids])

    const error = bodiesError || asteroidsError

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-8">
                <h1 className="font-display text-3xl font-bold text-cosmic-glow
          tracking-wider uppercase
          [text-shadow:0_0_20px_rgba(102,252,241,0.5)]">
                    Space Objects
                </h1>
                <p className="text-cosmic-text/60 font-body mt-1 text-sm flex items-center gap-2">
                    {loading
                        ? 'Fetching live data from NASA & Solar System APIs...'
                        : `${filtered.length} objects • Live data`}
                    {/* Live indicator */}
                    {!loading && (
                        <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block w-1.5 h-1.5 rounded-full bg-cosmic-glow"
                        />
                    )}
                </p>
            </motion.div>

            {/* API Error banner */}
            {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30
            text-yellow-400 font-body text-xs flex items-center gap-2">
                    ⚠️ Some live data unavailable — showing cached results. ({error})
                </motion.div>
            )}

            {/* Search + Filter */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }} className="flex flex-col gap-4 mb-8">
                <SearchBar value={search} onChange={handleSearchChange} />
                <FilterBar activeFilter={filter} onChange={handleFilterChange} counts={counts} />
            </motion.div>

            {/* Results */}
            {loading ? (
                <Loader message="Loading space objects from NASA APIs..." />
            ) : (
                <AnimatePresence mode="wait">
                    {pageItems.length > 0 ? (
                        <motion.div
                            key={filter + search + currentPage}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                        >
                            {pageItems.map(obj => (
                                <ObjectCard key={obj.id} object={obj} onClick={setSelectedObject} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="text-center py-24">
                            <div className="text-6xl mb-4">🔭</div>
                            <p className="font-display text-cosmic-text/50 uppercase tracking-widest text-sm">
                                No objects found
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />

            {selectedObject && (
                <ObjectModal object={selectedObject} onClose={() => setSelectedObject(null)} />
            )}
        </div>
    )
}

export default Objects