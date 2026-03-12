export const SPACE_OBJECTS = [
    // ── PLANETS ──
    {
        id: 1, name: 'Mercury', type: 'planet', icon: '⚫',
        color: '#9B9B9B', glowColor: 'rgba(155,155,155,0.3)',
        diameter: '4,879 km', distance: '77.3M km from Sun',
        moons: 0, description: 'Smallest planet and closest to the Sun. Surface temperatures swing from -180°C to 430°C.',
        discovered: 'Ancient', mass: '3.3 × 10²³ kg',
    },
    {
        id: 2, name: 'Venus', type: 'planet', icon: '🟡',
        color: '#E8C97A', glowColor: 'rgba(232,201,122,0.3)',
        diameter: '12,104 km', distance: '261M km from Sun',
        moons: 0, description: 'Hottest planet with a crushing atmosphere of CO₂ and sulfuric acid clouds.',
        discovered: 'Ancient', mass: '4.87 × 10²⁴ kg',
    },
    {
        id: 3, name: 'Earth', type: 'planet', icon: '🌍',
        color: '#4B9CD3', glowColor: 'rgba(75,156,211,0.3)',
        diameter: '12,742 km', distance: '149.6M km from Sun',
        moons: 1, description: 'Our home — the only known planet harboring life, with liquid water oceans.',
        discovered: 'Ancient', mass: '5.97 × 10²⁴ kg',
    },
    {
        id: 4, name: 'Mars', type: 'planet', icon: '🔴',
        color: '#C1440E', glowColor: 'rgba(193,68,14,0.3)',
        diameter: '6,779 km', distance: '225M km from Sun',
        moons: 2, description: 'The Red Planet with the tallest volcano (Olympus Mons) and deepest canyon (Valles Marineris).',
        discovered: 'Ancient', mass: '6.39 × 10²³ kg',
    },
    {
        id: 5, name: 'Jupiter', type: 'planet', icon: '🟠',
        color: '#C88B3A', glowColor: 'rgba(200,139,58,0.3)',
        diameter: '139,820 km', distance: '778M km from Sun',
        moons: 95, description: 'Largest planet — its Great Red Spot is a storm larger than Earth lasting 350+ years.',
        discovered: 'Ancient', mass: '1.90 × 10²⁷ kg',
    },
    {
        id: 6, name: 'Saturn', type: 'planet', icon: '🪐',
        color: '#F5B700', glowColor: 'rgba(245,183,0,0.3)',
        diameter: '116,460 km', distance: '1.4B km from Sun',
        moons: 146, description: 'The ringed jewel of the solar system. Its rings span 282,000 km but are only ~10m thick.',
        discovered: 'Ancient', mass: '5.68 × 10²⁶ kg',
    },
    {
        id: 7, name: 'Uranus', type: 'planet', icon: '🔵',
        color: '#7DE8E8', glowColor: 'rgba(125,232,232,0.3)',
        diameter: '50,724 km', distance: '2.9B km from Sun',
        moons: 28, description: 'Ice giant that rotates on its side — its axis is tilted 98° relative to its orbit.',
        discovered: '1781', mass: '8.68 × 10²⁵ kg',
    },
    {
        id: 8, name: 'Neptune', type: 'planet', icon: '🫐',
        color: '#4B70DD', glowColor: 'rgba(75,112,221,0.3)',
        diameter: '49,244 km', distance: '4.5B km from Sun',
        moons: 16, description: 'Windiest planet — supersonic storms exceed 2,100 km/h. Voyager 2 is its only visitor.',
        discovered: '1846', mass: '1.02 × 10²⁶ kg',
    },
    // ── MOONS ──
    {
        id: 9, name: 'The Moon', type: 'moon', icon: '🌕',
        color: '#D4D4D4', glowColor: 'rgba(212,212,212,0.3)',
        diameter: '3,474 km', distance: '384,400 km from Earth',
        moons: 0, description: 'Earth\'s only natural satellite. Stabilizes Earth\'s axial tilt and drives our tides.',
        discovered: 'Ancient', mass: '7.34 × 10²² kg',
    },
    {
        id: 10, name: 'Europa', type: 'moon', icon: '⚪',
        color: '#B0C4DE', glowColor: 'rgba(176,196,222,0.3)',
        diameter: '3,121 km', distance: 'Orbits Jupiter',
        moons: 0, description: 'Jupiter\'s moon with a global subsurface ocean — one of the best candidates for extraterrestrial life.',
        discovered: '1610', mass: '4.80 × 10²² kg',
    },
    {
        id: 11, name: 'Titan', type: 'moon', icon: '🟤',
        color: '#D4A056', glowColor: 'rgba(212,160,86,0.3)',
        diameter: '5,150 km', distance: 'Orbits Saturn',
        moons: 0, description: 'Saturn\'s largest moon — the only moon with a thick atmosphere and liquid methane lakes.',
        discovered: '1655', mass: '1.35 × 10²³ kg',
    },
    {
        id: 12, name: 'Ganymede', type: 'moon', icon: '🌑',
        color: '#8899AA', glowColor: 'rgba(136,153,170,0.3)',
        diameter: '5,268 km', distance: 'Orbits Jupiter',
        moons: 0, description: 'Largest moon in the solar system — bigger than Mercury, with its own magnetic field.',
        discovered: '1610', mass: '1.48 × 10²³ kg',
    },
    // ── ASTEROIDS ──
    {
        id: 13, name: 'Ceres', type: 'asteroid', icon: '🪨',
        color: '#A0937D', glowColor: 'rgba(160,147,125,0.3)',
        diameter: '939 km', distance: 'Asteroid Belt',
        moons: 0, description: 'Largest object in the asteroid belt — classified as a dwarf planet. Dawn spacecraft visited in 2015.',
        discovered: '1801', mass: '9.38 × 10²⁰ kg',
    },
    {
        id: 14, name: 'Vesta', type: 'asteroid', icon: '🪨',
        color: '#8B8682', glowColor: 'rgba(139,134,130,0.3)',
        diameter: '525 km', distance: 'Asteroid Belt',
        moons: 0, description: 'Second largest asteroid with a massive impact crater (Rheasilvia) covering most of its south pole.',
        discovered: '1807', mass: '2.59 × 10²⁰ kg',
    },
    {
        id: 15, name: 'Bennu', type: 'asteroid', icon: '🪨',
        color: '#6B6560', glowColor: 'rgba(107,101,96,0.3)',
        diameter: '490 m', distance: 'Near-Earth',
        moons: 0, description: 'Potentially hazardous asteroid — OSIRIS-REx collected samples from its surface in 2020.',
        discovered: '1999', mass: '7.8 × 10¹⁰ kg',
    },
    // ── COMETS ──
    {
        id: 16, name: "Halley's Comet", type: 'comet', icon: '☄️',
        color: '#A8D8EA', glowColor: 'rgba(168,216,234,0.3)',
        diameter: '15 km (nucleus)', distance: 'Returns every ~76 years',
        moons: 0, description: 'Most famous periodic comet — visible to the naked eye and recorded since 240 BC. Next visit: 2061.',
        discovered: '240 BC', mass: '2.2 × 10¹⁴ kg',
    },
    {
        id: 17, name: 'Comet NEOWISE', type: 'comet', icon: '☄️',
        color: '#FFD580', glowColor: 'rgba(255,213,128,0.3)',
        diameter: '5 km (nucleus)', distance: 'Long-period orbit',
        moons: 0, description: 'Spectacular 2020 comet visible to the naked eye — won\'t return for 6,800 years.',
        discovered: '2020', mass: 'Unknown',
    },
    {
        id: 18, name: 'Comet 67P', type: 'comet', icon: '☄️',
        color: '#C8B89A', glowColor: 'rgba(200,184,154,0.3)',
        diameter: '4 km (nucleus)', distance: 'Jupiter-family',
        moons: 0, description: 'ESA\'s Rosetta mission landed the Philae probe here in 2014 — first ever comet landing.',
        discovered: '1969', mass: '9.98 × 10¹² kg',
    },
]

// All unique types for the filter bar
export const OBJECT_TYPES = ['all', 'planet', 'moon', 'asteroid', 'comet']

// Color coding by object type
export const TYPE_STYLES = {
    planet:   { bg: 'rgba(69,162,158,0.15)',  border: 'rgba(69,162,158,0.4)',  text: '#45A29E',  label: '🪐 Planet'   },
    moon:     { bg: 'rgba(197,198,199,0.1)',   border: 'rgba(197,198,199,0.3)', text: '#C5C6C7',  label: '🌙 Moon'     },
    asteroid: { bg: 'rgba(160,147,125,0.15)', border: 'rgba(160,147,125,0.4)', text: '#A0937D',  label: '🪨 Asteroid' },
    comet:    { bg: 'rgba(168,216,234,0.15)', border: 'rgba(168,216,234,0.4)', text: '#A8D8EA',  label: '☄️ Comet'    },
}