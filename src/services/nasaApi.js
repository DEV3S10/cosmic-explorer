// Base URL and key loaded once here — never scattered around components
const BASE_URL = 'https://api.nasa.gov'
const API_KEY  = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'

// ─── APOD ────────────────────────────────────────────────────────
// date: 'YYYY-MM-DD' string, or undefined for today
export const fetchAPOD = async (date = '') => {
    const dateParam = date ? `&date=${date}` : ''
    const url = `${BASE_URL}/planetary/apod?api_key=${API_KEY}${dateParam}`

    const res = await fetch(url)

    // If NASA returns an error (bad date, rate limit, etc.)
    // response.ok is false — we throw so our hook can catch it
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.msg || `NASA API error: ${res.status}`)
    }

    return res.json()
}

// ─── APOD RANGE ──────────────────────────────────────────────────
// Fetch a range of APODs (for a gallery view, optional later)
export const fetchAPODRange = async (startDate, endDate) => {
    const url = `${BASE_URL}/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`NASA API error: ${res.status}`)
    return res.json()
}

// ─── ASTEROIDS (Near Earth Objects) ─────────────────────────────
// We'll use this in a future enhancement
export const fetchNearEarthObjects = async (startDate, endDate) => {
    const url = `${BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`NASA API error: ${res.status}`)
    return res.json()
}

// ─── HELPERS ─────────────────────────────────────────────────────
// Format a Date object to 'YYYY-MM-DD' string for the API
export const formatDateForAPI = (date) => {
    return date.toISOString().split('T')[0]
}

// APOD started on June 16, 1995 — don't let users go before that
export const APOD_START_DATE = new Date('1995-06-16')
export const TODAY = new Date()

// ─── SOLAR SYSTEM OPEN DATA ──────────────────────────────────────
// No API key needed! Returns all planets, moons, asteroids
const SS_BASE = 'https://api.le-systeme-solaire.net/rest'

export const fetchAllBodies = async () => {
    const res = await fetch(`${SS_BASE}/bodies?order=englishName,asc&data=id,englishName,bodyType,meanRadius,mass,gravity,discoveredBy,discoveryDate,moons,perihelion,aphelion,avgTemp&page=1&pageSize=50`)
    if (!res.ok) throw new Error(`Solar System API error: ${res.status}`)
    return res.json()
}

export const fetchBodyByType = async (type) => {
    // type: 'Planet', 'Moon', 'Dwarf Planet', 'Asteroid', 'Comet'
    const res = await fetch(`${SS_BASE}/bodies?filter[]=bodyType,eq,${type}&order=englishName,asc&data=id,englishName,bodyType,meanRadius,mass,gravity,moons,perihelion,aphelion,avgTemp,discoveredBy,discoveryDate`)
    if (!res.ok) throw new Error(`Solar System API error: ${res.status}`)
    return res.json()
}

export const fetchBodyById = async (id) => {
    const res = await fetch(`${SS_BASE}/bodies/${id}`)
    if (!res.ok) throw new Error(`Solar System API error: ${res.status}`)
    return res.json()
}

// ─── NASA NEOWS — ASTEROIDS THIS WEEK ───────────────────────────
export const fetchAsteroidsThisWeek = async () => {
    const today = new Date()
    const end   = new Date()
    end.setDate(end.getDate() + 7)
    const start = formatDateForAPI(today)
    const stop  = formatDateForAPI(end)
    const url = `${BASE_URL}/neo/rest/v1/feed?start_date=${start}&end_date=${stop}&api_key=${API_KEY}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`NeoWs error: ${res.status}`)
    return res.json()
}

// ─── LAUNCH LIBRARY 2 — UPCOMING ROCKET LAUNCHES ────────────────
// Free tier: 15 requests/hour, no key needed
const LL2_BASE = 'https://ll2.thespacedevs.com/2.2.0'

export const fetchUpcomingLaunches = async (limit = 5) => {
    const res = await fetch(`${LL2_BASE}/launch/upcoming/?limit=${limit}&format=json`)
    if (!res.ok) throw new Error(`Launch Library error: ${res.status}`)
    return res.json()
}