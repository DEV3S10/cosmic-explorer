import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'

const useAsteroids = () => {
    const [data,    setData]    = useState([])
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                // Always use today's real date — hardcoded dates go stale
                const today = new Date()
                const end   = new Date()
                end.setDate(end.getDate() + 7)

                const fmt = (d) => d.toISOString().split('T')[0]
                const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fmt(today)}&end_date=${fmt(end)}&api_key=${API_KEY}`

                console.log('Fetching asteroids from:', url)  // debug

                const res = await fetch(url)

                if (!res.ok) {
                    const err = await res.json()
                    throw new Error(err.error?.message || `NeoWs error: ${res.status}`)
                }

                const raw = await res.json()
                console.log('Asteroid raw data:', raw)  // debug

                // Flatten all dates into one array
                const allAsteroids = Object.values(raw.near_earth_objects || {})
                    .flat()
                    .map(a => ({
                        id:          a.id,
                        name:        a.name.replace(/[()]/g, '').trim(),
                        type:        'asteroid',
                        icon:        a.is_potentially_hazardous_asteroid ? '⚠️' : '🪨',
                        color:       a.is_potentially_hazardous_asteroid ? '#C1440E' : '#A0937D',
                        glowColor:   a.is_potentially_hazardous_asteroid
                            ? 'rgba(193,68,14,0.3)'
                            : 'rgba(160,147,125,0.3)',
                        diameter:    formatDiameter(a),
                        distance:    formatDistance(a),
                        moons:       0,
                        description: buildAsteroidDescription(a),
                        discovered:  a.close_approach_data?.[0]?.close_approach_date || 'Unknown',
                        mass:        'Unknown',
                        velocity:    formatVelocity(a),
                        hazardous:   a.is_potentially_hazardous_asteroid,
                        nasaUrl:     a.nasa_jpl_url,
                    }))
                    .sort((a, b) => b.hazardous - a.hazardous)

                setData(allAsteroids)
            } catch (err) {
                console.error('Asteroid fetch error:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])

    return { data, loading, error }
}

// ── HELPERS ────────────────────────────────────────────────────
const formatDiameter = (a) => {
    const min = a.estimated_diameter?.kilometers?.estimated_diameter_min
    const max = a.estimated_diameter?.kilometers?.estimated_diameter_max
    if (!min || !max) return 'Unknown'
    const avgM = Math.round(((min + max) / 2) * 1000)
    return avgM > 1000
        ? `~${(avgM / 1000).toFixed(1)} km`
        : `~${avgM} m`
}

const formatDistance = (a) => {
    const km = parseFloat(a.close_approach_data?.[0]?.miss_distance?.kilometers)
    if (!km) return 'Unknown'
    return km > 1_000_000
        ? `${(km / 1_000_000).toFixed(2)}M km miss distance`
        : `${Math.round(km).toLocaleString()} km miss distance`
}

const formatVelocity = (a) => {
    const v = parseFloat(a.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour)
    if (!v) return 'Unknown'
    return `${Math.round(v).toLocaleString()} km/h`
}

const buildAsteroidDescription = (a) => {
    const parts = []
    if (a.is_potentially_hazardous_asteroid) {
        parts.push('⚠️ Classified as potentially hazardous by NASA.')
    }
    const date = a.close_approach_data?.[0]?.close_approach_date
    if (date) parts.push(`Close approach to Earth on ${date}.`)
    const vel = formatVelocity(a)
    if (vel !== 'Unknown') parts.push(`Traveling at ${vel}.`)
    const dist = formatDistance(a)
    if (dist !== 'Unknown') parts.push(`Miss distance: ${dist}.`)
    return parts.join(' ') || 'Near-Earth asteroid tracked by NASA.'
}

export default useAsteroids
